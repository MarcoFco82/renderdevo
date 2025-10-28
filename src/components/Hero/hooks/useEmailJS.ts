// components/Hero/hooks/useEmailJS.ts - VERSIÓN COMPLETAMENTE CORREGIDA
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Service } from './useServices';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_8gh747m',
  TEMPLATE_ID: 'template_704ew3d',  
  PUBLIC_KEY: 'MQePSJwFKzy2hW_XK'
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
}

export const useEmailJS = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ✅ INICIALIZAR EMAILJS CORRECTAMENTE
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const sendQuote = async (
    formData: ContactFormData,
    selectedServices: Record<string, Service>,
    serviceMinutes: Record<string, number>,
    calculations: { baseTotal: number; discount: number; finalTotal: number; discountPercentage: number },
    projectContext: string
  ) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Preparar lista de servicios seleccionados
      const selectedServicesList = Object.values(selectedServices).map(service => {
        let serviceDetails = `${service.title} - ${service.priceRange}`;
        if (service.pricingType === 'perMinute' && serviceMinutes[service.id]) {
          serviceDetails += ` (${serviceMinutes[service.id]} minuto${serviceMinutes[service.id] > 1 ? 's' : ''})`;
        }
        return serviceDetails;
      }).join('\n');

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.businessType,
        phone: formData.phone,
        service: 'Cotización Múltiple de Servicios',
        message: `
INFORMACIÓN DEL CLIENTE:
Nombre: ${formData.name}
Empresa: ${formData.businessType}
Email: ${formData.email}
Teléfono: ${formData.phone}
${projectContext ? `Proyecto de referencia: ${projectContext}` : ''}

SERVICIOS COTIZADOS:
${selectedServicesList}

RESUMEN FINANCIERO:
Subtotal: $${calculations.baseTotal.toLocaleString()} MXN
Descuento: ${calculations.discountPercentage}% (-$${calculations.discount.toLocaleString()} MXN)
TOTAL: $${calculations.finalTotal.toLocaleString()} MXN

*Cotización generada desde renderdevo.com*
        `,
        to_email: 'hola@renderdevo.com',
        subject: `Cotización RenderDevo - ${formData.name} - $${calculations.finalTotal.toLocaleString()} MXN`
      };

      console.log('📤 Enviando cotización...');

      // ✅ CORRECCIÓN: INCLUIR PUBLIC_KEY EN EL SEND
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY  // ← ESTA LÍNEA FALTABA
      );

      console.log('✅ Cotización enviada exitosamente:', result);
      return { success: true };

    } catch (error: any) {
      console.error('❌ Error enviando cotización:', error);
      
      let errorMessage = 'Error al enviar la cotización. ';
      
      // MEJOR MANEJO DE ERRORES
      if (error?.text) {
        errorMessage += `Detalles: ${error.text}`;
      } else if (error?.status) {
        errorMessage += `Código: ${error.status}`;
      } else if (error?.message) {
        errorMessage += `Mensaje: ${error.message}`;
      } else {
        errorMessage += 'Verifica tu conexión e intenta nuevamente.';
      }
      
      setSubmitError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitError,
    setSubmitError,
    sendQuote
  };
};