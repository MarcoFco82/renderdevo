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
              <h2>1. Servicios Ofrecidos</h2>
              <p>RenderDevo provee servicios de desarrollo web, creación de contenido audiovisual, diseño de presentaciones y estrategias digitales para pequeñas y medianas empresas. Los servicios específicos se detallan en cada cotización individual.</p>
            </section>
  
            <section className="legal-section">
              <h2>2. Proceso de Trabajo</h2>
              <p>2.1. <strong>Cotización:</strong> Todos los proyectos inician con una cotización detallada que especifica alcance, timeline y costos.</p>
              <p>2.2. <strong>Pagos:</strong> Se requiere un anticipo del 50% para iniciar cualquier proyecto. El balance se paga upon delivery.</p>
              <p>2.3. <strong>Revisiones:</strong> Incluimos hasta 3 rondas de revisiones por proyecto. Revisiones adicionales pueden generar cargos extra.</p>
            </section>
  
            <section className="legal-section">
              <h2>3. Propiedad Intelectual</h2>
              <p>3.1. Los derechos de propiedad intelectual de los proyectos finalizados son transferidos al cliente una vez completado el pago total.</p>
              <p>3.2. RenderDevo se reserva el derecho de mostrar los proyectos realizados en su portafolio, a menos que se acuerde lo contrario por escrito.</p>
              <p>3.3. El cliente garantiza que posee los derechos de cualquier material proporcionado para el proyecto.</p>
            </section>
  
            <section className="legal-section">
              <h2>4. Cancelaciones y Reembolsos</h2>
              <p>4.1. El anticipo no es reembolsable una vez iniciado el trabajo.</p>
              <p>4.2. Los proyectos pueden cancelarse por mutuo acuerdo. El trabajo completado hasta la fecha de cancelación será facturado.</p>
            </section>
  
            <section className="legal-section">
              <h2>5. Limitación de Responsabilidad</h2>
              <p>RenderDevo no será responsable por daños indirectos, incidentales o consecuentes resultantes del uso o incapacidad de usar nuestros servicios.</p>
            </section>
  
            <section className="legal-section">
              <h2>6. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las changes se comunicarán por email y estarán efectivas inmediatamente después de su publicación.</p>
            </section>
  
            <section className="legal-section">
              <h2>7. Contacto</h2>
              <p>Para preguntas sobre estos términos y condiciones, contáctenos en:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> hola@renderdevo.com</p>
                <p><strong>Teléfono:</strong> +52 55 3073 8888</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }