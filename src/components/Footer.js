import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './css/Footer.css';
import logo from '../imgs/loguito.png';

const Footer = () => {
    const { darkMode } = useAppContext();

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
            <div className="footer-content">
                {/* Sección de información de la empresa */}
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src={logo} alt="Yemajoyería Logo" className="footer-logo-img" />
                        <h3>Yemajoyería</h3>
                    </div>
                    <p className="footer-description">
                        Tradición y elegancia en relojes y joyas.
                    </p>
                    <div className="footer-social">
                        <a href="https://facebook.com/yemajoyeria" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com/yemajoyeria" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://wa.me/595981123456" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                {/* Enlaces rápidos */}
                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/inventario">Catálogo</Link></li>
                        <li><Link to="/novedades">Novedades</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                    </ul>
                </div>

                {/* Categorías de productos */}
                <div className="footer-section">
                    <h4>Nuestros Productos</h4>
                    <ul className="footer-links">
                        <li><Link to="/inventario?categoria=relojes">Relojes</Link></li>
                        <li><Link to="/inventario?categoria=joyas">Joyas</Link></li>
                        <li><Link to="/inventario?marca=Rolex">Rolex</Link></li>
                        <li><Link to="/inventario?marca=Omega">Omega</Link></li>
                        <li><Link to="/inventario?marca=Longines">Longines</Link></li>
                    </ul>
                </div>

                {/* Información de contacto */}
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <a href="https://maps.app.goo.gl/Xa8eZE13Nqsqj9p16" target="_blank" rel="noopener noreferrer">
                                    <p>Circuito Comercial</p>
                                    <p>Encarnación, Paraguay</p>
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <p>+595 981 123 456</p>
                                <p>+595 71 123 456</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <p>info@yemajoyeria.com</p>
                                <p>ventas@yemajoyeria.com</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-clock"></i>
                            <div>
                                <p>Lun - Vie: 8:00 - 18:00</p>
                                <p>Sáb: 8:00 - 12:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Línea divisoria */}
            <div className="footer-divider"></div>

            {/* Sección inferior */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {currentYear} Yemajoyería. Todos los derechos reservados.</p>
                    <div className="footer-bottom-links">
                        <Link to="/politica-privacidad">Política de Privacidad</Link>
                        <Link to="/terminos-condiciones">Términos y Condiciones</Link>
                        <Link to="/politica-devoluciones">Política de Devoluciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 