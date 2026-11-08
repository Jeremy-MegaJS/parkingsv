"use server";

import { redirect } from "next/navigation";
import { getPublicUserByEmail } from "@/app/lib/auth/user-profile";
import { sanitizeAppRedirect } from "@/app/lib/auth/redirect";
import { resolveDefaultRouteForUserType } from "@/app/lib/auth/user-types";
import type { LoginFormState } from "@/app/login/login-form-state";
import { getSupabaseFriendlyErrorMessage, formatSupabaseErrorForLog } from "@/src/lib/supabase/errors";
import { ensureSupabaseAuthReachable, getSupabaseConnectionErrorMessage } from "@/src/lib/supabase/health";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function getCopy(language: string) {
  return language === "en"
    ? { invalid: "Incorrect email or password. Check your credentials and try again.", invalidEmail: "Enter a valid email address.", missingEmail: "Enter your email.", missingPassword: "Enter your password.", short: "Password must be at least 8 characters long.", failed: "Unable to sign in. Please try again.", unverified: "Confirm your email address before signing in." }
    : { invalid: "Correo o contrasena incorrectos. Revisa las credenciales e intenta nuevamente.", invalidEmail: "Ingresa un correo valido.", missingEmail: "Ingresa tu correo.", missingPassword: "Ingresa tu contrasena.", short: "La contrasena debe tener al menos 8 caracteres.", failed: "No se pudo iniciar sesion. Intenta nuevamente.", unverified: "Confirma tu correo electronico antes de iniciar sesion." };
}
function createState(redirectTarget: string, email: string, password: string, fieldErrors: LoginFormState["fieldErrors"] = {}, errorMessage = ""): LoginFormState {
  return { errorMessage, fieldErrors, redirectTarget, values: { email, password }, userType: null };
}

export async function loginAction(_previousState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const language = String(formData.get("language") ?? "es");
  const redirectTarget = sanitizeAppRedirect(String(formData.get("redirect") ?? ""));
  const copy = getCopy(language);
  const errors: LoginFormState["fieldErrors"] = {};
  if (!email) errors.email = copy.missingEmail;
  else if (!emailPattern.test(email)) errors.email = copy.invalidEmail;
  if (!password) errors.password = copy.missingPassword;
  else if (password.length < 8) errors.password = copy.short;
  if (errors.email || errors.password) return createState(redirectTarget, email, password, errors);
  if (!(await ensureSupabaseAuthReachable())) return createState(redirectTarget, email, password, {}, getSupabaseConnectionErrorMessage());

  let destination: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return createState(redirectTarget, email, password, {}, /confirm|verified|email not confirmed/i.test(error.message) ? copy.unverified : copy.invalid);
    }
    if (!data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return createState(redirectTarget, email, password, {}, copy.unverified);
    }
    const publicUser = await getPublicUserByEmail(email);
    if (!publicUser?.emailVerified) {
      await supabase.auth.signOut();
      return createState(redirectTarget, email, password, {}, copy.unverified);
    }
    const userType = publicUser.userType;
    destination = redirectTarget === "/parqueos" ? resolveDefaultRouteForUserType(userType) : redirectTarget;
  } catch (error) {
    console.warn("Login action failed.", formatSupabaseErrorForLog(error));
    return createState(redirectTarget, email, password, {}, getSupabaseFriendlyErrorMessage(error, copy.failed));
  }
  if (destination) redirect(destination);
  return createState(redirectTarget, email, password);
}
