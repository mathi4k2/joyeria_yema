import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { fetchNovedades } from '../../../utils/api';
import { transformNovedades, separateNovedadesAndOfertas, getDefaultData } from '../../../utils/transformers';
import { useErrorHandler } from '../../../utils/errorHandler';
import SkeletonLoader from '../../ui/SkeletonLoader';
import './Novedades.css';

const Novedades = () => {
    const { darkMode } = useAppContext();
    const { handleError } = useErrorHandler();
    const [novedades, setNovedades] = useState([]);
    const [ofertasEspeciales, setOfertasEspeciales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Datos por defecto (fallback)
    const novedadesDefault = useMemo(() => getDefaultData('novedades'), []);
    const ofertasEspecialesDefault = useMemo(() => getDefaultData('ofertas'), []);

    // Función para cargar datos desde Google Sheets
    const fetchNovedadesFromSheet = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const rows = await fetchNovedades();
            const novedadesData = transformNovedades(rows);
            const { novedades: novedadesFiltradas, ofertas: ofertasFiltradas } = separateNovedadesAndOfertas(novedadesData);

            setNovedades(novedadesFiltradas.length > 0 ? novedadesFiltradas : novedadesDefault);
            setOfertasEspeciales(ofertasFiltradas.length > 0 ? ofertasFiltradas : ofertasEspecialesDefault);
            
        } catch (error) {
            console.error('Error al cargar novedades:', error);
            const errorMessage = handleError(error, 'fetchNovedades');
            setError(errorMessage);
            setNovedades(novedadesDefault);
            setOfertasEspeciales(ofertasEspecialesDefault);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNovedadesFromSheet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className={`novedades-container ${darkMode ? 'dark' : 'light'}`}>
                <section className="novedades-hero">
                    <div className="hero-content">
                        <h1>Novedades y Ofertas</h1>
                        <p>Cargando contenido...</p>
                    </div>
                </section>
                <div className="loading-container">
                    <SkeletonLoader type="card" count={3} darkMode={darkMode} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`novedades-container ${darkMode ? 'dark' : 'light'}`}>
                <section className="novedades-hero">
                    <div className="hero-content">
                        <h1>Novedades y Ofertas</h1>
                        <p>Error al cargar el contenido</p>
                    </div>
                </section>
                <div className="error-container">
                    <p>❌ Error: {error}</p>
                    <button onClick={fetchNovedadesFromSheet} className="btn-reintentar">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`novedades-container ${darkMode ? 'dark' : 'light'}`}>
            {/* Hero Section */}
            <section className="novedades-hero">
                <div className="hero-content">
                    <h1>Novedades y Ofertas</h1>
                    <p>Mantente al día con las últimas novedades, ofertas especiales y noticias de Joyería y Relojería Yema</p>
                </div>
            </section>

            {/* Novedades Principales */}
            <section className="novedades-principales">
                <div className="container">
                    <h2>Últimas Novedades</h2>
                    <div className="novedades-grid">
                        {novedades.map((novedad) => (
                            <article key={novedad.id} className={`novedad-card ${novedad.destacado ? 'destacado' : ''}`}>
                                <div className="novedad-imagen">
                                    <img 
                                        src={novedad.imagen || 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop'} 
                                        alt={novedad.titulo}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop';
                                        }}
                                    />
                                    {novedad.destacado && <span className="badge-destacado">Destacado</span>}
                                </div>
                                <div className="novedad-contenido">
                                    <div className="novedad-meta">
                                        <span className="categoria">{novedad.categoria}</span>
                                        <span className="fecha">{novedad.fecha}</span>
                                    </div>
                                    <h3>{novedad.titulo}</h3>
                                    <p>{novedad.descripcion}</p>
                                    <button className="btn-leer-mas">Leer Más</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ofertas Especiales */}
            <section className="ofertas-especiales">
                <div className="container">
                    <h2>Ofertas Especiales</h2>
                    <div className="ofertas-grid">
                        {ofertasEspeciales.map((oferta) => (
                            <article key={oferta.id} className="oferta-card">
                                {oferta.imagen && (
                                    <div className="oferta-imagen">
                                        <img 
                                            src={oferta.imagen} 
                                            alt={oferta.titulo}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="oferta-header">
                                    <h3>{oferta.titulo}</h3>
                                    <span className="descuento">{oferta.descuento || 'Oferta Especial'}</span>
                                </div>
                                <p>{oferta.descripcion}</p>
                                <div className="oferta-footer">
                                    {oferta.fecha && <span className="oferta-fecha">{oferta.fecha}</span>}
                                    <span className="validez">Válido: {oferta.validez || 'Consultar'}</span>
                                    <button className="btn-aprovechar">Aprovechar</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <h2>¡No te pierdas nada!</h2>
                        <p>Suscríbete a nuestro newsletter para recibir las últimas novedades y ofertas exclusivas</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Tu correo electrónico" required />
                            <button type="submit">Suscribirse</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Novedades; 