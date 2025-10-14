import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProposition />
      <PortfolioShowcase />
      <Footer />
    </main>
  );
}