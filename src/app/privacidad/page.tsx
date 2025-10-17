import Link from 'next/link';

export default function Privacidad() {
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
          <h1>Política de Privacidad</h1>
          <p className="legal-update"><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <div className="legal-sections">
          <section className="legal-section">
            <h2>1. Información que Recopilamos</h2>
            <p>En RenderDevo recopilamos la siguiente información para proporcionar nuestros servicios:</p>
            <div className="privacy-list">
              <p><strong>Información de contacto:</strong> Nombre, email, teléfono, empresa</p>
              <p><strong>Información del proyecto:</strong> Requerimientos, especificaciones, objetivos</p>
              <p><strong>Datos de comunicación:</strong> Historial de emails, mensajes, feedback</p>
              <p><strong>Datos de uso:</strong> Información anónima sobre cómo usas nuestro sitio web</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>2. Uso de la Información</h2>
            <p>Utilizamos tu información para:</p>
            <div className="privacy-list">
              <p>• Proporcionar cotizaciones y servicios solicitados</p>
              <p>• Comunicarnos sobre el progreso de proyectos</p>
              <p>• Enviar actualizaciones importantes sobre nuestros servicios</p>
              <p>• Mejorar la calidad de nuestros servicios y sitio web</p>
              <p>• Cumplir con obligaciones legales y regulatorias</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>3. Protección de Datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, pérdida o alteración.</p>
          </section>

          <section className="legal-section">
            <h2>4. Compartir Información</h2>
            <p>No vendemos, comerciamos ni transferimos tu información personal a terceros, excepto en los siguientes casos:</p>
            <div className="privacy-list">
              <p>• Proveedores de servicios que nos ayudan a operar nuestro negocio (ej: hosting, email marketing)</p>
              <p>• Cuando sea requerido por ley o para proteger nuestros derechos legales</p>
              <p>• Con tu consentimiento explícito</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>5. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <div className="privacy-list">
              <p>• Acceder a la información personal que tenemos sobre ti</p>
              <p>• Corregir información inexacta o incompleta</p>
              <p>• Solicitar la eliminación de tu información personal</p>
              <p>• Oponerte al procesamiento de tu información</p>
              <p>• Solicitar la portabilidad de tus datos</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>6. Cookies y Tecnologías Similares</h2>
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.</p>
          </section>

          <section className="legal-section">
            <h2>7. Cambios a esta Política</h2>
            <p>Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos por email o mediante un aviso en nuestro sitio web.</p>
          </section>

          <section className="legal-section">
            <h2>8. Contacto</h2>
            <p>Para ejercer tus derechos de privacidad o hacer preguntas sobre esta política, contáctanos en:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> hola@renderdevo.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}