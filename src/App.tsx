import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Capacidades } from '@/pages/Capacidades';
import { Casos } from '@/pages/Casos';
import { Metodo } from '@/pages/Metodo';
import { Diario } from '@/pages/Diario';
import { Sobre } from '@/pages/Sobre';
import { Contacto } from '@/pages/Contacto';
import { LoQueNoHacemos } from '@/pages/LoQueNoHacemos';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capacidades" element={<Capacidades />} />
        <Route path="/casos" element={<Casos />} />
        <Route path="/metodo" element={<Metodo />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/lo-que-no-hacemos" element={<LoQueNoHacemos />} />
      </Routes>
    </Layout>
  );
}
