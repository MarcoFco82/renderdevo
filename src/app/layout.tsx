import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RenderDevo - Implementación de Estrategias Audiovisuales para presencia en redes de PyMEs ",
  description: "Diseño estratégico, animación funcional y desarrollo web orientado a resultados para PyMEs que buscan destacar en redes y convertir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body style={{ position: 'relative', margin: 0, padding: 0, overflowX: 'hidden' }}>
        <ParticleBackground />
        <Header />
        <main style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}