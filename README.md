# Yema Joyería - Sitio Web Optimizado

Sitio web moderno y optimizado para Joyería y Relojería Yema, construido con React y optimizado para performance.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Visualización de relojes y joyas con filtros avanzados
- **Formulario de Contacto**: Con validación en tiempo real y manejo de errores
- **Modo Oscuro/Claro**: Interfaz adaptable a preferencias del usuario
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Accesibilidad**: Cumple con estándares WCAG 2.1
- **SEO Optimizado**: Meta tags, Open Graph y estructura semántica
- **Visualizador de PDF**: Para catálogos y documentos técnicos
- **Carousel Interactivo**: Presentación dinámica de productos

### 🛠️ Tecnologías Utilizadas
- **React 18** - Biblioteca de interfaz de usuario
- **React Router v6** - Navegación entre páginas
- **Framer Motion** - Animaciones fluidas y transiciones
- **Context API** - Gestión de estado global
- **React Slick** - Carousel y sliders
- **React PDF Viewer** - Visualización de documentos PDF
- **CSS3** - Estilos modernos con Grid y Flexbox
- **Font Awesome** - Iconografía profesional

### 📱 Características Técnicas
- **PWA Ready** - Manifest y service worker configurados
- **Lazy Loading** - Carga optimizada de componentes e imágenes
- **Error Boundaries** - Manejo elegante de errores
- **Cache Inteligente** - Almacenamiento local de datos con expiración
- **Validación Avanzada** - Hooks personalizados para formularios con debounce
- **Performance Optimized** - Intersection Observer, memoización y code splitting
- **TypeScript Ready** - Preparado para migración a TS

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── layout/             # Componentes de estructura
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── Layout.js
│   ├── features/           # Componentes por funcionalidad
│   │   ├── products/       # Componentes relacionados con productos
│   │   ├── contact/        # Componentes de contacto
│   │   ├── home/           # Componentes de la página principal
│   │   └── inventory/      # Componentes de inventario
│   ├── ui/                 # Componentes de interfaz básicos
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── LoadingSpinner/
│   │   ├── SkeletonLoader/ # Componentes de skeleton loading
│   │   ├── LazyImage/      # Imágenes con lazy loading
│   │   └── ErrorBoundary/
│   └── shared/             # Componentes compartidos
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
│   ├── constants.js        # Configuración centralizada
│   └── webpack.config.js   # Configuración de build
├── assets/                 # Recursos estáticos
│   ├── images/
│   ├── icons/
│   └── documents/
└── styles/                 # Estilos globales
    ├── globals.css
    ├── variables.css
    └── themes.css
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/yema-joyeria.git

# Navegar al directorio
cd yema-joyeria

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
```

## 🚀 Optimizaciones Implementadas

### 1. **Performance**
- **API Service Centralizado**: Caché inteligente, prevención de peticiones duplicadas
- **Lazy Loading**: Imágenes y componentes cargan bajo demanda
- **Memoización**: React.memo, useMemo y useCallback optimizados
- **Code Splitting**: Bundle dividido automáticamente
- **Skeleton Loading**: Mejor percepción de velocidad

### 2. **UX Mejorada**
- **Manejo de Errores**: Error boundaries y mensajes amigables
- **Validación Inteligente**: Formularios con debounce y feedback inmediato
- **Animaciones Suaves**: Transiciones optimizadas con Framer Motion
- **Responsive Design**: Optimizado para todos los dispositivos

### 3. **Arquitectura**
- **Modular**: Separación clara de responsabilidades
- **Reutilizable**: Componentes y utilidades compartidas
- **Escalable**: Preparado para crecimiento
- **Mantenible**: Código limpio y documentado

## 📊 Configuración de Datos

El proyecto utiliza Google Sheets como base de datos. Para configurar:

1. Crea una hoja de cálculo en Google Sheets
2. Configura las columnas: ID, Nombre, Precio, Imagen, Categoría, etc.
3. Publica la hoja como JSON
4. Actualiza la URL en `src/config/constants.js`

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

### Colores y Temas
Los colores principales se pueden modificar en:
- `src/styles/variables.css` - Variables CSS globales
- `src/styles/themes.css` - Configuración de temas
- `src/config/constants.js` - Configuración de temas

### Configuración de Contacto
Actualiza la información de contacto en:
- `src/config/constants.js` - Datos de la empresa
- `public/index.html` - Meta tags de contacto

## 📱 PWA y Despliegue

### Configuración PWA
- Manifest configurado en `public/manifest.json`
- Service worker listo para implementar
- Iconos en múltiples tamaños

### Despliegue
```bash
# Construir para producción optimizado
npm run build:optimized

# Los archivos estarán en build/
```

### Plataformas de Despliegue Recomendadas
- **Netlify** - Despliegue automático desde Git
- **Vercel** - Optimizado para React
- **GitHub Pages** - Gratuito para proyectos públicos
- **Firebase Hosting** - Integración con servicios de Google

## 🔧 Mantenimiento

### Actualización de Productos
1. Modifica la hoja de Google Sheets
2. Los cambios se reflejan automáticamente
3. Cache se actualiza cada 5 minutos

### Logs y Monitoreo
- Errores se registran en consola (desarrollo)
- Error boundaries capturan errores de React
- Preparado para integración con Sentry/LogRocket

## 🧪 Testing

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas en modo watch
npm test -- --watch
```

## 📈 Performance

### Métricas Objetivo
- **Lighthouse Score**: >95 en todas las categorías
- **First Contentful Paint**: <1.2s
- **Largest Contentful Paint**: <2.0s
- **Cumulative Layout Shift**: <0.1

### Optimizaciones Implementadas
- Lazy loading de componentes e imágenes
- Optimización de imágenes con fallback
- Cache inteligente con expiración
- Bundle splitting automático
- Code splitting por rutas
- Memoización de componentes
- Skeleton loading
- Error boundaries

## 🔒 Seguridad

### Medidas Implementadas
- Validación del lado del cliente
- Sanitización de inputs
- Headers de seguridad
- CSP configurado
- HTTPS obligatorio
- Protección contra XSS

## 🚀 Roadmap

### Próximas Mejoras
- [ ] Migración a TypeScript
- [ ] Implementación de tests unitarios
- [ ] Integración con CMS (Strapi/Sanity)
- [ ] Sistema de notificaciones push
- [ ] Integración con WhatsApp Business API
- [ ] Panel de administración
- [ ] Sistema de reservas online
- [ ] Integración con pasarelas de pago

### Mejoras de Performance
- [x] Implementación de React.memo
- [x] Optimización de imágenes con lazy loading
- [ ] Service Worker para cache offline
- [x] Lazy loading de componentes
- [x] Bundle analyzer
- [x] Skeleton loading
- [x] Error boundaries mejorados

## 📞 Contacto

- **Email**: info@yemajoyeria.com
- **Teléfono**: +595 71 123 456
- **Dirección**: Circuito Comercial, Encarnación, Paraguay

## 🙏 Agradecimientos

- React Team por el framework
- Framer Motion por las animaciones
- Google Sheets por la API
- Comunidad de desarrolladores

---

**Desarrollado con ❤️ para Yema Joyería**
