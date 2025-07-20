# Relojería Benítez - Sitio Web

Sitio web moderno y responsive para Relojería Benítez, especializada en la venta de relojes y joyas en Encarnación, Paraguay.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Catálogo de Productos**: Visualización de relojes y joyas con filtros avanzados
- **Formulario de Contacto**: Con validación en tiempo real y manejo de errores
- **Modo Oscuro/Claro**: Interfaz adaptable a preferencias del usuario
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Accesibilidad**: Cumple con estándares WCAG 2.1
- **SEO Optimizado**: Meta tags, Open Graph y estructura semántica

### 🛠️ Tecnologías Utilizadas
- **React 18** - Biblioteca de interfaz de usuario
- **React Router** - Navegación entre páginas
- **Framer Motion** - Animaciones fluidas
- **Context API** - Gestión de estado global
- **CSS3** - Estilos modernos con Grid y Flexbox
- **Font Awesome** - Iconografía profesional

### 📱 Características Técnicas
- **PWA Ready** - Manifest y service worker configurados
- **Lazy Loading** - Carga optimizada de componentes
- **Error Boundaries** - Manejo elegante de errores
- **Cache Inteligente** - Almacenamiento local de datos
- **Validación Avanzada** - Hooks personalizados para formularios
- **Performance Optimized** - Intersection Observer y debouncing

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── css/            # Estilos de componentes
│   ├── ui/             # Componentes de interfaz
│   └── ...
├── context/            # Context API y estado global
├── hooks/              # Hooks personalizados
├── config/             # Configuraciones y constantes
├── imgs/               # Imágenes estáticas
└── ...
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/relojeria-benitez.git

# Navegar al directorio
cd relojeria-benitez

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles
```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm run test       # Ejecuta las pruebas
npm run eject      # Expone la configuración de webpack
```

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
- `src/components/css/` - Archivos CSS de componentes
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
# Construir para producción
npm run build

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
npm test -- --coverage

# Ejecutar pruebas en modo watch
npm test -- --watch
```

## 📈 Performance

### Métricas Objetivo
- **Lighthouse Score**: >90 en todas las categorías
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Optimizaciones Implementadas
- Lazy loading de componentes
- Optimización de imágenes
- Cache inteligente
- Bundle splitting
- Code splitting

## 🔒 Seguridad

### Medidas Implementadas
- Validación del lado del cliente
- Sanitización de inputs
- Headers de seguridad
- CSP configurado
- HTTPS obligatorio

## 📞 Soporte

### Contacto
- **Email**: info@relojeriabenitez.com
- **Teléfono**: +595 71 123 456
- **Dirección**: Circuito Comercial, Encarnación, Paraguay

### Reportar Issues
1. Verifica que el issue no esté ya reportado
2. Usa el template de issue
3. Incluye pasos para reproducir
4. Adjunta capturas de pantalla si es necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📋 Changelog

### v1.0.0 (2024-01-XX)
- ✨ Lanzamiento inicial
- 🎨 Diseño responsive completo
- 📱 Soporte PWA
- 🔧 Sistema de validación avanzado
- 🛡️ Error boundaries implementados
- ⚡ Optimizaciones de performance

---

**Desarrollado con ❤️ para Relojería Benítez**
