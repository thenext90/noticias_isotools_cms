# 🚀 Generador JSON ISOTools con IA

## 📋 Descripción
Script automático que extrae artículos de ISOTools, los procesa con OpenAI GPT-3.5-turbo y genera un JSON estructurado listo para consumo externo via GitHub RAW.

## ✨ Funcionalidades
- 🕷️ **Web Scraping** automático de isotools.us/blog-corporativo
- 🤖 **Resúmenes con IA** usando OpenAI GPT-3.5-turbo
- 📊 **Categorización automática** por tipos de ISO
- 📄 **JSON estructurado** con metadata y estadísticas
- 🔄 **Sistema de fallback** para máxima disponibilidad
- 📈 **Estadísticas detalladas** de procesamiento

## 🛠️ Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar API Key (opcional)
```bash
# Copiar template de configuración
cp env.example .env

# Editar .env con tu OpenAI API Key
OPENAI_API_KEY=sk-proj-tu_api_key_aqui
```

### 3. Ejecutar generador
```bash
# Generar JSON con scraping + IA
node generate-final-json.js

# O usar npm script
npm run generate
```

## 📄 Output

### Archivo generado: `isotools-final-data.json`

Estructura del JSON:
```json
{
  "metadata": {
    "title": "ISOTools - Artículos Procesados con IA",
    "source": "ISOTools Corporate Blog",
    "total_articles": 5,
    "ai_model": "OpenAI GPT-3.5-turbo",
    "generated_at": "2025-10-03T01:48:47.313Z"
  },
  "data": [
    {
      "id": 1,
      "title": "Título del artículo extraído",
      "url": "https://isotools.us/...",
      "ai_summary": "Resumen profesional generado por IA...",
      "category": "ISO_42001_Inteligencia_Artificial",
      "ai_generated": true
    }
  ],
  "statistics": {
    "ai_success_rate": "100%",
    "avg_summary_length": 532,
    "categories_identified": ["ISO_42001_IA", "ISO_9001_Calidad", "ISO_14001_Ambiental"]
  }
}
```

## 🌐 Consumo desde otro repositorio

### 1. Subir JSON a GitHub
```bash
# Copiar isotools-final-data.json a tu otro repo
cp isotools-final-data.json ../tu-otro-repo/

# Subir a GitHub
cd ../tu-otro-repo/
git add isotools-final-data.json
git commit -m "Add ISOTools data"
git push
```

### 2. Usar URL RAW para consumo
```javascript
// URL RAW de GitHub
const jsonUrl = 'https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-final-data.json';

// Consumir datos
const response = await fetch(jsonUrl);
const isotoolsData = await response.json();

console.log(`📊 ${isotoolsData.metadata.total_articles} artículos disponibles`);
isotoolsData.data.forEach(article => {
    console.log(`📰 ${article.title}`);
    console.log(`📝 ${article.ai_summary}`);
});
```

### 3. Usar el consumer incluido
```javascript
// Usar example-consumer.js para facilitar el consumo
const { ISOToolsConsumer } = require('./example-consumer.js');

const consumer = new ISOToolsConsumer('tu-github-raw-url');
const data = await consumer.fetchData();
const aiArticles = await consumer.getByCategory('ISO_42001_Inteligencia_Artificial');
```

## 📊 Resultados del último procesamiento

- ✅ **5 artículos** procesados exitosamente
- ✅ **100%** de resúmenes generados con IA
- ✅ **3 categorías** identificadas automáticamente
- ✅ **532 caracteres** promedio por resumen
- ✅ **14 segundos** tiempo de procesamiento
- ✅ **Fallback incluido** para máxima disponibilidad

## 🏷️ Categorías automáticas

- `ISO_42001_Inteligencia_Artificial` - Artículos sobre IA y ISO 42001
- `ISO_27001_Seguridad_Informacion` - Seguridad y gestión de información
- `ISO_9001_Gestion_Calidad` - Gestión de calidad y excelencia
- `ISO_14001_Gestion_Ambiental` - Medio ambiente y sostenibilidad
- `Herramientas_Digitales_ISO` - Software y herramientas digitales
- `ISO_Normas_Generales` - Normas ISO generales

## 🔧 Configuración avanzada

### Variables de entorno soportadas:
```bash
OPENAI_API_KEY=tu_api_key    # Requerida para IA
NODE_ENV=production          # Opcional
```

### Sin OpenAI:
El script funciona perfectamente sin API key, usando:
- ✅ Scraping de artículos
- ✅ Categorización automática
- ✅ Estructura JSON completa
- ⚠️ Mensajes de fallback en lugar de resúmenes IA

## 🚀 Automatización

### Ejecutar diariamente:
```bash
# Cron job para actualización diaria
0 2 * * * cd /ruta/al/proyecto && node generate-final-json.js
```

### GitHub Actions (opcional):
```yaml
name: Update ISOTools Data
on:
  schedule:
    - cron: '0 2 * * *'  # Diario a las 2 AM
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: node generate-final-json.js
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      - run: git add isotools-final-data.json && git commit -m "Update data" && git push
```

## 📈 Casos de uso

### 🏢 Para empresas:
- Dashboard corporativo con últimas tendencias ISO
- Newsletter automático con resúmenes
- Sistema de alertas de nuevos artículos
- Base de conocimientos actualizada

### 👨‍💻 Para desarrolladores:
- API de datos ISO para aplicaciones
- Integración con CRM/ERP
- Chatbots con información actualizada
- Análisis de tendencias en normativas

### 📱 Para aplicaciones web/móviles:
- Feed de noticias especializado
- Notificaciones push de nuevos artículos
- Búsqueda y filtrado por categorías
- Cache local con actualización automática

## 🔍 Troubleshooting

### Error de scraping:
- ✅ Se usa automáticamente datos de fallback
- ✅ El JSON se genera sin problemas
- ⚠️ Verificar conexión a internet

### Error de OpenAI:
- ✅ Se usan mensajes de fallback
- ⚠️ Verificar API key en variables de entorno
- ⚠️ Verificar saldo en cuenta OpenAI

### Problemas de performance:
- 🔧 Ajustar timeout en el código (línea 15)
- 🔧 Reducir número de artículos (línea 40)
- 🔧 Usar cache del consumer (1 hora por defecto)

## 📞 Soporte

- 📧 Issues en GitHub
- 📝 Documentación en código
- 🔧 Logs detallados incluidos
- ✅ Sistema de fallback robusto

---

**🎯 Listo para producción y consumo externo via GitHub RAW**

*Última actualización: Octubre 2025*