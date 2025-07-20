// Configuración de la aplicación
export const APP_CONFIG = {
    name: 'Relojería Benítez',
    description: 'Venta de relojes y joyas en Encarnación, Paraguay',
    version: '1.0.0',
    author: 'Relojería Benítez',
    contact: {
        phone: '+595 71 123 456',
        email: 'info@relojeriabenitez.com',
        address: 'Circuito Comercial, Encarnación, Paraguay',
        mapsUrl: 'https://maps.app.goo.gl/Xa8eZE13Nqsqj9p16'
    },
    social: {
        facebook: 'https://facebook.com/relojeriabenitez',
        instagram: 'https://instagram.com/relojeriabenitez',
        whatsapp: 'https://wa.me/59571123456'
    },
    business: {
        hours: {
            weekdays: '8:00 AM - 6:00 PM',
            saturday: '8:00 AM - 12:00 PM',
            sunday: 'Cerrado'
        },
        services: [
            'Venta de Relojes',
            'Venta de Joyas',
            'Servicio Técnico',
            'Mantenimiento',
            'Garantía',
            'Financiación'
        ]
    }
};

// Configuración de API
export const API_CONFIG = {
    baseUrl: 'https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/gviz/tq?tqx=out:json',
    timeout: 10000, // 10 segundos
    retryAttempts: 3,
    cacheTime: 5 * 60 * 1000, // 5 minutos
    headers: {
        'Cache-Control': 'no-cache'
    }
};

// Configuración de validación
export const VALIDATION_CONFIG = {
    contact: {
        nombre: {
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        telefono: {
            pattern: /^[\+]?[0-9\s\-\(\)]{8,15}$/
        },
        mensaje: {
            minLength: 10,
            maxLength: 1000
        }
    }
};

// Configuración de rutas
export const ROUTES = {
    home: '/',
    inventario: '/inventario',
    novedades: '/novedades',
    contacto: '/contacto'
};

// Configuración de categorías
export const CATEGORIAS = {
    relojes: {
        id: 'relojes',
        nombre: 'Relojes',
        icon: 'fas fa-clock',
        color: '#3182ce'
    },
    joyas: {
        id: 'joyas',
        nombre: 'Joyas',
        icon: 'fas fa-gem',
        color: '#d69e2e'
    }
};

// Configuración de filtros
export const FILTROS_INICIALES = {
    marca: '',
    malla: '',
    estilo: '',
    tipo: '',
    material: '',
    precio: 'asc'
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
    duration: 0.5,
    easing: 'ease-out',
    stagger: 0.1
};

// Configuración de breakpoints
export const BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1200
};

// Configuración de performance
export const PERFORMANCE_CONFIG = {
    lazyLoadThreshold: 0.1,
    imageOptimization: {
        quality: 0.8,
        format: 'webp'
    },
    debounceDelay: 300,
    throttleDelay: 100
};

// Configuración de accesibilidad
export const ACCESSIBILITY_CONFIG = {
    focusVisible: true,
    skipLinks: true,
    ariaLabels: {
        darkModeToggle: 'Cambiar modo oscuro',
        menuToggle: 'Abrir menú de navegación',
        searchToggle: 'Abrir búsqueda',
        closeModal: 'Cerrar modal'
    }
};

// Configuración de SEO
export const SEO_CONFIG = {
    titleTemplate: '%s | Relojería Benítez',
    defaultTitle: 'Relojería Benítez - Relojes y Joyas en Encarnación, Paraguay',
    defaultDescription: 'Venta de relojes y joyas en Encarnación, Paraguay. Servicio técnico, mantenimiento y garantía. Encuentra las mejores marcas de relojes y joyas.',
    keywords: [
        'relojes',
        'joyas',
        'relojería',
        'encarnación',
        'paraguay',
        'tissot',
        'victorinox',
        'festina',
        'servicio técnico',
        'mantenimiento'
    ],
    openGraph: {
        type: 'website',
        locale: 'es_PY',
        siteName: 'Relojería Benítez'
    },
    twitter: {
        cardType: 'summary_large_image',
        handle: '@relojeriabenitez'
    }
};

// Configuración de errores
export const ERROR_MESSAGES = {
    network: {
        offline: 'No hay conexión a internet. Verifica tu conexión e intenta nuevamente.',
        timeout: 'La solicitud tardó demasiado. Verifica tu conexión.',
        server: 'Error de conexión con el servidor.',
        notFound: 'No se encontraron productos disponibles en este momento.',
        invalidData: 'Error al procesar los datos.',
        maxRetries: 'Se han agotado los intentos de conexión. Por favor, recarga la página.'
    },
    validation: {
        required: 'Este campo es requerido',
        email: 'Ingresa un email válido',
        phone: 'Ingresa un teléfono válido',
        minLength: (min) => `Debe tener al menos ${min} caracteres`,
        maxLength: (max) => `Debe tener máximo ${max} caracteres`,
        pattern: 'Formato inválido'
    },
    form: {
        submitSuccess: '¡Mensaje enviado exitosamente! Te contactaremos pronto.',
        submitError: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
        invalidForm: 'Por favor, corrige los errores en el formulario.'
    }
};

// Configuración de localStorage
export const STORAGE_KEYS = {
    darkMode: 'darkMode',
    userPreferences: 'userPreferences',
    cart: 'cart',
    favorites: 'favorites'
};

// Configuración de analytics (si se implementa)
export const ANALYTICS_CONFIG = {
    enabled: false,
    trackingId: 'GA_TRACKING_ID',
    events: {
        pageView: 'page_view',
        productView: 'product_view',
        addToCart: 'add_to_cart',
        contactForm: 'contact_form'
    }
};

export default {
    APP_CONFIG,
    API_CONFIG,
    VALIDATION_CONFIG,
    ROUTES,
    CATEGORIAS,
    FILTROS_INICIALES,
    ANIMATION_CONFIG,
    BREAKPOINTS,
    PERFORMANCE_CONFIG,
    ACCESSIBILITY_CONFIG,
    SEO_CONFIG,
    ERROR_MESSAGES,
    STORAGE_KEYS,
    ANALYTICS_CONFIG
}; 