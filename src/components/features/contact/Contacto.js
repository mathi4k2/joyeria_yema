import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import './Contacto.css';

const Contacto = () => {
    const { darkMode } = useAppContext();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    
    const formRef = useRef(null);
    const mapRef = useRef(null);

    // Validación en tiempo real
    const validateField = (name, value) => {
        switch (name) {
            case 'nombre':
                if (!value.trim()) return 'El nombre es requerido';
                if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
                return '';
            case 'email':
                if (!value) return 'El email es requerido';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un email válido';
                return '';
            case 'telefono':
                if (value && !/^[+]?[0-9\s\-()]{8,15}$/.test(value)) {
                    return 'Ingresa un teléfono válido';
                }
                return '';
            case 'asunto':
                if (!value) return 'Selecciona un asunto';
                return '';
            case 'mensaje':
                if (!value.trim()) return 'El mensaje es requerido';
                if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validación en tiempo real
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Enfocar el primer campo con error
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                const field = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
                field?.focus();
            }
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulación de envío con validación adicional
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simular éxito 90% de las veces
                    if (Math.random() > 0.1) {
                        resolve();
                    } else {
                        reject(new Error('Error de conexión'));
                    }
                }, 2000);
            });

            setSubmitStatus('success');
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: ''
            });
            setErrors({});
            
            // Resetear el estado después de 5 segundos
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Lazy loading del mapa
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !mapLoaded) {
                    setMapLoaded(true);
                }
            },
            { threshold: 0.1 }
        );

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        return () => observer.disconnect();
    }, [mapLoaded]);

    const contactInfo = [
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Dirección',
            content: 'Circuito Comercial, Encarnación, Paraguay',
            link: 'https://www.google.com/maps/place/Joyer%C3%ADa+y+Relojer%C3%ADa+Yema/@-27.3606873,-55.8516896,18z/data=!4m10!1m2!2m1!1syema!3m6!1s0x9457bf8b030d9f63:0x42c969da836d6d04!8m2!3d-27.3606873!4d-55.8497951!15sCgR5ZW1hkgEHamV3ZWxlcqoBUAoNL2cvMTFkeGQyOGw3NgoJL20vMDNiZ3JfEAEqCCIEeWVtYSgOMh4QASIaoCkN0ln3IaDFY7MAZQ3-WvKzRUgfm798fVMyCBACIgR5ZW1h4AEA!16s%2Fg%2F1jgm1mjzq?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D',
            ariaLabel: 'Ver ubicación en Google Maps'
        },
        {
            icon: 'fas fa-phone',
            title: 'Teléfono',
            content: '+595 71 123 456',
            link: 'tel:+59571123456',
            ariaLabel: 'Llamar al teléfono'
        },
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            content: 'info@yemajoyeria.com',
            link: 'mailto:info@yemajoyeria.com',
            ariaLabel: 'Enviar email'
        },
        {
            icon: 'fas fa-clock',
            title: 'Horarios',
            content: 'Lun-Vie: 8:00 - 18:00\nSáb: 8:00 - 12:00'
        }
    ];

    const servicios = [
        'Venta de Relojes',
        'Venta de Joyas',
        'Servicio Técnico',
        'Mantenimiento',
        'Garantía',
        'Financiación'
    ];

    return (
        <div className={`contacto-container ${darkMode ? 'dark' : 'light'}`}>
            {/* Hero Section */}
            <section className="contacto-hero" role="banner" aria-labelledby="hero-title">
                <div className="hero-content">
                    <h1 id="hero-title">Contáctanos</h1>
                    <p>Estamos aquí para ayudarte. Encuéntranos o envíanos un mensaje</p>
                </div>
            </section>

            <div className="container">
                {/* Información de Contacto */}
                <section className="contacto-info-section" aria-labelledby="info-title">
                    <h2 id="info-title">Información de Contacto</h2>
                    <div className="contacto-info-grid" role="list">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="contacto-info-card" role="listitem">
                                <div className="info-icon" aria-hidden="true">
                                    <i className={info.icon}></i>
                                </div>
                                <div className="info-content">
                                    <h3>{info.title}</h3>
                                    {info.link ? (
                                        <a 
                                            href={info.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={info.ariaLabel}
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p>{info.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Formulario y Mapa */}
                <section className="contacto-main-section">
                    <div className="contacto-main-grid">
                        {/* Formulario */}
                        <div className="formulario-section" aria-labelledby="form-title">
                            <h2 id="form-title">Enviar Mensaje</h2>
                            <form 
                                ref={formRef}
                                onSubmit={handleSubmit} 
                                className="contacto-form"
                                noValidate
                                aria-describedby="form-instructions"
                            >
                                <div id="form-instructions" className="sr-only">
                                    Formulario de contacto. Todos los campos marcados con asterisco son obligatorios.
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="nombre">
                                            Nombre Completo <span aria-label="requerido">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Tu nombre completo"
                                            aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                                            aria-invalid={!!errors.nombre}
                                        />
                                        {errors.nombre && (
                                            <div id="error-nombre" className="error-message" role="alert">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.nombre}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email <span aria-label="requerido">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="tu@email.com"
                                            aria-describedby={errors.email ? 'error-email' : undefined}
                                            aria-invalid={!!errors.email}
                                        />
                                        {errors.email && (
                                            <div id="error-email" className="error-message" role="alert">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="telefono">Teléfono</label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            placeholder="+595 71 123 456"
                                            aria-describedby={errors.telefono ? 'error-telefono' : undefined}
                                            aria-invalid={!!errors.telefono}
                                        />
                                        {errors.telefono && (
                                            <div id="error-telefono" className="error-message" role="alert">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.telefono}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="asunto">
                                            Asunto <span aria-label="requerido">*</span>
                                        </label>
                                        <select
                                            id="asunto"
                                            name="asunto"
                                            value={formData.asunto}
                                            onChange={handleInputChange}
                                            required
                                            aria-describedby={errors.asunto ? 'error-asunto' : undefined}
                                            aria-invalid={!!errors.asunto}
                                        >
                                            <option value="">Selecciona un asunto</option>
                                            <option value="consulta">Consulta General</option>
                                            <option value="compra">Compra de Productos</option>
                                            <option value="servicio">Servicio Técnico</option>
                                            <option value="garantia">Garantía</option>
                                            <option value="financiacion">Financiación</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                        {errors.asunto && (
                                            <div id="error-asunto" className="error-message" role="alert">
                                                <i className="fas fa-exclamation-circle"></i>
                                                {errors.asunto}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje">
                                        Mensaje <span aria-label="requerido">*</span>
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        placeholder="Cuéntanos en qué podemos ayudarte..."
                                        aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                                        aria-invalid={!!errors.mensaje}
                                    ></textarea>
                                    {errors.mensaje && (
                                        <div id="error-mensaje" className="error-message" role="alert">
                                            <i className="fas fa-exclamation-circle"></i>
                                            {errors.mensaje}
                                        </div>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    className={`btn-enviar ${isSubmitting ? 'loading' : ''}`}
                                    disabled={isSubmitting}
                                    aria-describedby="submit-status"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="sr-only">Enviando mensaje</span>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Mensaje'
                                    )}
                                </button>

                                {submitStatus && (
                                    <div 
                                        id="submit-status" 
                                        className={`status-message ${submitStatus}`} 
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        <i className={`fas ${submitStatus === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                                        {submitStatus === 'success' 
                                            ? '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
                                            : 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
                                        }
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Mapa */}
                        <div className="mapa-section" aria-labelledby="mapa-title">
                            <h2 id="mapa-title">Ubicación</h2>
                            <div className="mapa-container" ref={mapRef}>
                                {mapLoaded ? (
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1234567890123!2d-55.8516896!3d-27.3606873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457bf8b030d9f63%3A0x42c969da836d6d04!2sJoyer%C3%ADa%20y%20Relojer%C3%ADa%20Yema!5e0!3m2!1ses!2spy!4v1718040000000!5m2!1ses!2spy"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación Joyería y Relojería Yema en Google Maps"
                                        aria-label="Mapa mostrando la ubicación de Joyería y Relojería Yema en Circuito Comercial, Encarnación"
                                    />
                                ) : (
                                    <div className="mapa-placeholder" aria-label="Cargando mapa">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <p>Cargando mapa...</p>
                                    </div>
                                )}
                                <div className="mapa-overlay">
                                    <a 
                                        href="https://www.google.com/maps/place/Joyer%C3%ADa+y+Relojer%C3%ADa+Yema/@-27.3606873,-55.8516896,18z/data=!4m10!1m2!2m1!1syema!3m6!1s0x9457bf8b030d9f63:0x42c969da836d6d04!8m2!3d-27.3606873!4d-55.8497951!15sCgR5ZW1hkgEHamV3ZWxlcqoBUAoNL2cvMTFkeGQyOGw3NgoJL20vMDNiZ3JfEAEqCCIEeWVtYSgOMh4QASIaoCkN0ln3IaDFY7MAZQ3-WvKzRUgfm798fVMyCBACIgR5ZW1h4AEA!16s%2Fg%2F1jgm1mjzq?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn-ver-mapa"
                                        aria-label="Abrir ubicación en Google Maps en nueva ventana"
                                    >
                                        <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                                        Ver en Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Servicios */}
                <section className="servicios-section" aria-labelledby="servicios-title">
                    <h2 id="servicios-title">Nuestros Servicios</h2>
                    <div className="servicios-grid" role="list">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="servicio-card" role="listitem">
                                <div className="servicio-icon" aria-hidden="true">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3>{servicio}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Horarios Detallados */}
                <section className="horarios-section" aria-labelledby="horarios-title">
                    <h2 id="horarios-title">Horarios de Atención</h2>
                    <div className="horarios-grid" role="list">
                        <div className="horario-card" role="listitem">
                            <h3>Lunes - Viernes</h3>
                            <p>8:00 AM - 6:00 PM</p>
                        </div>
                        <div className="horario-card" role="listitem">
                            <h3>Sábados</h3>
                            <p>8:00 AM - 12:00 PM</p>
                        </div>
                        <div className="horario-card" role="listitem">
                            <h3>Domingos</h3>
                            <p>Cerrado</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contacto; 