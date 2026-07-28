import { Navigate } from 'react-router-dom';

/**
 * /metodo quedó obsoleto: la sección "Método" fue reemplazada por "Ashur Engine"
 * (D-002). Se conserva la ruta como redirect para no romper links antiguos.
 */
export function Metodo() {
  return <Navigate to="/ashur" replace />;
}
