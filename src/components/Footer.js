const Footer = () => {
    return (
      <footer className="footer">
        <footer id="contact" className="footer"></footer>
        <div className="container">
          <div className="footer-content">
            
            {/* MARCA - CENTRADO */}
            <div className="footer-brand">
              <h3>RenderDevo</h3>
              <p>Estrategias audiovisuales que generan engagement y conversiones</p>
            </div>
            
            {/* ENLACES EN GRID - CENTRADO */}
            <div className="footer-links-grid">
              <div className="footer-section">
                <h4>Servicios</h4>
                <a href="#web">Sitios Web</a>
                <a href="#videos">Videos Corporativos</a>
                <a href="#presentations">Presentaciones</a>
                <a href="#social">Contenido Redes</a>
              </div>
              
              <div className="footer-section">
                <h4>Contacto</h4>
                <a href="mailto:hola@renderdevo.com">hola@renderdevo.com</a>
              </div>
              
              <div className="footer-section">
                <h4>Síguenos</h4>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>
            
            {/* SECCIÓN LEGAL - CENTRADA */}
            <div className="footer-legal">
              <div className="footer-bottom">
                <p>&copy; 2024 RenderDevo. Todos los derechos reservados.</p>
              </div>
              <div className="legal-links">
                <a href="/terminos">Términos y Condiciones</a>
                <span className="separator">•</span>
                <a href="/privacidad">Política de Privacidad</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;