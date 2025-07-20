import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import './IntroductionSection.css';
import shopImage from '../../../imgs/shop.jpg';

const IntroductionSection = () => {
    const { darkMode } = useAppContext();
    return (
        <section className={`introduction-section ${darkMode ? 'dark' : 'light'}`}>
            <div className="text-content">
                <h2>Relojería Benítez - Tradición en Encarnación</h2>
                <p>
                    Desde sus inicios en la zona baja de Encarnación, Raimundo Benítez ha construido su negocio con dedicación y amor.
                    Tras su rehubicación, nuestra relojería se estableció en el circuito comercial, donde hoy seguimos ofreciendo
                    calidad y elegancia en cada pieza.
                </p>
            </div>
            <div className="image-container">
                <img src={shopImage} alt="Relojería Benítez" className="shop-image" />
            </div>
        </section>
    );
};

export default IntroductionSection;
