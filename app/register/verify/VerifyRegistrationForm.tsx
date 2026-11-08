"use client";

import { useActionState } from "react";
import { useSitePreferences } from "@/components/useSitePreferences";
import { verifyRegistrationOtpAction, type VerifyRegistrationState } from "./actions";

const initialState: VerifyRegistrationState = { error: "" };

export default function VerifyRegistrationForm({ email }: { email: string }) {
  const preferences = useSitePreferences();
  const en = preferences.language === "en";
  const [state, action, pending] = useActionState(verifyRegistrationOtpAction, initialState);

  return (
    <form action={action} className="register-form">
      <p>{en ? "We sent a 6-digit verification code to:" : "Enviamos un código de verificación de 6 dígitos a:"}</p>
      <strong>{email}</strong>
      <input type="hidden" name="email" value={email} />
      <div className="form-group">
        <label className="form-label" htmlFor="registration-otp">{en ? "Verification code" : "Código de verificación"}</label>
        <input id="registration-otp" name="token" className="form-input" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required placeholder="000000" />
      </div>
      {state.error ? <p className="alert alert-error" role="alert">{state.error}</p> : null}
      <button type="submit" className="btn-register" disabled={pending}>
        {pending ? (en ? "Verifying..." : "Verificando...") : (en ? "Verify email" : "Verificar correo")}
      </button>
    </form>
  );
}
