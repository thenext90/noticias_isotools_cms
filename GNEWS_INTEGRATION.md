# Integración GNews.io - Búsquedas ISO en Español

## 📋 Descripción
Se ha integrado la API de GNews.io para proporcionar búsquedas especializadas de noticias ISO en inglés (para mejor cobertura internacional), complementando las funcionalidades existentes de NewsAPI.

## 🔧 Configuración

### Variables de Entorno
Agregar a tu archivo `.env`:
```bash
GNEWS_API_KEY=287e66d0b4e9accb2a53b6010ff21c57
```

### URL Base
```
https://gnews.io/api/v4/search
```

## 🎯 Filtros Especializados ISO

### 1. **iso_calidad_gnews** - ISO 9001 Gestión de Calidad
- **Query**: `"ISO 9001 quality management certification compliance audit"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias especializadas en calidad y certificación

### 2. **iso_ambiental_gnews** - ISO 14001 Gestión Ambiental
- **Query**: `"ISO 14001 environmental management sustainability climate change certification"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de gestión y certificación ambiental

### 3. **iso_seguridad_gnews** - ISO 27001 Seguridad de la Información
- **Query**: `"ISO 27001 information security cybersecurity risk management controls"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de seguridad informática y gestión

### 4. **iso_salud_gnews** - ISO 45001 Seguridad y Salud en el Trabajo
- **Query**: `"ISO 45001 occupational health safety workplace certification compliance"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de seguridad y salud ocupacional

### 5. **iso_auditoria_gnews** - Auditoría ISO y Cumplimiento
- **Query**: `"ISO audit compliance certification management system assessment"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de auditorías y procesos de certificación

### 6. **iso_energia_gnews** - ISO 50001 Gestión Energética
- **Query**: `"ISO 50001 energy management efficiency sustainability certification"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de gestión y eficiencia energética

### 7. **iso_alimentaria_gnews** - ISO 22000 Seguridad Alimentaria
- **Query**: `"ISO 22000 food safety HACCP certification quality management"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de seguridad e inocuidad alimentaria

### 8. **iso_riesgos_gnews** - ISO 31000 Gestión de Riesgos
- **Query**: `"ISO 31000 risk management assessment framework business continuity"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de gestión y análisis de riesgos

### 9. **iso_continuidad_gnews** - ISO 22301 Continuidad del Negocio
- **Query**: `"ISO 22301 business continuity disaster recovery management certification"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias de continuidad y planes de contingencia

### 10. **iso_general_gnews** - ISO Búsqueda General
- **Query**: `"ISO standards certification quality management compliance audit"`
- **Idioma**: Inglés (mejor cobertura)
- **Tipo**: Noticias generales sobre normas y certificaciones ISO

## 🚀 Endpoints Disponibles

### `/gnews-iso`
- **Método**: GET
- **Parámetros**:
  - `filter` (opcional): Filtro ISO específico
  - Si no se especifica filtro, se usa `iso_general_gnews`
- **Respuesta**: HTML con resultados de búsqueda

### Ejemplos de uso:
```
GET /gnews-iso
GET /gnews-iso?filter=iso_calidad_gnews
GET /gnews-iso?filter=iso_ambiental_gnews
```

## 🎨 Características de la Interfaz

### Diseño Visual
- **Colores**: Gradientes verdes para identificar GNews.io
- **Badge**: Indicador "Powered by GNews.io"
- **Grid responsive**: Adaptable a dispositivos móviles
- **Navegación**: Integrada con el sistema principal

### Funcionalidades
- **Selector de filtros**: Grid visual para cambiar entre filtros ISO
- **Auto-refresh**: Actualización automática cada 5 minutos
- **Atajo de teclado**: Tecla 'G' para acceso rápido
- **Contador de resultados**: Muestra cantidad de noticias encontradas
- **Enlaces externos**: Apertura en nueva pestaña

## 🔗 Integración con Sistema Principal

### Botón de Acceso
Se agregó al menú principal:
```html
<a href="/gnews-iso" class="btn" style="background: linear-gradient(45deg, #e74c3c, #c0392b);">🌟 ISO - GNews</a>
```

### Navegación Cruzada
- **Desde GNews**: Enlaces a búsqueda principal, aleatoria y auto-IA
- **Hacia GNews**: Botón en interfaz principal y en resultados de otras búsquedas

## 📊 Ventajas de GNews.io

### Frente a NewsAPI
1. **Idioma inglés optimizado**: Mejor cobertura de noticias internacionales ISO
2. **Fuentes globales especializadas**: Medios internacionales especializados en normas
3. **Contenido ISO específico**: Mayor relevancia en normas y certificaciones internacionales
4. **Actualización internacional**: Noticias más recientes de organismos internacionales

### Casos de Uso Ideales
- **Empresas certificadoras**: Noticias de auditorías y certificaciones
- **Consultores ISO**: Actualizaciones de normas y cambios
- **Profesionales calidad**: Tendencias en gestión de calidad
- **Sector ambiental**: Noticias de gestión ambiental ISO 14001

## 🛠️ Implementación Técnica

### Función Principal
```javascript
async function searchGNews(query, filter = 'iso_general_gnews') {
    // Búsqueda en GNews.io con parámetros específicos
    // Manejo de errores y logging
    // Retorno de artículos formateados
}
```

### Generación de HTML
```javascript
function generateGNewsIsoHTML(articles, selectedFilter, query) {
    // Interfaz específica para GNews.io
    // Estilos diferenciados
    // Navegación integrada
}
```

## 📈 Métricas y Monitoreo

### Logging Incluido
- Queries ejecutadas
- Resultados obtenidos
- Errores de API
- Filtros más utilizados

### Debugging
- Endpoint de salud: `/health`
- Logs detallados en consola
- Manejo de errores específicos para GNews.io

## 🔮 Roadmap Futuro

### Próximas Mejoras
1. **Cache de resultados**: Reducir llamadas a API
2. **Búsqueda combinada**: NewsAPI + GNews.io simultáneamente
3. **Filtros avanzados**: Por fechas, fuentes específicas
4. **Alertas**: Notificaciones para nuevas noticias ISO
5. **Analytics**: Dashboard de uso y tendencias

### Integración IA
- **Traducción automática**: Noticias en inglés a español
- **Resúmenes inteligentes**: Síntesis de artículos largos
- **Clasificación automática**: Categorización por tipo de norma ISO
- **Tendencias**: Análisis de patrones en noticias ISO

---

**Desarrollado**: 2024  
**Versión**: 1.0  
**Estado**: ✅ Funcional  
**API**: GNews.io v4  