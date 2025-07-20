import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './css/ProductSection.css';
import ProductCarousel from './ProductCarousel';

const ProductSection = () => {
    const { darkMode } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('reloj');
    const [images, setImages] = useState({ reloj: [], joya: [] });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.toLowerCase()); // Normaliza a minúsculas
    };

    useEffect(() => {
        const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/gviz/tq?tqx=out:json&gid=2041518082';

        fetch(googleSheetUrl)
            .then(response => response.text())
            .then(text => {
                const json = JSON.parse(text.substr(47).slice(0, -2));
                const imagesData = json.table.rows.map(row => ({
                    id: row.c[0]?.v || '',
                    src: row.c[1]?.v || '',
                    description: row.c[2]?.v || '',
                    tipo: row.c[3]?.v?.toLowerCase().trim() || '',
                }));

                // Categorización por tipo
                const categorizedImages = imagesData.reduce(
                    (acc, image) => {
                        if (image.tipo === 'reloj') acc.reloj.push(image);
                        if (image.tipo === 'joya') acc.joya.push(image);
                        return acc;
                    },
                    { reloj: [], joya: [] }
                );

                setImages(categorizedImages);
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }, []);

    const imagesToDisplay = images[selectedCategory]; // Filtra las imágenes según la categoría seleccionada

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
