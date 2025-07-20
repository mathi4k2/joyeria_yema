import { ERROR_MESSAGES } from '../config/constants';

// Clase para manejar errores de manera centralizada
class ErrorHandler {
    constructor() {
        this.errorLog = [];
    }

    // Clasificar el tipo de error
    classifyError(error) {
        if (error.name === 'AbortError') {
            return 'timeout';
        }
        
        if (error.message.includes('HTTP')) {
            return 'server';
        }
        
        if (error.message.includes('Google Sheets')) {
            return 'invalidData';
        }
        
        if (error.message.includes('No se encontraron')) {
            return 'notFound';
        }
        
        if (!navigator.onLine) {
            return 'offline';
        }
        
        return 'unknown';
    }

    // Obtener mensaje de error amigable
    getErrorMessage(error, context = '') {
        const errorType = this.classifyError(error);
        
        switch (errorType) {
            case 'offline':
                return ERROR_MESSAGES.network.offline;
            case 'timeout':
                return ERROR_MESSAGES.network.timeout;
            case 'server':
                return ERROR_MESSAGES.network.server;
            case 'notFound':
                return ERROR_MESSAGES.network.notFound;
            case 'invalidData':
                return ERROR_MESSAGES.network.invalidData;
            default:
                return error.message || 'Ha ocurrido un error inesperado';
        }
    }

    // Log del error para debugging
    logError(error, context = '') {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: error.stack,
            type: this.classifyError(error),
            context,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.errorLog.push(errorInfo);

        // En desarrollo, mostrar en consola
        if (process.env.NODE_ENV === 'development') {
            console.error('Error logged:', errorInfo);
        }

        // Aquí se podría enviar a un servicio de monitoreo como Sentry
        // this.sendToMonitoringService(errorInfo);
    }

    // Enviar error a servicio de monitoreo (placeholder)
    sendToMonitoringService(errorInfo) {
        // Implementar envío a Sentry, LogRocket, etc.
        // console.log('Sending to monitoring service:', errorInfo);
    }

    // Manejar error de red
    handleNetworkError(error, retryFunction) {
        this.logError(error, 'network');
        
        const errorType = this.classifyError(error);
        
        if (errorType === 'offline') {
            // Esperar a que vuelva la conexión
            const handleOnline = () => {
                if (retryFunction) retryFunction();
                window.removeEventListener('online', handleOnline);
            };
            window.addEventListener('online', handleOnline, { once: true });
        }
        
        return {
            message: this.getErrorMessage(error),
            type: errorType,
            canRetry: errorType !== 'notFound'
        };
    }

    // Manejar error de validación
    handleValidationError(field, value, rules) {
        const error = this.validateField(field, value, rules);
        
        if (error) {
            this.logError(new Error(`Validation error: ${field} - ${error}`), 'validation');
        }
        
        return error;
    }

    // Validar campo específico
    validateField(field, value, rules) {
        if (rules.required && (!value || value.trim() === '')) {
            return ERROR_MESSAGES.validation.required;
        }
        
        if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return ERROR_MESSAGES.validation.email;
        }
        
        if (rules.phone && value && !/^(\+595|595)?[0-9]{8,9}$/.test(value)) {
            return ERROR_MESSAGES.validation.phone;
        }
        
        if (rules.minLength && value && value.trim().length < rules.minLength) {
            return ERROR_MESSAGES.validation.minLength(rules.minLength);
        }
        
        if (rules.maxLength && value && value.length > rules.maxLength) {
            return ERROR_MESSAGES.validation.maxLength(rules.maxLength);
        }
        
        if (rules.pattern && value && !rules.pattern.test(value)) {
            return ERROR_MESSAGES.validation.pattern;
        }
        
        return null;
    }

    // Limpiar log de errores
    clearErrorLog() {
        this.errorLog = [];
    }

    // Obtener estadísticas de errores
    getErrorStats() {
        const stats = {};
        this.errorLog.forEach(error => {
            stats[error.type] = (stats[error.type] || 0) + 1;
        });
        return stats;
    }
}

// Instancia singleton
export const errorHandler = new ErrorHandler();

// HOC para manejar errores en componentes
export const withErrorHandling = (Component) => {
    return function ErrorHandledComponent(props) {
        const handleError = (error, context) => {
            errorHandler.logError(error, context);
            return errorHandler.getErrorMessage(error, context);
        };

        return <Component {...props} handleError={handleError} />;
    };
};

// Hook para manejar errores
export const useErrorHandler = () => {
    // Usar funciones estáticas para evitar recreación
    const handleError = (error, context = '') => {
        errorHandler.logError(error, context);
        return errorHandler.getErrorMessage(error, context);
    };

    const handleNetworkError = (error, retryFunction) => {
        return errorHandler.handleNetworkError(error, retryFunction);
    };

    const validateField = (field, value, rules) => {
        return errorHandler.handleValidationError(field, value, rules);
    };

    return {
        handleError,
        handleNetworkError,
        validateField,
        errorHandler
    };
};

export default errorHandler; 