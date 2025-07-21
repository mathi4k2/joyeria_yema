import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Slider from 'react-slick';
import './ProductCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCarousel = ({ images }) => {
    const { darkMode } = useAppContext();
    const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla visibilidad del modal

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Validación para evitar pasar un array vacío
    if (!images || images.length === 0) {
        return <p>No hay productos disponibles en esta categoría.</p>; // Mensaje si no hay imágenes
    }

    return (
        <div className={`product-carousel ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Slider
                key={images.map(img => img.id).join('-')}
                {...settings}
                style={{ width: '100%', minHeight: '400px' }}
            >
                {images.map((image) => (
                    <div key={image.id} className="product-card" onClick={() => openModal(image)}>
                        <img
                            src={image.src}
                            alt={`Producto ${image.id}`}
                            className="product-image"
                        />
                    </div>
                ))}
            </Slider>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h2>Detalles del Producto</h2>
                        <img src={selectedProduct.src} alt={`Producto ${selectedProduct.id}`} />
                        <p>{selectedProduct.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCarousel;
