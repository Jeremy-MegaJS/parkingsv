"use server";

import { redirect } from "next/navigation";
import { normalizeUserType, resolveDefaultRouteForUserType } from "@/app/lib/auth/user-types";
import { upsertPublicUserProfile } from "@/app/lib/auth/user-profile";
import { formatSupabaseErrorForLog, getSupabaseFriendlyErrorMessage } from "@/src/lib/supabase/errors";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export type VerifyRegistrationState = { error: string };
export type ResendRegistrationState = { error?: string; success?: string };

const EMAIL_PATTERN = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

export async function verifyRegistrationOtpAction(
  _previous: VerifyRegistrationState,
  formData: FormData,
): Promise<VerifyRegistrationState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const token = String(formData.get("token") ?? "").replace(/\\s/g, "");

  if (!EMAIL_PATTERN.test(email) || !/^\\d{8}$/.test(token)) {
    return { error: "Ingresa los 8 dígitos del código enviado a tu correo." };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
    if (error) throw error;

    if (!data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return { error: "El correo todavía no aparece como verificado. Solicita un código nuevo e inténtalo otra vez." };
    }

    const metadata = data.user.user_metadata ?? {};
    const fullName = typeof metadata.full_name === "string" ? metadata.full_name : "";
    const dateOfBirth = typeof metadata.date_of_birth === "string" ? metadata.date_of_birth : null;
    const userType = normalizeUserType(typeof metadata.user_type === "string" ? metadata.user_type : "customer");

    await upsertPublicUserProfile({
      authUser: data.user,
      email,
      dateOfBirth,
      emailVerified: true,
      fullName,
      userType,
    });
    redirect(resolveDefaultRouteForUserType(userType));
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;

    console.warn("Registration OTP verification failed.", formatSupabaseErrorForLog(error));
    const code = typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code ?? "")
      : "";

    if (code === "otp_expired") {
      return { error: "El código es incorrecto, venció o fue reemplazado por otro. Usa los 8 dígitos del correo más reciente o solicita uno nuevo." };
    }

    return {
      error: getSupabaseFriendlyErrorMessage(
        error,
        "No se pudo verificar el código. Comprueba que hayas escrito los 8 dígitos del correo más reciente.",
      ),
    };
  }
}

export async function resendRegistrationOtpAction(
  _previous: ResendRegistrationState,
  formData: FormData,
): Promise<ResendRegistrationState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "La dirección de correo no es válida. Vuelve al registro e inténtalo otra vez." };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) throw error;

    return {
      success: "Solicitamos un código nuevo. Usa el último correo recibido; un código anterior puede dejar de ser válido.",
      requestedAt: Date.now(),
    };
  } catch (error) {
    console.warn("Registration OTP resend failed.", formatSupabaseErrorForLog(error));
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (/rate limit|too many requests|security purposes|after .* seconds/.test(message)) {
      return { error: "Supabase limita los reenvíos. Espera aproximadamente 60 segundos antes de solicitar otro código." };
    }

    return {
      error: getSupabaseFriendlyErrorMessage(
        error,
        "No pudimos reenviar el código. Espera un minuto y vuelve a intentarlo.",
      ),
    };
  }
}
