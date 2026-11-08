import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import VerifyRegistrationForm from "./VerifyRegistrationForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Parking SV - Verificar correo",
  description: "Verifica tu correo electrónico para activar tu cuenta de Parking SV.",
};

export default async function VerifyRegistrationPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawEmail = params.email;
  const email = (Array.isArray(rawEmail) ? rawEmail[0] : rawEmail ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect("/register");

  return (
    <>
      <SiteHeader activePage="none" />
      <main className="register-page">
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <Image src="/parkingsv/logo-parking-sv.png" alt="Parking SV" className="register-logo" width={80} height={80} priority />
              <h1 className="register-title">Verifica tu correo</h1>
              <p className="register-subtitle">Un paso más: confirma que tienes acceso a tu dirección de correo.</p>
            </div>
            <VerifyRegistrationForm email={email} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
