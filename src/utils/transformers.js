// Transformadores para los datos de Google Sheets

// Transformar productos
export const transformProductos = (rows) => {
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

// Transformar novedades
export const transformNovedades = (rows) => {
    return rows.map((row, index) => ({
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
    }));
};

// Transformar imágenes
export const transformImages = (rows) => {
    return rows.map(row => ({
        id: row.c[0]?.v || '',
        src: row.c[1]?.v || '',
        description: row.c[2]?.v || '',
        tipo: row.c[3]?.v?.toLowerCase().trim() || '',
    }));
};

// Separar novedades y ofertas
export const separateNovedadesAndOfertas = (novedadesData) => {
    const novedades = novedadesData.filter(item => 
        item.tipo === 'novedades' || item.tipo === 'novedad'
    );
    
    const ofertas = novedadesData.filter(item => 
        item.tipo === 'ofertas' || item.tipo === 'oferta' || 
        item.tipo === 'oferta especial' || item.tipo === 'ofertas especiales'
    );

    return { novedades, ofertas };
};

// Categorizar imágenes por tipo
export const categorizeImages = (imagesData) => {
    return imagesData.reduce(
        (acc, image) => {
            if (image.tipo === 'reloj') acc.reloj.push(image);
            if (image.tipo === 'joya') acc.joya.push(image);
            return acc;
        },
        { reloj: [], joya: [] }
    );
};

// Validar datos transformados
export const validateTransformedData = (data, type) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`No se encontraron ${type} disponibles`);
    }
    return data;
};

// Función de fallback para datos por defecto
export const getDefaultData = (type) => {
    switch (type) {
        case 'productos':
            return [
                {
                    id: 'producto-1',
                    nombre: 'Reloj Tissot T-Classic',
                    precio: 450,
                    imagen: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
                    categoria: 'relojes',
                    tipo: 'analógico',
                    estilo: 'clásico',
                    malla: 'cuero',
                    material: 'acero inoxidable',
                    marca: 'Tissot',
                    descripcion: 'Reloj elegante con movimiento automático',
                    stock: 5,
                    destacado: true,
                    fechaAgregado: new Date().toISOString()
                },
                {
                    id: 'producto-2',
                    nombre: 'Anillo de Oro 18k',
                    precio: 1200,
                    imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
                    categoria: 'joyas',
                    tipo: 'anillo',
                    estilo: 'moderno',
                    material: 'oro 18k',
                    marca: 'Yema',
                    descripcion: 'Anillo elegante con diseño único',
                    stock: 3,
                    destacado: false,
                    fechaAgregado: new Date().toISOString()
                }
            ];
        case 'novedades':
            return [
                {
                    id: 1,
                    titulo: "Nueva Colección de Relojes Suizos",
                    descripcion: "Descubre nuestra exclusiva colección de relojes de las mejores marcas suizas. Precisión y elegancia en cada detalle.",
                    fecha: "15 de diciembre de 2024",
                    imagen: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
                    categoria: "Relojes",
                    destacado: true
                },
                {
                    id: 2,
                    titulo: "Oferta Especial: Joyas de Oro",
                    descripcion: "Aprovecha nuestros descuentos especiales en joyas de oro de 18k. Diseños únicos y elegantes para toda ocasión.",
                    fecha: "10 de diciembre de 2024",
                    imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
                    categoria: "Joyas",
                    destacado: false
                }
            ];
        case 'ofertas':
            return [
                {
                    id: 1,
                    titulo: "Descuento del 20% en Relojes Deportivos",
                    descripcion: "Perfectos para el verano. Resistentes al agua y con cronógrafo incluido.",
                    descuento: "20% OFF",
                    validez: "Hasta el 31 de Enero",
                    fecha: "15 de diciembre de 2024",
                    imagen: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop"
                },
                {
                    id: 2,
                    titulo: "2x1 en Anillos de Plata",
                    descripcion: "Lleva dos anillos por el precio de uno. Diseños únicos y elegantes.",
                    descuento: "2x1",
                    validez: "Hasta el 15 de Enero",
                    fecha: "10 de diciembre de 2024",
                    imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"
                }
            ];
        case 'images':
            return [
                {
                    id: 'img-1',
                    src: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
                    description: 'Reloj Tissot T-Classic',
                    tipo: 'reloj'
                },
                {
                    id: 'img-2',
                    src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
                    description: 'Anillo de Oro 18k',
                    tipo: 'joya'
                }
            ];
        default:
            return [];
    }
}; 