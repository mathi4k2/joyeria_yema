import { API_CONFIG } from '../config/constants';
import { getDefaultData } from './transformers';

// Clase para manejar las llamadas a la API
class ApiService {
    constructor() {
        this.cache = new Map();
        this.pendingRequests = new Map();
        this.maxCacheSize = 50; // Límite de 50 items en caché
    }

    // Limpiar datos de Google Sheets
    cleanGoogleSheetsData(text) {
        try {
            // Verificar si el texto contiene datos válidos
            if (!text || typeof text !== 'string') {
                throw new Error('Respuesta vacía o inválida');
            }

            // Remover el prefijo /*O_o*/ si existe
            let cleanText = text;
            if (text.includes('/*O_o*/')) {
                cleanText = text.split('/*O_o*/')[1];
            }

            const jsonStart = cleanText.indexOf('{');
            const jsonEnd = cleanText.lastIndexOf('}') + 1;
            
            if (jsonStart === -1 || jsonEnd === 0) {
                throw new Error('No se encontró JSON válido en la respuesta');
            }
            
            const jsonString = cleanText.substring(jsonStart, jsonEnd);
            const data = JSON.parse(jsonString);
            
            // Verificar estructura básica
            if (!data || typeof data !== 'object') {
                throw new Error('Datos JSON inválidos');
            }
            
            // Verificar si es una respuesta de Google Sheets
            if (data.table && data.table.rows) {
                return data;
            }
            
            // Si no tiene la estructura esperada, intentar procesar de otra manera
            console.warn('Estructura de datos inesperada, intentando procesar...');
            return data;
        } catch (error) {
            console.error('Error procesando datos de Google Sheets:', error);
            console.error('Respuesta recibida:', text);
            throw new Error(`Error al procesar los datos de Google Sheets: ${error.message}`);
        }
    }

    // Crear un controlador de aborto con timeout
    createAbortController(timeout = API_CONFIG.timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        return { controller, timeoutId };
    }

    // Verificar si hay datos en caché válidos
    getValidCache(key, cacheTime = API_CONFIG.cacheTime) {
        if (!this.cache.has(key)) return null;
        
        const cached = this.cache.get(key);
        const now = Date.now();
        
        if (now - cached.timestamp < cacheTime) {
            return cached.data;
        }
        
        // Eliminar caché expirado
        this.cache.delete(key);
        return null;
    }

    // Guardar datos en caché
    setCache(key, data) {
        // Limpiar caché si excede el límite
        if (this.cache.size >= this.maxCacheSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Verificar si hay una petición pendiente
    isRequestPending(key) {
        return this.pendingRequests.has(key);
    }

    // Agregar petición pendiente
    addPendingRequest(key, promise) {
        this.pendingRequests.set(key, promise);
        promise.finally(() => this.pendingRequests.delete(key));
    }

    // Obtener petición pendiente
    getPendingRequest(key) {
        return this.pendingRequests.get(key);
    }

    // Función principal para hacer fetch
    async fetchData(url, options = {}) {
        const cacheKey = url;
        
        // Verificar caché
        const cachedData = this.getValidCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Verificar si hay una petición pendiente
        if (this.isRequestPending(cacheKey)) {
            return this.getPendingRequest(cacheKey);
        }

        // Crear controlador de aborto
        const { controller, timeoutId } = this.createAbortController();

        try {
            // console.log('Haciendo fetch a:', url);
            
            const fetchPromise = fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache',
                    ...options.headers
                }
            });

            // Agregar a peticiones pendientes
            this.addPendingRequest(cacheKey, fetchPromise);

            const response = await fetchPromise;
            clearTimeout(timeoutId);

            // console.log('Respuesta HTTP:', response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            const text = await response.text();
            // console.log('Respuesta recibida (primeros 200 chars):', text.substring(0, 200));
            
            const data = this.cleanGoogleSheetsData(text);
            // console.log('Datos procesados:', data);

            // Guardar en caché
            this.setCache(cacheKey, data);

            return data;

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('La solicitud tardó demasiado. Verifica tu conexión.');
            }
            
            throw error;
        }
    }

    // Limpiar caché
    clearCache() {
        this.cache.clear();
    }

    // Limpiar caché expirado
    clearExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > API_CONFIG.cacheTime) {
                this.cache.delete(key);
            }
        }
    }
}

// Instancia singleton
export const apiService = new ApiService();

// Funciones específicas para diferentes tipos de datos
export const fetchProductos = async (forceRefresh = false) => {
    try {
        if (forceRefresh) {
            apiService.clearCache();
        }
        
        const data = await apiService.fetchData(API_CONFIG.baseUrl);
        
        // Verificar si los datos tienen la estructura esperada
        if (data && data.table && data.table.rows) {
            return data.table.rows;
        }
        
        // Si no tiene la estructura esperada, usar datos de fallback
        console.warn('Estructura de datos inesperada, usando datos de fallback');
        throw new Error('Estructura de datos inesperada');
        
    } catch (error) {
        console.error('Error en fetchProductos:', error);
        console.log('Usando datos de fallback para productos');
        // Convertir datos de fallback al formato esperado por el transformador
        const fallbackData = getDefaultData('productos');
        return fallbackData.map((item, index) => ({
            c: [
                { v: item.id || index + 1 },
                { v: item.nombre || '' },
                { v: item.precio || 0 },
                { v: item.imagen || '' },
                { v: item.categoria || '' },
                { v: item.tipo || '' },
                { v: item.estilo || '' },
                { v: item.malla || '' },
                { v: item.material || '' },
                { v: item.marca || '' },
                { v: item.descripcion || '' },
                { v: item.stock || 0 },
                { v: item.destacado ? 'true' : 'false' },
                { v: item.fechaAgregado || new Date().toISOString() }
            ]
        }));
    }
};

export const fetchNovedades = async () => {
    try {
        const data = await apiService.fetchData(API_CONFIG.novedadesUrl);
        
        // Verificar si los datos tienen la estructura esperada
        if (data && data.table && data.table.rows) {
            return data.table.rows;
        }
        
        // Si no tiene la estructura esperada, usar datos de fallback
        console.warn('Estructura de datos inesperada, usando datos de fallback');
        throw new Error('Estructura de datos inesperada');
        
    } catch (error) {
        console.error('Error en fetchNovedades:', error);
        console.log('Usando datos de fallback para novedades');
        // Convertir datos de fallback al formato esperado por el transformador
        const fallbackData = getDefaultData('novedades');
        return fallbackData.map((item, index) => ({
            c: [
                { v: item.id || index + 1 },
                { v: item.titulo || '' },
                { v: item.descripcion || '' },
                { v: item.fecha || '' },
                { v: item.imagen || '' },
                { v: item.categoria || '' },
                { v: item.destacado ? 'true' : 'false' },
                { v: item.tipo || 'novedad' },
                { v: item.descuento || '' },
                { v: item.validez || '' }
            ]
        }));
    }
};

export const fetchImages = async () => {
    try {
        const data = await apiService.fetchData(API_CONFIG.imagesUrl);

        // Permitir cualquier estructura que contenga un array de imágenes
        if (data && data.table && Array.isArray(data.table.rows)) {
            return data.table.rows;
        }
        // Si data es un array directamente
        if (Array.isArray(data)) {
            return data;
        }
        // Si data.rows es un array
        if (data && Array.isArray(data.rows)) {
            return data.rows;
        }
        // Si data.images es un array
        if (data && Array.isArray(data.images)) {
            return data.images;
        }
        // Si no tiene la estructura esperada, usar datos de fallback
        console.warn('Estructura de datos inesperada, usando datos de fallback');
        throw new Error('Estructura de datos inesperada');
    } catch (error) {
        console.error('Error en fetchImages:', error);
        console.log('Usando datos de fallback para imágenes');
        // Convertir datos de fallback al formato esperado por el transformador
        const fallbackData = getDefaultData('images');
        return fallbackData.map((item, index) => ({
            c: [
                { v: item.id || index + 1 },
                { v: item.src || '' },
                { v: item.description || '' },
                { v: item.tipo || '' }
            ]
        }));
    }
};

export default apiService; 