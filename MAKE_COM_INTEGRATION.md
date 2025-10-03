# 🔗 Integración ISOTools con Make.com para Resúmenes con IA

## 📊 **Endpoint JSON para Make.com**

### **URL del Endpoint:**
```
GET https://manu2-cd74xz0ks-socito2000-gmailcoms-projects.vercel.app/isotools-json
```

---

## 🚀 **Configuración en Make.com**

### **1. Crear Nuevo Escenario:**
1. Nuevo escenario en Make.com
2. Agregar módulo **"HTTP > Make a Request"**
3. Configurar como GET request al endpoint JSON

### **2. Configuración del Webhook HTTP:**
```json
{
  "url": "https://manu2-cd74xz0ks-socito2000-gmailcoms-projects.vercel.app/isotools-json",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

### **3. Estructura de Datos Recibidos:**
```json
{
  "metadata": {
    "source": "ISOTools Corporate Blog",
    "extracted_at": "timestamp",
    "total_articles": "número",
    "purpose": "AI Summary Generation via Make.com"
  },
  "articles": [
    {
      "id": 1,
      "title": "título del artículo",
      "url": "enlace directo",
      "source": "ISOTools Blog",
      "category": "ISO_Corporate_Blog",
      "ready_for_ai_summary": true,
      "content_type": "ISO_Article",
      "language": "Spanish"
    }
  ]
}
```

---

## 🤖 **Configuración del Módulo de IA**

### **Módulos de IA Recomendados:**
- **OpenAI GPT-4** 
- **Claude (Anthropic)**
- **Google Gemini**
- **Azure OpenAI**

### **Prompt Recomendado para IA:**
```
Genera un resumen conciso de 2-3 oraciones del artículo ISO basado en el siguiente título:

TÍTULO: {{title}}
URL: {{url}}

Enfócate en:
- Beneficios clave del estándar ISO mencionado
- Aplicaciones prácticas para organizaciones
- Impacto en la gestión empresarial

Formato: Párrafo directo sin títulos ni viñetas.
Idioma: Español profesional.
```

---

## 🔄 **Flujo de Trabajo Sugerido**

### **Escenario Make.com:**

1. **Trigger:** Programar cada 6 horas o diariamente
2. **HTTP Request:** Obtener JSON de ISOTools
3. **Iterator:** Iterar sobre array "articles"
4. **IA Module:** Generar resumen para cada artículo
5. **Format:** Combinar título + resumen + URL
6. **Output:** 
   - Guardar en Google Sheets
   - Enviar por email
   - Publicar en Slack
   - Almacenar en base de datos

### **Ejemplo de Output Final:**
```
TÍTULO: ¿Cómo decidir si la certificación del estándar ISO 42001 es la opción adecuada para su organización?

RESUMEN: La certificación ISO 42001 ayuda a las organizaciones a implementar sistemas de gestión de inteligencia artificial responsable, evaluando riesgos y estableciendo controles éticos. Es especialmente valiosa para empresas que desarrollan o utilizan IA intensivamente, proporcionando un marco para la gobernanza tecnológica y el cumplimiento regulatorio.

URL: https://www.isotools.us/2025/09/25/como-decidir-si-la-certificacion-del-estandar-iso-42001-es-la-opcion-adecuada-para-su-organizacion/

---
```

---

## 📋 **Variables Disponibles en Make.com**

```javascript
// Datos del artículo
{{articles.id}}              // ID numérico
{{articles.title}}           // Título completo
{{articles.url}}             // URL directa
{{articles.source}}          // "ISOTools Blog"
{{articles.category}}        // "ISO_Corporate_Blog"
{{articles.extracted_date}}  // Timestamp de extracción
{{articles.language}}        // "Spanish"

// Metadatos
{{metadata.total_articles}}  // Número total de artículos
{{metadata.extracted_at}}    // Fecha de extracción
{{metadata.source}}          // "ISOTools Corporate Blog"
```

---

## 🎯 **Beneficios de esta Integración**

### **Para el Contenido:**
- ✅ **Resúmenes automáticos** de artículos ISO especializados
- ✅ **Actualización continua** con últimos contenidos
- ✅ **Filtrado inteligente** de contenido relevante
- ✅ **Formato estructurado** fácil de procesar

### **Para Make.com:**
- ✅ **JSON limpio** optimizado para automatización
- ✅ **Campos identificados** para IA processing
- ✅ **Metadatos completos** para control de flujo
- ✅ **URLs directas** para acceso al contenido completo

### **Para la IA:**
- ✅ **Prompts optimizados** para contenido ISO
- ✅ **Contexto especializado** en gestión empresarial
- ✅ **Formato consistente** para mejores resultados
- ✅ **Idioma identificado** para procesamiento apropiado

---

## 🔧 **Troubleshooting**

### **Problemas Comunes:**
1. **Timeout en Make.com:** El endpoint tiene timeout de 15s para Vercel
2. **Artículos vacíos:** El sistema incluye fallback con contenido real
3. **Rate limiting:** Sin límites específicos, pero usar responsablemente

### **Verificación:**
- Test del endpoint: Abrir la URL directamente en navegador
- Validar JSON: Usar herramientas como JSONLint
- Check Make.com: Verificar que recibe datos correctamente

---

## 📞 **Soporte**

- **Endpoint Status:** Verificar en navegador
- **Logs:** Disponibles en Vercel dashboard
- **Updates:** Automáticos con cada deploy

**¡Tu sistema de resúmenes automáticos ISO está listo para Make.com!** 🚀