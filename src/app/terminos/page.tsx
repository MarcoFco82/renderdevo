import Link from 'next/link';

export default function Terminos() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="back-button-container">
          <Link href="/" className="back-button">
            ← Volver a RenderDevo
          </Link>
        </div>
      </div>
      
      <div className="legal-content">
        <header className="legal-header">
          <h1>Términos y Condiciones</h1>
          <p className="legal-update"><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>1. Aceptación de los Términos</h2>
            <p>Al utilizar los servicios de RenderDevo, aceptas cumplir con estos términos y condiciones en su totalidad.</p>
          </section>

          <section className="legal-section">
            <h2>2. Servicios Ofrecidos</h2>
            <p>RenderDevo ofrece servicios de diseño y desarrollo web, creación de contenido audiovisual, diseño de presentaciones y estrategias digitales para PyMEs y emprendedores.</p>
          </section>

          <section className="legal-section">
            <h2>3. Proceso de Contratación</h2>
            <p>El proceso inicia con una cotización, seguida de un acuerdo formal y el pago correspondiente antes del inicio del proyecto.</p>
          </section>

          <section className="legal-section">
            <h2>4. Propiedad Intelectual</h2>
            <p>Los derechos de propiedad intelectual del trabajo finalizado se transfieren al cliente una vez completado el pago total del proyecto.</p>
          </section>

          <section className="legal-section">
            <h2>5. Pagos y Facturación</h2>
            <p>Los pagos se realizan según el cronograma acordado. Aceptamos transferencias bancarias y otras formas de pago electrónico.</p>
          </section>

          <section className="legal-section">
            <h2>6. Modificaciones del Proyecto</h2>
            <p>Las modificaciones sustanciales al alcance original pueden generar cargos adicionales, previa aprobación del cliente.</p>
          </section>

          <section className="legal-section">
            <h2>7. Confidencialidad</h2>
            <p>Mantenemos confidencialidad sobre la información del proyecto y datos del cliente.</p>
          </section>

          <section className="legal-section">
            <h2>8. Limitación de Responsabilidad</h2>
            <p>RenderDevo no se hace responsable por pérdidas indirectas o daños consecuentes derivados del uso de nuestros servicios.</p>
          </section>

          <section className="legal-section">
            <h2>9. Ley Aplicable</h2>
            <p>Estos términos se rigen por las leyes de México y cualquier disputa se resolverá en los tribunales competentes de la Ciudad de México.</p>
          </section>

          <section className="legal-section">
            <h2>10. Contacto</h2>
            <p>Para preguntas sobre estos términos, contáctanos en:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> hola@renderdevo.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}