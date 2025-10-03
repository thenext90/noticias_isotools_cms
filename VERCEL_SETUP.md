# 🚀 CONFIGURACIÓN DE VARIABLES EN VERCEL

Para que las búsquedas automáticas con OpenAI funcionen en producción, 
debes configurar las siguientes variables de entorno en Vercel:

## 📋 Variables requeridas:

1. **MANU2_NEWS_API_KEY**
   - Valor: [Tu API Key de NewsAPI]
   - Descripción: API Key de NewsAPI para obtener noticias

2. **OPENAI_API_KEY** 
   - Valor: [Tu API Key de OpenAI]
   - Descripción: API Key de OpenAI para traducción automática

## 🔧 Cómo configurar en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Ir a Settings → Environment Variables
3. Agregar cada variable:
   - Name: MANU2_NEWS_API_KEY
   - Value: [tu API key de NewsAPI]
   - Environment: Production, Preview, Development
   
   - Name: OPENAI_API_KEY  
   - Value: [tu API key de OpenAI]
   - Environment: Production, Preview, Development

4. Hacer re-deploy del proyecto

## ✅ Verificación:

- Ve a: https://tu-dominio.vercel.app/auto-search
- Debería ejecutar búsqueda automática y traducir con IA
- Revisa los logs en Vercel para confirmar funcionamiento

## 🔍 Testing Local:

```bash
# Verificar que las variables estén configuradas
curl http://localhost:3000/auto-search

# Debería retornar JSON con búsqueda y traducción
```