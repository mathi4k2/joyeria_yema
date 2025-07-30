# Relojería Benítez - Sitio Web

Sitio web para Relojería Benítez, especializada en venta de relojes y joyas en Encarnación, Paraguay.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Visualización de relojes y joyas con filtros
- **Formulario de Contacto**: Con validación en tiempo real
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Visualizador de PDF**: Para catálogos y documentos técnicos
- **Carousel Interactivo**: Presentación dinámica de productos

### 🛠️ Tecnologías Utilizadas
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **React Router v6.27.0** - Navegación entre páginas
- **Framer Motion 11.11.15** - Animaciones fluidas y transiciones
- **React Slick 0.30.2** - Carousel y sliders
- **React PDF Viewer 3.12.0** - Visualización de documentos PDF
- **CSS3** - Estilos modernos con Grid y Flexbox

### 📱 Características Técnicas
- **Lazy Loading** - Carga optimizada de componentes e imágenes
- **Error Boundaries** - Manejo elegante de errores
- **Validación Avanzada** - Hooks personalizados para formularios
- **Performance Optimized** - Intersection Observer y memoización

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── layout/             # Componentes de estructura
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── features/           # Componentes por funcionalidad
│   │   ├── products/       # Componentes relacionados con productos
│   │   ├── contact/        # Componentes de contacto
│   │   ├── home/           # Componentes de la página principal
│   │   ├── inventory/      # Componentes de inventario
│   │   └── novedades/      # Componentes de novedades
│   ├── ui/                 # Componentes de interfaz básicos
│   │   ├── LoadingSpinner/
│   │   ├── SkeletonLoader/ # Componentes de skeleton loading
│   │   ├── LazyImage/      # Imágenes con lazy loading
│   │   ├── ErrorBoundary/
│   │   └── SearchBar/
│   ├── shared/             # Componentes compartidos
│   └── carrusel/           # Imágenes del carrusel
├── hooks/                  # Hooks personalizados
│   ├── useFormValidation.js
│   ├── useOptimizedForm.js # Hook optimizado para formularios
│   └── useProductos.js
├── context/                # Context API y estado global
│   └── AppContext.js       # Context optimizado
├── utils/                  # Utilidades y servicios
│   ├── api.js              # Servicio de API centralizado
│   ├── transformers.js     # Transformadores de datos
│   └── errorHandler.js     # Manejo centralizado de errores
├── config/                 # Configuración
│   └── constants.js        # Configuración centralizada
├── assets/                 # Recursos estáticos
│   ├── images/
│   ├── icons/
│   └── documents/
└── styles/                 # Estilos globales
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/mathi4k2/joyeria_yema.git

# Navegar al directorio
cd joyeria_yema

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles
```bash
npm start              # Inicia el servidor de desarrollo
npm run build          # Construye la aplicación para producción
npm run build:optimized # Build optimizado sin source maps
npm run build:analyze  # Build con análisis del bundle
npm test               # Ejecuta las pruebas
npm run test:coverage  # Tests con cobertura
npm run lint           # Ejecuta el linter
npm run lint:fix       # Corrige errores de linting
npm run format         # Formatea el código
npm run eject          # Expone la configuración de webpack
npm run predeploy      # Prepara para despliegue
npm run deploy         # Despliega a GitHub Pages
```

## 📊 Configuración de Datos

El proyecto utiliza Google Sheets como base de datos. La configuración actual incluye:

- **URL Principal**: Google Sheets con productos
- **URL Novedades**: Hoja específica para novedades
- **URL Imágenes**: Hoja para gestión de imágenes

### Estructura de Datos Esperada
```json
{
  "table": {
    "rows": [
      {
        "c": [
          {"v": "id"},
          {"v": "nombre"},
          {"v": "precio"},
          {"v": "imagen_url"},
          {"v": "categoria"},
          {"v": "tipo"},
          {"v": "estilo"},
          {"v": "malla"},
          {"v": "material"},
          {"v": "marca"}
        ]
      }
    ]
  }
}
```

## 🎨 Personalización

### Configuración de Contacto
La información de contacto se puede modificar en `src/config/constants.js`:

```javascript
contact: {
    phone: '+595 71 123 456',
    email: 'info@relojeriabenitez.com',
    address: 'Circuito Comercial, Encarnación, Paraguay',
    mapsUrl: 'https://maps.app.goo.gl/Xa8eZE13Nqsqj9p16'
}
```

### Horarios de Atención
```javascript
hours: {
    weekdays: '8:00 AM - 6:00 PM',
    saturday: '8:00 AM - 12:00 PM',
    sunday: 'Cerrado'
}
```

## 📱 Despliegue

### Despliegue en GitHub Pages
```bash
# Construir para producción
npm run build

# Desplegar automáticamente
npm run deploy
```

El sitio está disponible en: https://mathi4k2.github.io/joyeria_yema

## 🧪 Testing

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas en modo watch
npm test -- --watch
```

## 🔒 Seguridad

### Medidas Implementadas
- Validación del lado del cliente
- Sanitización de inputs
- Headers de seguridad
- Protección contra XSS

## 📞 Información de Contacto

- **Email**: info@relojeriabenitez.com
- **Teléfono**: +595 71 123 456
- **Dirección**: Circuito Comercial, Encarnación, Paraguay
- **Horarios**: Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 8:00 AM - 12:00 PM

## 🛠️ Servicios Ofrecidos

- Venta de Relojes
- Venta de Joyas
- Servicio Técnico
- Mantenimiento
- Garantía
- Financiación

---

**Desarrollado para Relojería Benítez**
