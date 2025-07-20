import React from 'react';
import { useAppContext } from '../../context/AppContext';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo);
        }

        // Aquí podrías enviar el error a un servicio de monitoreo
        // como Sentry, LogRocket, etc.
    }

    handleRetry = () => {
        this.setState({ 
            hasError: false, 
            error: null, 
            errorInfo: null 
        });
        
        // Recargar la página si es necesario
        if (this.props.reloadOnRetry) {
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback 
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onRetry={this.handleRetry}
                    reloadOnRetry={this.props.reloadOnRetry}
                />
            );
        }

        return this.props.children;
    }
}

const ErrorFallback = ({ error, errorInfo, onRetry, reloadOnRetry }) => {
    const { darkMode } = useAppContext();

    return (
        <div className={`error-boundary ${darkMode ? 'dark' : 'light'}`}>
            <div className="error-container">
                <div className="error-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                
                <h1>¡Ups! Algo salió mal</h1>
                
                <p className="error-message">
                    Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
                </p>

                {process.env.NODE_ENV === 'development' && error && (
                    <details className="error-details">
                        <summary>Detalles del error (solo desarrollo)</summary>
                        <div className="error-stack">
                            <h4>Error:</h4>
                            <pre>{error.toString()}</pre>
                            
                            {errorInfo && (
                                <>
                                    <h4>Stack Trace:</h4>
                                    <pre>{errorInfo.componentStack}</pre>
                                </>
                            )}
                        </div>
                    </details>
                )}

                <div className="error-actions">
                    <button 
                        onClick={onRetry}
                        className="btn-retry"
                        aria-label="Reintentar"
                    >
                        <i className="fas fa-redo"></i>
                        {reloadOnRetry ? 'Recargar Página' : 'Reintentar'}
                    </button>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="btn-back"
                        aria-label="Volver atrás"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Volver Atrás
                    </button>
                </div>

                <div className="error-help">
                    <p>Si el problema persiste, puedes:</p>
                    <ul>
                        <li>Verificar tu conexión a internet</li>
                        <li>Limpiar el caché del navegador</li>
                        <li>Contactarnos para obtener ayuda</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary; 