// app/layout.tsx - VERSIÓN CORREGIDA (sin wrappers)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals_new.css";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import FontOptimization from "@/components/FontOptimization";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SeasonalTheme from '@/components/SeasonalTheme';
import SeasonalDecorations from '@/components/SeasonalDecorations';
import SeasonalParticles from '@/components/SeasonalParticles'; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://renderdevo.com'),
  title: "RenderDevo - Estrategias Digitales que conectan y posicionan tu negocio",
  description: "Servicios profesionales de video marketing y contenido audiovisual para pequeñas y medianas empresas. Videos corporativos, animaciones para redes y sitios web que convierten.",
  keywords: ["video marketing", "PyMEs", "contenido redes sociales", "video corporativo", "animaciones", "diseño web", "agencia digital"],
  authors: [{ name: "RenderDevo" }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://renderdevo.com',
    siteName: 'RenderDevo',
    title: 'RenderDevo - Estrategias Digitales que conectan y posicionan tu negocio',
    description: 'Servicios profesionales de video diseño y creación audiovisual para pequeñas y medianas empresas.',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'RenderDevo - Estrategias Digitales que conectan y posicionan tu negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenderDevo - RenderDevo - Estrategias Digitales que conectan y posicionan tu negocio',
    description: 'servicios profesionales de diseño web, video marketing y contenido audiovisual para pequeñas empresas.',
    images: ['/og_image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body style={{ position: 'relative', margin: 0, padding: 0, overflowX: 'hidden' }}>
        <GoogleAnalytics />
        <StructuredData />
        <FontOptimization />
        <SeasonalTheme />
        
        {/* COMPONENTES DE FONDO SIN WRAPPERS */}
        <ParticleBackground />
        <SeasonalParticles />
        <SeasonalDecorations />
        
        <Header />
        <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}