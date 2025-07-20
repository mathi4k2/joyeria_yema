import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './css/Novedades.css';

const Novedades = () => {
    const { darkMode } = useAppContext();
    const [novedades, setNovedades] = useState([]);
    const [ofertasEspeciales, setOfertasEspeciales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Datos por defecto (fallback)
    const novedadesDefault = [
        {
            id: 1,
            titulo: "Nueva Colección de Relojes Suizos",
            descripcion: "Descubre nuestra exclusiva colección de relojes de las mejores marcas suizas. Precisión y elegancia en cada detalle.",
            fecha: "15 de Diciembre, 2024",
            imagen: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
            categoria: "Relojes",
            destacado: true
        },
        {
            id: 2,
            titulo: "Oferta Especial: Joyas de Oro",
            descripcion: "Aprovecha nuestros descuentos especiales en joyas de oro de 18k. Diseños únicos y elegantes para toda ocasión.",
            fecha: "10 de Diciembre, 2024",
            imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
            categoria: "Joyas",
            destacado: false
        },
        {
            id: 3,
            titulo: "Servicio de Mantenimiento Premium",
            descripcion: "Nuevo servicio de mantenimiento y limpieza profesional para todos tus relojes. Garantía de calidad y durabilidad.",
            fecha: "5 de Diciembre, 2024",
            imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            categoria: "Servicios",
            destacado: false
        }
    ];

    const ofertasEspecialesDefault = [
        {
            id: 1,
            titulo: "Descuento del 20% en Relojes Deportivos",
            descripcion: "Perfectos para el verano. Resistentes al agua y con cronógrafo incluido.",
            descuento: "20% OFF",
            validez: "Hasta el 31 de Enero"
        },
        {
            id: 2,
            titulo: "2x1 en Anillos de Plata",
            descripcion: "Lleva dos anillos por el precio de uno. Diseños únicos y elegantes.",
            descuento: "2x1",
            validez: "Hasta el 15 de Enero"
        },
        {
            id: 3,
            titulo: "Financiación sin Interés",
            descripcion: "Compra tu reloj soñado en hasta 12 cuotas sin interés con tarjetas seleccionadas.",
            descuento: "0% INT",
            validez: "Todo el mes"
        }
    ];

    // Función para cargar datos desde Google Sheets
    const fetchNovedadesFromSheet = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // URL de la Google Sheet - Hoja 3
            const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/gviz/tq?tqx=out:json&gid=45575286';
            
            console.log('🔗 URL de Google Sheets:', googleSheetUrl);
            console.log('🔄 Cargando novedades desde Google Sheets...');
            
            const response = await fetch(googleSheetUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('📄 Respuesta de Google Sheets recibida');
            console.log('📄 Primeros 200 caracteres de la respuesta:', text.substring(0, 200));
            
            // Parsear la respuesta de Google Sheets
            const json = JSON.parse(text.substr(47).slice(0, -2));
            console.log('📊 Datos parseados:', json.table.rows.length, 'filas encontradas');
            console.log('📊 Estructura de datos:', json.table);
            
            // Mostrar las primeras filas para entender la estructura
            if (json.table.rows.length > 0) {
                console.log('📋 Primera fila de datos:', json.table.rows[0]);
                console.log('📋 Columnas disponibles:', json.table.cols?.map(col => col.label || 'Sin etiqueta'));
            }
            
            // Procesar las filas de novedades
            const novedadesData = json.table.rows.map((row, index) => {
                const item = {
                    id: row.c[0]?.v || index + 1,
                    titulo: row.c[1]?.v || '',
                    descripcion: row.c[2]?.v || '',
                    fecha: row.c[3]?.v || '',
                    imagen: row.c[4]?.v || '',
                    categoria: row.c[5]?.v || '',
                    destacado: row.c[6]?.v === 'true' || false,
                    tipo: row.c[7]?.v || 'novedad',
                    descuento: row.c[8]?.v || '',
                    validez: row.c[9]?.v || ''
                };
                console.log('📝 Item procesado:', item);
                return item;
            });

            console.log('📊 Todos los datos procesados:', novedadesData);

            // Separar novedades y ofertas
            const novedadesFiltradas = novedadesData.filter(item => {
                console.log(`🔍 Filtrando item "${item.titulo}": tipo="${item.tipo}"`);
                return item.tipo === 'novedades' || item.tipo === 'novedad';
            });
            const ofertasFiltradas = novedadesData.filter(item => {
                console.log(`🔍 Filtrando item "${item.titulo}": tipo="${item.tipo}"`);
                return item.tipo === 'ofertas' || item.tipo === 'oferta' || item.tipo === 'oferta especial' || item.tipo === 'ofertas especiales';
            });

            // Si no hay ofertas filtradas, mostrar todos los items que no son novedades
            if (ofertasFiltradas.length === 0) {
                console.log('⚠️ No se encontraron ofertas con el filtro actual, mostrando todos los items que no son novedades');
                const ofertasAlternativas = novedadesData.filter(item => {
                    const noEsNovedad = !(item.tipo === 'novedades' || item.tipo === 'novedad');
                    console.log(`🔍 Item alternativo "${item.titulo}": tipo="${item.tipo}", noEsNovedad=${noEsNovedad}`);
                    return noEsNovedad;
                });
                console.log('📊 Ofertas alternativas encontradas:', ofertasAlternativas.length);
                setOfertasEspeciales(ofertasAlternativas.length > 0 ? ofertasAlternativas : ofertasEspecialesDefault);
            } else {
                setOfertasEspeciales(ofertasFiltradas);
            }

            console.log('✅ Novedades cargadas:', novedadesFiltradas.length);
            console.log('✅ Ofertas cargadas:', ofertasFiltradas.length);

            setNovedades(novedadesFiltradas.length > 0 ? novedadesFiltradas : novedadesDefault);
            setOfertasEspeciales(ofertasFiltradas.length > 0 ? ofertasFiltradas : ofertasEspecialesDefault);
            
        } catch (error) {
            console.error('❌ Error al cargar novedades:', error);
            setError(error.message);
            // Usar datos por defecto en caso de error
            setNovedades(novedadesDefault);
            setOfertasEspeciales(ofertasEspecialesDefault);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchNovedadesFromSheet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Mostrar loading mientras se cargan los datos
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
                    <div className="loading-spinner"></div>
                    <p>Cargando novedades desde Google Sheets...</p>
                </div>
            </div>
        );
    }

    // Mostrar error si algo salió mal
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
                    <p>Mantente al día con las últimas novedades, ofertas especiales y noticias de Relojería Benítez</p>
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
                                    <img src={novedad.imagen} alt={novedad.titulo} />
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
                                <div className="oferta-header">
                                    <h3>{oferta.titulo}</h3>
                                    <span className="descuento">{oferta.descuento || 'Oferta Especial'}</span>
                                </div>
                                <p>{oferta.descripcion}</p>
                                <div className="oferta-footer">
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

            {/* Debug Section - Solo visible en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
                <section className="debug-section">
                    <div className="container">
                        <h3>Debug Info</h3>
                        <button 
                            onClick={() => {
                                console.log('🔍 Datos de Novedades:', novedades);
                                console.log('🔍 Datos de Ofertas:', ofertasEspeciales);
                            }}
                            className="btn-debug"
                        >
                            Ver Datos en Consola
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Novedades; 