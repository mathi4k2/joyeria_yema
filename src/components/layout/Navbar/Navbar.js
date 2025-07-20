import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import './Navbar.css';
import logo from '../../../imgs/logo2.png';

const Navbar = () => {
    const { darkMode, toggleDarkMode } = useAppContext();
    return (
        <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
            <div className="logo">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Yemajoyería Logo" className="logo-img" />
                </Link>
            </div>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/inventario">Catálogo</Link></li>
                <li><Link to="/novedades">Novedades</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
            </ul>
            <div className="toggle-container">
                <span className="toggle-label">{darkMode ? "Modo Oscuro" : "Modo Claro"}</span>
                <button className="toggle-switch" onClick={toggleDarkMode}>
                    <div className={`toggle-knob ${darkMode ? 'dark' : 'light'}`}></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;