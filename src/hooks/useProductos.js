import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

export const useProductos = () => {
    const { productos, filtros, categoriaActiva } = useAppContext();

    const productosFiltrados = useMemo(() => {
        return productos
            .filter(producto => producto.categoria === categoriaActiva)
            .filter(producto => !filtros.marca || producto.marca === filtros.marca)
            .filter(producto => !filtros.malla || producto.malla === filtros.malla)
            .filter(producto => !filtros.estilo || producto.estilo === filtros.estilo)
            .filter(producto => categoriaActiva === 'joyas' ? (!filtros.tipo || producto.tipo === filtros.tipo) : true)
            .filter(producto => categoriaActiva === 'joyas' ? (!filtros.material || producto.material === filtros.material) : true)
            .sort((a, b) => (filtros.precio === 'asc' ? a.precio - b.precio : b.precio - a.precio));
    }, [productos, categoriaActiva, filtros]);

    const opcionesFiltros = useMemo(() => {
        const productosCategoria = productos.filter(p => p.categoria === categoriaActiva);
        
        return {
            marcas: [...new Set(productosCategoria.map(p => p.marca).filter(Boolean))],
            mallas: [...new Set(productosCategoria.map(p => p.malla).filter(Boolean))],
            estilos: [...new Set(productosCategoria.map(p => p.estilo).filter(Boolean))],
            tipos: [...new Set(productosCategoria.map(p => p.tipo).filter(Boolean))],
            materiales: [...new Set(productosCategoria.map(p => p.material).filter(Boolean))]
        };
    }, [productos, categoriaActiva]);

    return {
        productosFiltrados,
        opcionesFiltros,
        totalProductos: productosFiltrados.length
    };
}; 