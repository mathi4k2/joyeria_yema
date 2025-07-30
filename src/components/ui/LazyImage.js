import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({ 
    src, 
    alt, 
    fallbackSrc = '/placeholder-product.png',
    className = '',
    darkMode = false,
    onLoad,
    onError,
    loading = 'lazy',
    sizes,
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        // Crear Intersection Observer para lazy loading
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(false);
        onError?.();
    };

    const imageSrc = hasError ? fallbackSrc : src;

    return (
        <div 
            ref={imgRef}
            className={`lazy-image-container ${className} ${darkMode ? 'dark' : 'light'}`}
            role="img"
            aria-label={alt}
            {...props}
        >
            <AnimatePresence mode="wait">
                {!isLoaded && isInView && (
                    <motion.div
                        key="skeleton"
                        className="image-skeleton"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {isInView && (
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    loading={loading}
                    sizes={sizes}
                    decoding="async"
                    aria-hidden={!isLoaded}
                />
            )}

            {/* Fallback para lectores de pantalla */}
            {!isInView && (
                <div 
                    className="sr-only"
                    aria-live="polite"
                >
                    Cargando imagen: {alt}
                </div>
            )}

            {/* Indicador de error para lectores de pantalla */}
            {hasError && (
                <div 
                    className="sr-only"
                    aria-live="assertive"
                >
                    Error al cargar imagen: {alt}
                </div>
            )}
        </div>
    );
};

export default LazyImage; 