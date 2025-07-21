import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { fetchImages } from '../../../utils/api';
import { transformImages, categorizeImages } from '../../../utils/transformers';
import { useErrorHandler } from '../../../utils/errorHandler';
import SkeletonLoader from '../../ui/SkeletonLoader';
import './ProductSection.css';
import ProductCarousel from './ProductCarousel';

const ProductSection = () => {
    const { darkMode } = useAppContext();
    const { handleError } = useErrorHandler();
    const [selectedCategory, setSelectedCategory] = useState('reloj');
    const [images, setImages] = useState({ reloj: [], joya: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.toLowerCase()); // Normaliza a minúsculas
    };

    useEffect(() => {
        const loadImages = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const rows = await fetchImages();
                const imagesData = transformImages(rows);
                const categorizedImages = categorizeImages(imagesData);
                setImages(categorizedImages);
                // Diagnóstico: log de datos crudos y transformados
                console.log('rows (raw):', rows);
                console.log('imagesData (transformed):', imagesData);
                console.log('categorizedImages:', categorizedImages);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                const errorMessage = handleError(error, 'fetchImages');
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []); // Ejecutar solo al montar

    const imagesToDisplay = useMemo(() => {
        const imgs = images[selectedCategory];
        // Diagnóstico: log de imágenes a mostrar y categoría seleccionada
        console.log('selectedCategory:', selectedCategory);
        console.log('imagesToDisplay:', imgs);
        return imgs;
    }, [images, selectedCategory]);

    if (loading) {
        return (
            <section className="product-section">
                <div className="category-buttons">
                    <button 
                        className={`category-button ${selectedCategory === 'reloj' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                        onClick={() => handleCategoryChange('reloj')}
                    >
                        Relojes
                    </button>
                    <button 
                        className={`category-button ${selectedCategory === 'joya' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                        onClick={() => handleCategoryChange('joya')}
                    >
                        Joyas
                    </button>
                </div>
                <div className="product-display">
                    <SkeletonLoader type="grid" count={6} darkMode={darkMode} />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="product-section">
                <div className="category-buttons">
                    <button 
                        className={`category-button ${selectedCategory === 'reloj' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                        onClick={() => handleCategoryChange('reloj')}
                    >
                        Relojes
                    </button>
                    <button 
                        className={`category-button ${selectedCategory === 'joya' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                        onClick={() => handleCategoryChange('joya')}
                    >
                        Joyas
                    </button>
                </div>
                <div className="error-container">
                    <p>❌ Error: {error}</p>
                    <button onClick={() => window.location.reload()} className="btn-retry">Reintentar</button>
                </div>
            </section>
        );
    }

    return (
        <section className="product-section">
            <div className="category-buttons">
                <button 
                    className={`category-button ${selectedCategory === 'reloj' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                    onClick={() => handleCategoryChange('reloj')}
                >
                    Relojes
                </button>
                <button 
                    className={`category-button ${selectedCategory === 'joya' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                    onClick={() => handleCategoryChange('joya')}
                >
                    Joyas
                </button>
            </div>
            <div className="product-display">
                <ProductCarousel images={imagesToDisplay} darkMode={darkMode} />
            </div>
        </section>
    );
};

export default ProductSection;
