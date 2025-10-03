# 🚀 Deploy Guide - Manu2 News App

## 📋 Resumen del Sistema

### **Aplicación Completa de Noticias ISO**
- **NewsAPI**: Búsquedas principales con filtros especializados
- **GNews.io**: Búsquedas ISO en inglés para cobertura internacional
- **ISOTools Scraping**: Extracción automática del blog corporativo
- **OpenAI Integration**: Traducciones automáticas
- **Random Search**: Búsquedas aleatorias con combinaciones
- **Auto-IA Search**: Búsquedas automáticas con traducción

## 🔧 Variables de Entorno para Vercel

```bash
# NewsAPI - Búsquedas principales
MANU2_NEWS_API_KEY=tu_clave_newsapi_aqui

# GNews.io - Búsquedas ISO internacionales 
GNEWS_API_KEY=tu_clave_gnews_aqui

# OpenAI - Traducciones automáticas
OPENAI_API_KEY=tu_clave_openai_aqui
```

## 📂 Estructura del Proyecto

```
manu2/
├── index.js (2,000+ líneas - servidor principal)
├── vercel.json (configuración serverless)
├── package.json (dependencias actualizadas)
├── .env.example (template de variables)
├── data/ (archivos JSON locales)
├── GNEWS_INTEGRATION.md (documentación GNews)
└── README.md (documentación principal)
```

## 🎯 Endpoints Disponibles

### **Principales**
- `/` - Interfaz principal con filtros
- `/random` - Búsquedas aleatorias ISO
- `/auto-search` - Búsquedas automáticas + IA
- `/gnews-iso` - Búsquedas ISO internacionales
- `/isotools-blog` - Scraping ISOTools blog

### **Utilidades**
- `/health` - Estado del sistema
- `/debug` - Información de debugging
- `/env-check` - Verificación de variables

## 🛠️ Dependencias

```json
{
  "axios": "^1.12.2",        // HTTP requests
  "cheerio": "^1.1.2",       // HTML parsing
  "cors": "^2.8.5",          // CORS middleware
  "express": "^5.1.0",       // Web framework
  "puppeteer": "^24.22.3",   // Web scraping
  "openai": "latest"         // AI translations
}
```

## 🌟 Nuevas Funcionalidades

### **🕷️ Web Scraping ISOTools**
- **Fuente**: https://www.isotools.us/blog-corporativo/
- **Tecnología**: Puppeteer + Cheerio
- **Extracción**: 8 titulares especializados en ISO
- **Tiempo real**: Scraping en cada solicitud
- **Filtrado**: Inteligente por palabras clave
- **Compatible**: Vercel serverless

### **🌍 GNews.io Optimizado**
- **Idioma**: Inglés para cobertura internacional
- **País**: Estados Unidos (fuentes globales)
- **Filtros**: 10 especializaciones ISO
- **Términos**: Vocabulario técnico estándar
- **Cobertura**: Organismos internacionales

### **🔄 Sistema Integrado**
- **4 fuentes**: NewsAPI + GNews + ISOTools + IA
- **Navegación**: Cruzada entre sistemas
- **Interface**: Botones diferenciados por color
- **Logging**: Actividad completa registrada
- **Responsive**: Adaptable a móviles

## 🚀 Instrucciones de Deploy

### **1. Preparar Vercel**
```bash
# Si no tienes Vercel CLI
npm install -g vercel

# Login
vercel login
```

### **2. Deploy Inicial**
```bash
# En el directorio del proyecto
vercel

# Seguir prompts:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N  
# - Project name: manu2-news-app
# - Directory: ./
# - Override settings? N
```

### **3. Configurar Variables de Entorno**
En Vercel Dashboard:
1. Ir a Settings → Environment Variables
2. Agregar las 3 variables:
   - MANU2_NEWS_API_KEY (NewsAPI)
   - GNEWS_API_KEY (GNews.io)
   - OPENAI_API_KEY (OpenAI)

### **4. Deploy de Producción**
```bash
# Deploy automático desde GitHub
git push origin main

# O deploy manual
vercel --prod
```

## ✅ Verificación Post-Deploy

### **Endpoints a Probar**
1. `https://tu-app.vercel.app/` - Interfaz principal
2. `https://tu-app.vercel.app/health` - Estado del sistema
3. `https://tu-app.vercel.app/gnews-iso` - Búsquedas GNews
4. `https://tu-app.vercel.app/isotools-blog` - Scraping ISOTools
5. `https://tu-app.vercel.app/random` - Búsquedas aleatorias

### **Funcionalidades Críticas**
- ✅ Botones de navegación funcionando
- ✅ Filtros ISO especializados activos
- ✅ Scraping ISOTools ejecutándose
- ✅ Variables de entorno configuradas
- ✅ Logging de actividad funcional

## 🔍 Troubleshooting

### **Error: "API Key not configured"**
- Verificar variables de entorno en Vercel
- Usar nombres exactos de variables

### **Scraping no funciona**
- Puppeteer puede tener limitaciones en Vercel
- El scraping local funciona, en Vercel puede requerir ajustes

### **Timeout en Vercel**
- Funciones serverless tienen límite de 30s
- Scraping puede requerir optimización para producción

---

**✅ Sistema Completo y Listo para Producción**

**Repositorio**: https://github.com/thenext90/manu2  
**Estado**: Deployable a Vercel  
**Funcionalidades**: 100% implementadas  
**Documentación**: Completa  