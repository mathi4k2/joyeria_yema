import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AppContext = createContext();

const initialState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
    productos: [],
    loading: false,
    error: null,
    lastFetch: null,
    retryCount: 0,
    filtros: {
        marca: '',
        malla: '',
        estilo: '',
        tipo: '',
        material: '',
        precio: 'asc',
    },
    categoriaActiva: 'relojes',
    cache: new Map(),
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
                filtros: {
                    marca: '',
                    malla: '',
                    estilo: '',
                    tipo: '',
                    material: '',
                    precio: 'asc',
                }
            };
        
        case 'SET_CACHE':
            const newCache = new Map(state.cache);
            newCache.set(action.payload.key, action.payload.data);
            return { ...state, cache: newCache };
        
        case 'SET_ONLINE_STATUS':
            return { ...state, isOnline: action.payload };
        
        case 'RESET_RETRY_COUNT':
            return { ...state, retryCount: 0 };
        
        default:
            return state;
    }
};

// Función para limpiar datos de Google Sheets
const cleanGoogleSheetsData = (text) => {
    try {
        // Remover el prefijo de Google Sheets
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.substring(jsonStart, jsonEnd);
        
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Error al procesar los datos de Google Sheets');
    }
};

// Función para transformar los datos
const transformProductos = (rows) => {
    return rows.map((row, index) => ({
        id: row.c[0]?.v || `producto-${index}`,
        nombre: row.c[1]?.v || '',
        precio: parseFloat(row.c[2]?.v || 0),
        imagen: row.c[3]?.v || '',
        categoria: row.c[4]?.v || '',
        tipo: row.c[5]?.v || '',
        estilo: row.c[6]?.v || '',
        malla: row.c[7]?.v || '',
        material: row.c[8]?.v || '',
        marca: row.c[9]?.v || '',
        descripcion: row.c[10]?.v || '',
        stock: parseInt(row.c[11]?.v || 0),
        destacado: row.c[12]?.v === 'true' || false,
        fechaAgregado: row.c[13]?.v || new Date().toISOString()
    })).filter(producto => producto.nombre && producto.precio > 0);
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

    const toggleDarkMode = useCallback(() => {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
    }, []);

    const fetchProductos = useCallback(async (forceRefresh = false) => {
        const cacheKey = 'productos';
        const cacheTime = 5 * 60 * 1000; // 5 minutos
        const now = Date.now();

        // Verificar cache si no es un refresh forzado
        if (!forceRefresh && state.cache.has(cacheKey)) {
            const cached = state.cache.get(cacheKey);
            if (now - cached.timestamp < cacheTime) {
                dispatch({ type: 'SET_PRODUCTOS', payload: cached.data });
                return;
            }
        }

        // Verificar conexión a internet
        if (!state.isOnline) {
            dispatch({ 
                type: 'SET_ERROR', 
                payload: 'No hay conexión a internet. Verifica tu conexión e intenta nuevamente.' 
            });
            return;
        }

        // Verificar límite de reintentos
        if (state.retryCount >= 3) {
            dispatch({ 
                type: 'SET_ERROR', 
                payload: 'Se han agotado los intentos de conexión. Por favor, recarga la página.' 
            });
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'CLEAR_ERROR' });

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

            const response = await fetch(
                'https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/gviz/tq?tqx=out:json',
                { 
                    signal: controller.signal,
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const text = await response.text();
            const json = cleanGoogleSheetsData(text);
            
            if (!json.table || !json.table.rows) {
                throw new Error('Formato de datos inválido');
            }

            const productos = transformProductos(json.table.rows);

            if (productos.length === 0) {
                throw new Error('No se encontraron productos');
            }

            // Guardar en cache
            dispatch({ 
                type: 'SET_CACHE', 
                payload: { 
                    key: cacheKey, 
                    data: { 
                        data: productos, 
                        timestamp: now 
                    } 
                } 
            });

            dispatch({ type: 'SET_PRODUCTOS', payload: productos });

        } catch (error) {
            console.error('Error fetching productos:', error);
            
            let errorMessage = 'Error al cargar los productos';
            
            if (error.name === 'AbortError') {
                errorMessage = 'La solicitud tardó demasiado. Verifica tu conexión.';
            } else if (error.message.includes('HTTP')) {
                errorMessage = 'Error de conexión con el servidor.';
            } else if (error.message.includes('Google Sheets')) {
                errorMessage = 'Error al procesar los datos.';
            } else if (error.message.includes('No se encontraron')) {
                errorMessage = 'No hay productos disponibles en este momento.';
            }

            dispatch({ type: 'SET_ERROR', payload: errorMessage });
        }
    }, [state.cache, state.isOnline, state.retryCount]);

    const retryFetch = useCallback(() => {
        dispatch({ type: 'RESET_RETRY_COUNT' });
        fetchProductos(true);
    }, [fetchProductos]);

    const setFiltros = useCallback((filtros) => {
        dispatch({ type: 'SET_FILTROS', payload: filtros });
    }, []);

    const setCategoria = useCallback((categoria) => {
        dispatch({ type: 'SET_CATEGORIA', payload: categoria });
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProductos();
    }, []);

    // Reintentar automáticamente cuando se recupera la conexión
    useEffect(() => {
        if (state.isOnline && state.error && state.retryCount < 3) {
            const timer = setTimeout(() => {
                fetchProductos(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [state.isOnline, state.error, state.retryCount, fetchProductos]);

    const value = {
        ...state,
        toggleDarkMode,
        setFiltros,
        setCategoria,
        fetchProductos,
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