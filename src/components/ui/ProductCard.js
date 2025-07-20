import React from 'react';
import { motion } from 'framer-motion';
import '../css/ProductCard.css';

const ProductCard = ({ producto, darkMode, onClick }) => {
    return (
        <motion.div
            className={`producto-card ${darkMode ? 'dark' : 'light'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            layout
        >
            <div className="producto-imagen">
                <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    onError={(e) => {
                        e.target.src = '/placeholder-product.png';
                    }}
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
};

export default ProductCard; 