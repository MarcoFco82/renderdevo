'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: 'web'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ✅ REEMPLAZA CON TUS CREDENCIALES REALES
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_8gh747m', // Tu Service ID
    TEMPLATE_ID: 'template_704ew3d', // Tu Template ID  
    USER_ID: 'MQePSJwFKzy2hW_XK' // Tu Public Key
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Validación adicional
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Por favor completa todos los campos requeridos');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Enviando email con:', {
        service: EMAILJS_CONFIG.SERVICE_ID,
        template: EMAILJS_CONFIG.TEMPLATE_ID,
        user: EMAILJS_CONFIG.USER_ID
      });

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'No especificada',
          service: getServiceName(formData.service),
          message: formData.message,
          to_email: 'hola@renderdevo.com',
          subject: `Nuevo mensaje de ${formData.name}`,
          date: new Date().toLocaleDateString('es-MX')
        },
        EMAILJS_CONFIG.USER_ID
      );

      console.log('✅ Email enviado exitosamente:', result.text);
      
      // Reset form y mostrar éxito
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '', service: 'web' });

      // Opcional: Reset después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('❌ Error enviando email:', error);
      setIsSubmitting(false);
      
      if (error.text) {
        setSubmitError(`Error técnico: ${error.text}. Por favor intenta nuevamente.`);
      } else {
        setSubmitError('Error al enviar el mensaje. Por favor verifica tu conexión e intenta nuevamente.');
      }
    }
  };

  const getServiceName = (serviceKey) => {
    const services = {
      web: 'Sitio Web',
      social: 'Contenido Redes Sociales', 
      video: 'Video Corporativo',
      presentation: 'Presentaciones',
      other: 'Otro'
    };
    return services[serviceKey] || 'No especificado';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error cuando el usuario empiece a escribir
    if (submitError) setSubmitError('');
  };

  if (isSubmitted) {
    return (
      <div className="contact-success">
        <div className="success-icon">✅</div>
        <h3>¡Mensaje Enviado Exitosamente!</h3>
        <p>Hemos recibido tu información y te contactaremos dentro de 24 horas hábiles.</p>
        <p><strong>Revisa tu bandeja de entrada (y spam) por si acaso.</strong></p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="btn btn-primary"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nombre completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Tu nombre completo"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="company">Empresa</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Opcional - Nombre de tu empresa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">Servicio de interés</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="web">Sitio Web</option>
          <option value="social">Contenido Redes Sociales</option>
          <option value="video">Video Corporativo</option>
          <option value="presentation">Presentaciones</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensaje *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Cuéntanos sobre tu proyecto, objetivos, timeline presupuesto aproximado..."
        ></textarea>
      </div>

      {submitError && (
        <div className="error-message">
          ⚠️ {submitError}
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading-spinner"></span>
            Enviando...
          </>
        ) : (
          '📧 Enviar Mensaje'
        )}
      </button>

      <div className="form-note">
        <small>Al enviar este formulario aceptas nuestra <a href="/privacidad">Política de Privacidad</a></small>
      </div>
    </form>
  );
};

export default ContactForm;