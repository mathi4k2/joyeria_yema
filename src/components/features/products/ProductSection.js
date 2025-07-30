import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { fetchImages } from '../../../utils/api';
import { transformImages, categorizeImages } from '../../../utils/transformers';
import { useDataLoader } from '../../../hooks/useDataLoader';
import SkeletonLoader from '../../ui/SkeletonLoader';
import './ProductSection.css';
import ProductCarousel from './ProductCarousel';

const ProductSection = () => {
    const { darkMode } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('reloj');

    // Función para cargar y transformar imágenes
    const loadImages = async () => {
        const rows = await fetchImages();
        const imagesData = transformImages(rows);
        return categorizeImages(imagesData);
    };

    // Usar el hook personalizado para cargar datos
    const { data: images, loading, error, retry } = useDataLoader(loadImages);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.toLowerCase());
    };

    const imagesToDisplay = useMemo(() => {
        return images?.[selectedCategory] || [];
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
                    <button onClick={retry} className="btn-retry">Reintentar</button>
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
