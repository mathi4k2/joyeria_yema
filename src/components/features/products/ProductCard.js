import React, { memo } from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../../ui/LazyImage';
import './ProductCard.css';

const ProductCard = memo(({ producto, darkMode, onClick }) => {
    return (
        <motion.div
            className={`producto-card ${darkMode ? 'dark' : 'light'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            layout
        >
            <div className="producto-imagen">
                <LazyImage 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    darkMode={darkMode}
                    fallbackSrc="/placeholder-product.png"
                />
            </div>
            <div className="producto-info">
                <h3 className="producto-titulo">
                    {producto.marca || producto.tipo}
                </h3>
                <p className="producto-nombre">{producto.nombre}</p>
                <p className="producto-precio">
                    ${producto.precio.toLocaleString()} USD
                </p>
                {producto.estilo && (
                    <span className="producto-estilo">{producto.estilo}</span>
                )}
            </div>
        </motion.div>
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard; 