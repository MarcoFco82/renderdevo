const ValueProposition = () => {
    const valueBanners = [
      {
        id: 1,
        icon: '🎯',
        title: 'Diseño Estratégico',
        description: 'Diseñamos experiencias digitales centradas en el usuario que optimizan los caminos hacia la conversión.',
      },
      {
        id: 2, 
        title: 'Contenido Visual Efectivo',
        description: 'Creamos materiales que comunican claramente y generan engagement. Desde videos hasta presentaciones profesionales.',
        icon: '📊'
      },
      {
        id: 3,
        icon: '⚡',
        title: 'Implementación Ágil',
        description: 'Procesos optimizados que entregan resultados en semanas, no meses. Menos burocracia, más acción y crecimiento para tu negocio.',
      }
    ];
  
    return (
      <section id="value-proposition" className="value-proposition-horizontal">
        <div className="container">
          {/* HEADER EN BLANCO */}
          <div className="value-header-white">
  <h2>Soluciones Digitales con Propósito</h2>
  <p>Combinamos diseño, tecnología y estrategia para crear resultados tangibles en tu negocio</p>
</div>
  
          {/* BANNER HORIZONTAL CON FONDO OSCURO */}
          <div className="value-banners-horizontal">
            {valueBanners.map((banner) => (
              <div key={banner.id} className="value-banner-horizontal">
                <div className="banner-icon-white">
                  {banner.icon}
                </div>
                
                <div className="banner-text-white">
                  <h3 className="banner-title-white">{banner.title}</h3>
                  <p className="banner-description-white">{banner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ValueProposition;