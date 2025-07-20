import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useProductos } from '../hooks/useProductos';
import ProductCard from './ui/ProductCard';
import './css/Inventario.css';

const Inventario = () => {
    const { darkMode, categoriaActiva, setCategoria, filtros, setFiltros } = useAppContext();
    const { productosFiltrados, opcionesFiltros, totalProductos } = useProductos();

    const cambiarCategoria = (categoria) => {
        setCategoria(categoria);
    };

    return (
        <div className={`inventario ${darkMode ? 'dark' : 'light'}`}>
            {/* Botones de categoría */}
            <div className="category-buttons">
                <button
                    className={`category-button ${categoriaActiva === 'relojes' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
                    onClick={() => cambiarCategoria('relojes')}
                >
                    Relojes
                </button>
                <button
                    className={`category-button ${categoriaActiva === 'joyas' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
                    onClick={() => cambiarCategoria('joyas')}
                >
                    Joyas
                </button>
            </div>

            {/* Filtros dinámicos */}
            <div className="filtros">
                {categoriaActiva === 'relojes' && (
                    <>
                        <select 
                            value={filtros.marca}
                            onChange={(e) => setFiltros({ marca: e.target.value })}
                        >
                            <option value="">Todas las marcas</option>
                            {opcionesFiltros.marcas.map(marca => (
                                <option key={marca} value={marca}>{marca}</option>
                            ))}
                        </select>
                        <select 
                            value={filtros.malla}
                            onChange={(e) => setFiltros({ malla: e.target.value })}
                        >
                            <option value="">Todas las mallas</option>
                            {opcionesFiltros.mallas.map(malla => (
                                <option key={malla} value={malla}>{malla}</option>
                            ))}
                        </select>
                        <select 
                            value={filtros.estilo}
                            onChange={(e) => setFiltros({ estilo: e.target.value })}
                        >
                            <option value="">Todos los estilos</option>
                            {opcionesFiltros.estilos.map(estilo => (
                                <option key={estilo} value={estilo}>{estilo}</option>
                            ))}
                        </select>
                    </>
                )}
                {categoriaActiva === 'joyas' && (
                    <>
                        <select 
                            value={filtros.tipo}
                            onChange={(e) => setFiltros({ tipo: e.target.value })}
                        >
                            <option value="">Todos los tipos</option>
                            {opcionesFiltros.tipos.map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        <select 
                            value={filtros.material}
                            onChange={(e) => setFiltros({ material: e.target.value })}
                        >
                            <option value="">Todos los materiales</option>
                            {opcionesFiltros.materiales.map(material => (
                                <option key={material} value={material}>{material}</option>
                            ))}
                        </select>
                        <select 
                            value={filtros.estilo}
                            onChange={(e) => setFiltros({ estilo: e.target.value })}
                        >
                            <option value="">Todos los estilos</option>
                            {opcionesFiltros.estilos.map(estilo => (
                                <option key={estilo} value={estilo}>{estilo}</option>
                            ))}
                        </select>
                    </>
                )}
                <select 
                    value={filtros.precio}
                    onChange={(e) => setFiltros({ precio: e.target.value })}
                >
                    <option value="asc">Precio: Menor a Mayor</option>
                    <option value="desc">Precio: Mayor a Menor</option>
                </select>
            </div>

            {/* Contador de productos */}
            <div className="productos-contador">
                <p>{totalProductos} productos encontrados</p>
            </div>

            {/* Listado de productos con animación */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={categoriaActiva}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="productos-grid"
                >
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(producto => (
                            <ProductCard
                                key={producto.id}
                                producto={producto}
                                darkMode={darkMode}
                                onClick={() => console.log('Producto clickeado:', producto)}
                            />
                        ))
                    ) : (
                        <div className="no-productos">
                            <p>No se encontraron productos con los filtros seleccionados</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Inventario;
