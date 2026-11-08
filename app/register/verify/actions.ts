"use server";

import { redirect } from "next/navigation";
import { normalizeUserType, resolveDefaultRouteForUserType } from "@/app/lib/auth/user-types";
import { upsertPublicUserProfile } from "@/app/lib/auth/user-profile";
import { formatSupabaseErrorForLog, getSupabaseFriendlyErrorMessage } from "@/src/lib/supabase/errors";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export type VerifyRegistrationState = { error: string };

export async function verifyRegistrationOtpAction(_previous: VerifyRegistrationState, formData: FormData): Promise<VerifyRegistrationState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const token = String(formData.get("token") ?? "").replace(/\s/g, "");
  if (!email || !/^\d{6}$/.test(token)) return { error: "Ingresa el código de 6 dígitos enviado a tu correo." };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
    if (error) throw error;
    if (!data.user?.email_confirmed_at) {
      await supabase.auth.signOut();
      return { error: "El correo todavía no aparece como verificado. Revisa el código e inténtalo otra vez." };
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
    return { error: getSupabaseFriendlyErrorMessage(error, "No se pudo verificar el código. Comprueba que siga vigente y vuelve a intentarlo.") };
  }
}
