"use client";

import { useActionState, useEffect, useState } from "react";
import { useSitePreferences } from "@/components/useSitePreferences";
import {
  resendRegistrationOtpAction,
  verifyRegistrationOtpAction,
  type ResendRegistrationState,
  type VerifyRegistrationState,
} from "./actions";

const initialVerifyState: VerifyRegistrationState = { error: "" };
const initialResendState: ResendRegistrationState = {};

export default function VerifyRegistrationForm({ email }: { email: string }) {
  const preferences = useSitePreferences();
  const en = preferences.language === "en";
  const [verifyState, verifyAction, verifying] = useActionState(verifyRegistrationOtpAction, initialVerifyState);
  const [resendState, resendAction, resending] = useActionState(resendRegistrationOtpAction, initialResendState);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (resendState.requestedAt) setCooldown(60);
  }, [resendState.requestedAt]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timeout = window.setTimeout(() => setCooldown((remaining) => Math.max(0, remaining - 1)), 1000);
    return () => window.clearTimeout(timeout);
  }, [cooldown]);

  return (
    <div className="register-form">
      <p>{en ? "We sent an 8-digit verification code to:" : "Enviamos un código de verificación de 8 dígitos a:"}</p>
      <strong>{email}</strong>

      <form action={verifyAction}>
        <input type="hidden" name="email" value={email} />
        <div className="form-group">
          <label className="form-label" htmlFor="registration-otp">{en ? "Verification code" : "Código de verificación"}</label>
          <input
            id="registration-otp"
            name="token"
            className="form-input"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{8}"
            minLength={8}
            maxLength={8}
            required
            placeholder="00000000"
            aria-describedby="registration-otp-help"
          />
          <small id="registration-otp-help">
            {en ? "Enter all 8 digits from the most recent email." : "Escribe los 8 dígitos del correo más reciente."}
          </small>
        </div>
        {verifyState.error ? <p className="alert alert-error" role="alert">{verifyState.error}</p> : null}
        <button type="submit" className="btn-register" disabled={verifying || resending}>
          {verifying ? (en ? "Verifying..." : "Verificando...") : (en ? "Verify email" : "Verificar correo")}
        </button>
      </form>

      <div className="form-group" style={{ marginTop: "1rem" }}>
        <p>{en ? "Didn't receive the email or need a new code?" : "¿No recibiste el correo o necesitas otro código?"}</p>
        <form action={resendAction}>
          <input type="hidden" name="email" value={email} />
          <button type="submit" className="btn-register" disabled={resending || verifying || cooldown > 0}>
            {resending
              ? (en ? "Sending..." : "Enviando...")
              : cooldown > 0
                ? (en ? `Resend in ${cooldown}s` : `Reenviar en ${cooldown}s`)
                : (en ? "Resend code" : "Reenviar código")}
          </button>
        </form>
        {resendState.success ? (
          <p className="alert" role="status">
            {en ? "A new code was requested. Use the latest email; previous codes may no longer work." : resendState.success}
          </p>
        ) : null}
        {resendState.error ? <p className="alert alert-error" role="alert">{resendState.error}</p> : null}
      </div>
    </div>
  );
}
