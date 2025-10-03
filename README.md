# 🤖 ISOTools Resúmenes con Inteligencia Artificial

## 📖 Descripción

Aplicación web dedicada que extrae automáticamente artículos del blog corporativo de ISOTools y genera resúmenes profesionales usando OpenAI GPT-3.5-turbo. Especializada en contenido sobre normas ISO, sistemas de gestión de calidad y certificaciones.

## ✨ Características Principales

- 🕷️ **Web Scraping Automático**: Extrae artículos en tiempo real del blog de ISOTools
- 🤖 **Resúmenes con IA**: Genera resúmenes profesionales usando GPT-3.5-turbo
- 📊 **Estadísticas en Tiempo Real**: Muestra métricas de procesamiento y tasa de éxito
- 🎨 **Interfaz Moderna**: Diseño responsive con gradientes y animaciones
- 📱 **Mobile-First**: Optimizada para dispositivos móviles
- ⚡ **Serverless Ready**: Optimizada para despliegue en Vercel
- 🔄 **Auto-actualización**: Contenido que se actualiza cada 10 minutos

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **IA**: OpenAI GPT-3.5-turbo
- **Web Scraping**: Cheerio + Node-fetch
- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **Despliegue**: Vercel Serverless
- **Estilo**: CSS Grid + Flexbox + Gradientes

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- Cuenta de OpenAI con API key
- Cuenta de Vercel (para despliegue)

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/isotools-summaries-ai.git
cd isotools-summaries-ai

# Cambiar a la rama específica
git checkout isotools-summaries-only

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y añadir tu OPENAI_API_KEY

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno
```bash
OPENAI_API_KEY=tu_api_key_de_openai_aqui
PORT=3000
NODE_ENV=production
```

## 📡 Endpoints de la API

### `GET /`
- **Descripción**: Página principal con resúmenes generados con IA
- **Respuesta**: HTML con interfaz visual completa
- **Características**: 
  - Scraping en tiempo real de ISOTools
  - Generación automática de resúmenes con GPT-3.5
  - Estadísticas de procesamiento
  - Interfaz responsive

### `GET /json`
- **Descripción**: Datos en formato JSON para integraciones
- **Respuesta**: JSON con artículos extraídos
- **Uso**: Ideal para Make.com, Zapier, APIs externas

### `GET /health`
- **Descripción**: Estado de salud de la aplicación
- **Respuesta**: JSON con información del sistema
- **Datos**: Estado de OpenAI, timestamp, configuración

## 🤖 Funcionalidad de IA

### Generación de Resúmenes
- **Modelo**: OpenAI GPT-3.5-turbo
- **Prompt Optimizado**: Especializado en contenido ISO y gestión de calidad
- **Longitud**: 2-3 oraciones profesionales
- **Enfoque**: Beneficios empresariales y aplicaciones prácticas
- **Fallback**: Sistema de respaldo en caso de error

### Características del Prompt
```javascript
// Prompt optimizado para contenido ISO
const prompt = `Como experto en normas ISO y sistemas de gestión, 
genera un resumen profesional y conciso sobre el artículo:
"${title}"

El resumen debe:
- Explicar beneficios clave para organizaciones
- Mencionar aplicaciones prácticas  
- Usar terminología profesional de gestión de calidad
- Ser directo y orientado a resultados`;
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Gradiente azul-púrpura (#667eea → #764ba2)
- **Secundario**: Verde éxito (#27ae60), Rojo error (#e74c3c)
- **Neutros**: Grises modernos (#2c3e50, #7f8c8d)

### Componentes Clave
- **Header**: Logo de ISOTools + descripción del servicio
- **Stats Cards**: Métricas en tiempo real con animaciones
- **Article Cards**: Diseño tipo card con resúmenes destacados
- **AI Badges**: Indicadores de estado de procesamiento IA

## 📊 Métricas y Monitoreo

### Estadísticas Mostradas
- **Artículos Procesados**: Total de artículos extraídos
- **Resúmenes IA Generados**: Número de resúmenes exitosos
- **Tasa de Éxito**: Porcentaje de procesamiento exitoso
- **Modelo IA**: Versión de GPT utilizada

### Monitoreo en Tiempo Real
- Auto-refresh cada 10 minutos
- Indicadores de estado por artículo
- Manejo de errores con fallbacks
- Logs detallados en consola

## 🔄 Flujo de Datos

1. **Scraping**: Extrae artículos de isotools.us/blog-corporativo
2. **Filtrado**: Selecciona contenido relevante sobre ISO
3. **IA Processing**: Genera resúmenes con OpenAI GPT-3.5
4. **Presentación**: Muestra en interfaz con estadísticas
5. **Actualización**: Refresco automático cada 10 minutos

## 🚀 Despliegue en Vercel

### Configuración Automática
```bash
# Conectar con Vercel
vercel

# Configurar variables de entorno en Vercel Dashboard
OPENAI_API_KEY=tu_api_key

# Desplegar
vercel --prod
```

### Configuración de Dominio
- Configurar dominio personalizado en Vercel
- SSL automático incluido
- Edge functions globales
- Monitoreo integrado

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px - Grid completo
- **Tablet**: 768px - Grid adaptativo  
- **Mobile**: < 768px - Layout vertical

### Optimizaciones Mobile
- Cards apiladas verticalmente
- Texto legible en pantallas pequeñas
- Botones touch-friendly
- Navegación simplificada

## 🔒 Seguridad

### Headers de Seguridad
```javascript
X-Frame-Options: DENY
X-Content-Type-Options: nosniff  
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Protección de API
- Rate limiting implícito de Vercel
- Validación de entrada
- Sanitización de HTML
- Manejo seguro de errores

## 🐛 Solución de Problemas

### Errores Comunes

**Error de OpenAI**
```bash
⚠️ OpenAI no configurado - funcionalidad limitada
```
- Verificar OPENAI_API_KEY en variables de entorno
- Comprobar saldo de la cuenta OpenAI
- Validar permisos de la API key

**Error de Scraping**
```bash
❌ Error en scraping, usando datos de fallback
```
- Red inestable o sitio no disponible
- Se usa sistema de fallback automático
- Datos de ejemplo precargados

### Logs de Debug
```bash
🕷️ Iniciando scraping de ISOTools...
📝 Generando resúmenes para 8 artículos...
✅ Procesamiento completado: 7 éxitos, 1 errores
```

## 📈 Roadmap Futuro

### V2.1 - Próximas Mejoras
- [ ] Cache Redis para resúmenes
- [ ] Múltiples fuentes de contenido ISO
- [ ] Resúmenes en múltiples idiomas
- [ ] API webhooks para notificaciones

### V2.2 - Funcionalidades Avanzadas  
- [ ] Dashboard de analytics
- [ ] Integración con CRM
- [ ] Resúmenes personalizados por industria
- [ ] Sistema de suscripciones

## 👥 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🏢 Sobre ISOTools

ISOTools es una plataforma líder en software para sistemas de gestión ISO, ayudando a organizaciones a implementar y mantener certificaciones de calidad, seguridad y medio ambiente.

- **Web**: https://www.isotools.us
- **Blog**: https://www.isotools.us/blog-corporativo/
- **Especialización**: ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 42001

## 📞 Soporte

Para soporte técnico:
- 📧 Email: soporte@tu-dominio.com
- 💬 Issues: GitHub Issues
- 📱 Telegram: @tu-usuario

---

**⚡ Aplicación optimizada para resúmenes automáticos con IA de contenido ISO profesional**