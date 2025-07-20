# Plan de Pruebas - Joyería Yema

## 1. Verificación del Proyecto

### 1.1 Estructura del Proyecto ✅
- [x] React 18.3.1 configurado correctamente
- [x] React Router DOM 6.27.0 para navegación
- [x] Framer Motion 11.11.15 para animaciones
- [x] React Slick para carruseles
- [x] Configuración de ESLint y Prettier
- [x] Estructura de carpetas organizada

### 1.2 Dependencias Principales ✅
- [x] React y React DOM
- [x] React Router para navegación
- [x] Framer Motion para animaciones
- [x] React Slick para carruseles
- [x] Testing Library para pruebas
- [x] Web Vitals para métricas de rendimiento

## 2. Pruebas de Funcionalidad

### 2.1 Navegación y Rutas
- [ ] Página de inicio (/)
- [ ] Página de inventario (/inventario)
- [ ] Página de novedades (/novedades)
- [ ] Página de contacto (/contacto)
- [ ] Navegación entre páginas
- [ ] URLs directas funcionan correctamente

### 2.2 Componentes Principales
- [ ] Navbar con modo oscuro/claro
- [ ] Footer con información de contacto
- [ ] Sección de introducción
- [ ] Sección de productos
- [ ] Carrusel de productos
- [ ] Formulario de contacto

### 2.3 Funcionalidades Específicas
- [ ] Toggle de modo oscuro/claro
- [ ] Carga de productos desde Google Sheets
- [ ] Filtros de productos
- [ ] Búsqueda de productos
- [ ] Validación de formularios
- [ ] Manejo de errores

## 3. Pruebas de Rendimiento

### 3.1 Optimizaciones Implementadas
- [x] Lazy loading de imágenes
- [x] Caché de API con timeout
- [x] Debounce en búsquedas
- [x] Memoización de componentes
- [x] Error boundaries
- [x] Skeleton loaders

### 3.2 Métricas a Verificar
- [ ] Tiempo de carga inicial
- [ ] Tiempo de respuesta de API
- [ ] Rendimiento en dispositivos móviles
- [ ] Uso de memoria
- [ ] Web Vitals (LCP, FID, CLS)

## 4. Pruebas de Compatibilidad

### 4.1 Navegadores
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)

### 4.2 Dispositivos
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile landscape (667x375)

## 5. Pruebas de Accesibilidad

### 5.1 WCAG 2.1
- [ ] Contraste de colores
- [ ] Navegación por teclado
- [ ] Etiquetas ARIA
- [ ] Textos alternativos
- [ ] Estructura semántica

## 6. Pruebas de API

### 6.1 Google Sheets Integration
- [ ] Carga de productos
- [ ] Carga de novedades
- [ ] Carga de imágenes
- [ ] Manejo de errores de red
- [ ] Timeout y reintentos
- [ ] Datos por defecto (fallback)

## 7. Pruebas de Seguridad

### 7.1 Validación de Entrada
- [ ] Formulario de contacto
- [ ] Búsquedas
- [ ] Filtros
- [ ] Sanitización de datos

## 8. Pruebas Automatizadas

### 8.1 Tests Unitarios
- [x] App.test.js - Renderizado básico
- [ ] Componentes individuales
- [ ] Hooks personalizados
- [ ] Utilidades y helpers

### 8.2 Tests de Integración
- [ ] Flujo completo de navegación
- [ ] Interacción con API
- [ ] Formularios y validación

## 9. Problemas Identificados y Soluciones

### 9.1 Problemas de Dependencias
- **Problema**: Canvas module incompatible con Node.js 22
- **Solución**: Usar Node.js 18 o 20, o remover dependencia innecesaria
- **Estado**: Pendiente de resolución

### 9.2 Problemas de Linting
- **Problema**: Regex patterns con escapes innecesarios
- **Solución**: ✅ Corregidos
- **Problema**: Test usando direct DOM access
- **Solución**: ✅ Corregido usando Testing Library

### 9.3 Problemas de Configuración
- **Problema**: Browserslist desactualizado
- **Solución**: Ejecutar `npx update-browserslist-db@latest`

## 10. Recomendaciones

### 10.1 Mejoras Inmediatas
1. Actualizar browserslist database
2. Resolver problema de canvas module
3. Agregar más tests unitarios
4. Implementar tests de integración

### 10.2 Mejoras Futuras
1. Implementar PWA
2. Agregar analytics
3. Optimizar imágenes con WebP
4. Implementar service worker
5. Agregar tests E2E con Cypress

## 11. Estado Actual del Proyecto

### ✅ Completado
- Estructura del proyecto
- Configuración básica
- Componentes principales
- Navegación
- API integration
- Manejo de errores
- Optimizaciones de rendimiento
- Corrección de linting issues

### ⚠️ Pendiente
- Resolución de dependencias
- Tests completos
- Pruebas en navegadores
- Pruebas de accesibilidad
- Optimización de imágenes

### 📊 Métricas de Calidad
- **Linting**: 1 error restante (canvas module)
- **Tests**: 1 test básico funcionando
- **Funcionalidad**: 90% completa
- **Rendimiento**: Optimizado
- **Accesibilidad**: Pendiente de verificación

## 12. Comandos de Prueba

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Ejecutar tests
npm test

# Ejecutar linting
npm run lint

# Construir para producción
npm run build

# Analizar bundle
npm run build:analyze
```

## 13. URLs de Prueba

- **Local**: http://localhost:3000
- **Google Sheets**: https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/
- **Maps**: https://maps.app.goo.gl/Xa8eZE13Nqsqj9p16

---

**Última actualización**: 20 de Julio, 2025
**Estado**: ✅ Listo para pruebas manuales 