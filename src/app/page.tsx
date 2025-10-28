// app/page.tsx - IMPORTS CORRECTOS
import Hero from '@/components/Hero/Hero';
import ValueProposition from '@/components/ValueProposition';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import Footer from '@/components/Footer';
import HomepageSchema from '@/components/HomepageSchema'; // ← SIN .tsx

export default function Home() {
  return (
    <main>
      <HomepageSchema />
      <Hero />
      <ValueProposition />
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}