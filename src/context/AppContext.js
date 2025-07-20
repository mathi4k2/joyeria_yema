import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchProductos } from '../utils/api';
import { transformProductos } from '../utils/transformers';
import { API_CONFIG, FILTROS_INICIALES } from '../config/constants';

const AppContext = createContext();

const initialState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
    productos: [],
    loading: false,
    error: null,
    lastFetch: null,
    retryCount: 0,
    filtros: FILTROS_INICIALES,
    categoriaActiva: 'relojes',
    isOnline: navigator.onLine
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            const newDarkMode = !state.darkMode;
            localStorage.setItem('darkMode', newDarkMode);
            return { ...state, darkMode: newDarkMode };
        
        case 'SET_PRODUCTOS':
            return { 
                ...state, 
                productos: action.payload, 
                loading: false, 
                error: null,
                lastFetch: Date.now(),
                retryCount: 0
            };
        
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        
        case 'SET_ERROR':
            return { 
                ...state, 
                error: action.payload, 
                loading: false,
                retryCount: state.retryCount + 1
            };
        
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        
        case 'SET_FILTROS':
            return { ...state, filtros: { ...state.filtros, ...action.payload } };
        
        case 'SET_CATEGORIA':
            return { 
                ...state, 
                categoriaActiva: action.payload,
                filtros: FILTROS_INICIALES
            };
        
        case 'SET_ONLINE_STATUS':
            return { ...state, isOnline: action.payload };
        
        case 'RESET_RETRY_COUNT':
            return { ...state, retryCount: 0 };
        
        default:
            return state;
    }
};



export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Verificar conexión a internet
    useEffect(() => {
        const handleOnline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: true });
        const handleOffline = () => dispatch({ type: 'SET_ONLINE_STATUS', payload: false });

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const toggleDarkMode = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    };

    const fetchProductosData = async (forceRefresh = false) => {
        // Verificar conexión a internet
        if (!state.isOnline) {
            dispatch({ type: 'SET_ERROR', payload: 'No hay conexión a internet' });
            return;
        }

        // Verificar límite de reintentos
        if (state.retryCount >= API_CONFIG.retryAttempts) {
            dispatch({ 
                type: 'SET_ERROR', 
                payload: 'Se han agotado los intentos de conexión. Por favor, recarga la página.' 
            });
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'CLEAR_ERROR' });

        try {
            const rows = await fetchProductos(forceRefresh);
            const productos = transformProductos(rows);

            if (productos.length === 0) {
                throw new Error('No se encontraron productos');
            }

            dispatch({ type: 'SET_PRODUCTOS', payload: productos });

        } catch (error) {
            console.error('Error fetching productos:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los productos' });
        }
    };



    const retryFetch = () => {
        dispatch({ type: 'RESET_RETRY_COUNT' });
        fetchProductosData(true);
    };

    const setFiltros = (filtros) => {
        dispatch({ type: 'SET_FILTROS', payload: filtros });
    };

    const setCategoria = (categoria) => {
        dispatch({ type: 'SET_CATEGORIA', payload: categoria });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProductosData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    const value = {
        ...state,
        toggleDarkMode,
        setFiltros,
        setCategoria,
        fetchProductos: fetchProductosData,
        retryFetch,
        clearError
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext debe ser usado dentro de AppProvider');
    }
    return context;
}; 