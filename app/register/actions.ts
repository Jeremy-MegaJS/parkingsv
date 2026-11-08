"use server";

import { redirect } from "next/navigation";
import { getAuthUserByEmail } from "@/app/lib/auth/user-profile";
import { type UserType } from "@/app/lib/auth/user-types";
import type { RegisterFormState } from "@/app/register/register-form-state";
import { getSupabaseFriendlyErrorMessage, formatSupabaseErrorForLog } from "@/src/lib/supabase/errors";
import { ensureSupabaseAuthReachable, getSupabaseConnectionErrorMessage } from "@/src/lib/supabase/health";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

type RegisterUserType = "" | "customer" | "owner";
const DEFAULT_VALUES: RegisterFormState["values"] = { date_of_birth: "", email: "", full_name: "", terms_accepted: false, user_type: "" };

function getCopy(language: string) {
  return language === "en"
    ? { accountExists: "An account with that email already exists. Try signing in.", birthDateInvalid: "Enter a valid birth date.", birthDateMissing: "Enter your birth date.", createError: "An error occurred while creating your account. Please try again.", emailRateLimit: "This project's Supabase email limit has been reached. No verification email could be sent. Wait for the limit to reset or configure custom SMTP; do not keep retrying now.", emailMissing: "Enter your email address.", mismatch: "Passwords do not match.", short: "Password must be at least 8 characters long.", terms: "Accept the terms to continue.", role: "Select whether the account is for a customer or an owner." }
    : { accountExists: "Ya existe una cuenta con ese correo. Intenta iniciar sesion.", birthDateInvalid: "Ingresa una fecha de nacimiento válida.", birthDateMissing: "Ingresa tu fecha de nacimiento.", createError: "Ocurrio un error al crear tu cuenta. Intenta nuevamente.", emailRateLimit: "Supabase alcanzó el límite de correos de verificación del proyecto. No se pudo enviar otro correo. Espera a que se restablezca el límite o configura SMTP personalizado; no sigas reintentando ahora.", emailMissing: "Ingresa tu correo electronico.", mismatch: "Las contrasenas no coinciden.", short: "La contrasena debe tener al menos 8 caracteres.", terms: "Acepta los terminos para continuar.", role: "Selecciona si la cuenta es de cliente o propietario." };
}
function state(values: Partial<RegisterFormState["values"]>, message = ""): RegisterFormState {
  return { errors: message ? { general: message } : {}, values: { ...DEFAULT_VALUES, ...values } };
}

export async function registerAction(_previous: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const date_of_birth = String(formData.get("date_of_birth") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const confirm = String(formData.get("confirm_password") ?? "").trim();
  const user_type = String(formData.get("user_type") ?? "") as RegisterUserType;
  const terms = formData.get("terms_accepted") === "on";
  const language = String(formData.get("language") ?? "es");
  const copy = getCopy(language);
  const values = { full_name, date_of_birth, email, user_type, terms_accepted: terms };

  try {
    if (!full_name) return state(values, language === "en" ? "Enter your full name." : "Ingresa tu nombre completo.");
    if (!date_of_birth) return state(values, copy.birthDateMissing);
    if (Number.isNaN(Date.parse(date_of_birth))) return state(values, copy.birthDateInvalid);
    if (!email) return state(values, copy.emailMissing);
    if (password.length < 8) return state(values, copy.short);
    if (password !== confirm) return state(values, copy.mismatch);
    if (!terms) return state(values, copy.terms);
    if (user_type !== "customer" && user_type !== "owner") return state(values, copy.role);
    if (!(await ensureSupabaseAuthReachable())) return state(values, getSupabaseConnectionErrorMessage());
    const existingAuthUser = await getAuthUserByEmail(email);
    if (existingAuthUser?.email_confirmed_at) return state(values, copy.accountExists);
    if (existingAuthUser) redirect("/register/verify?email=" + encodeURIComponent(email));

    const supabase = await createSupabaseServerClient();
    const resolvedUserType: UserType = user_type === "owner" ? "owner" : "customer";
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { date_of_birth, full_name, user_type: resolvedUserType } },
    });
    if (error) throw error;
    if (data.session || data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return state(values, language === "en" ? "Email confirmation is disabled in Supabase Auth. Registration was stopped." : "La confirmación de correo está desactivada en Supabase. Se detuvo el registro.");
    }
    if (!data.user) throw new Error("Supabase did not return a pending signup user.");
    redirect("/register/verify?email=" + encodeURIComponent(email));
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    console.warn("Register action failed.", formatSupabaseErrorForLog(error));

    const authError = typeof error === "object" && error !== null
      ? error as { code?: unknown; status?: unknown; message?: unknown }
      : {};
    const errorCode = String(authError.code ?? "");
    const errorMessage = String(authError.message ?? "").toLowerCase();
    const isEmailRateLimit = errorCode === "over_email_send_rate_limit"
      || (Number(authError.status) === 429 && /email.*rate limit|rate limit.*email/.test(errorMessage));

    if (isEmailRateLimit) {
      // Auth may have persisted an unconfirmed user before email delivery failed.
      // Keep that user and send them to the verification flow if it exists.
      try {
        const pendingUser = await getAuthUserByEmail(email);
        if (pendingUser && !pendingUser.email_confirmed_at) {
          redirect("/register/verify?email=" + encodeURIComponent(email));
        }
      } catch (lookupError) {
        if (lookupError instanceof Error && lookupError.message === "NEXT_REDIRECT") throw lookupError;
        console.warn("Could not check pending signup after email rate limit.", formatSupabaseErrorForLog(lookupError));
      }

      return state(values, copy.emailRateLimit);
    }

    return state(values, getSupabaseFriendlyErrorMessage(error, copy.createError));
  }
}
