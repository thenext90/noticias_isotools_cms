# � ISOTools Daily News Generator

## 📋 Descripción
Sistema automático que genera diariamente 3 artículos aleatorios de noticias ISO para consumo externo. Los artículos se seleccionan de una base de datos curada y se actualizan automáticamente vía GitHub Actions.

## ✨ Funcionalidades
- 🎲 **Selección aleatoria** de 3 artículos diarios
- 🔄 **Rotación automática** cada 24 horas
- 📄 **JSON estructurado** listo para consumo
- 🤖 **Automatización completa** con GitHub Actions
- 🌐 **Acceso público** vía GitHub RAW
- 📊 **Metadata detallada** de cada selección

## 🗂️ Estructura del Proyecto
```
├── generate-daily-3-news.py    # 🐍 Script principal Python
├── isotools-final-data.json    # 📊 Base de datos de artículos
├── isotools-daily-news.json    # 📰 Archivo generado diariamente
├── .github/workflows/           # 🤖 GitHub Actions
│   └── update-daily-news.yml    # ⚙️ Workflow automático
├── .gitignore                   # 🚫 Archivos ignorados
└── README.md                    # 📖 Documentación
```

## 🚀 Uso

### Ejecución Manual
```bash
# Ejecutar generador localmente
python generate-daily-3-news.py
```

### Ejecución Automática
- ⏰ **Automático:** Todos los días a las 9:00 AM (Chile)
- � **Manual:** GitHub Actions → "Daily News Generator" → "Run workflow"

## 📄 Output

### Archivo generado: `isotools-daily-news.json`

```json
{
  "metadata": {
    "title": "ISOTools - Noticias Diarias",
    "description": "Selección diaria de 3 artículos destacados sobre normas ISO",
    "generated_date": "2025-10-06",
    "total_articles": 3,
    "rotation_type": "daily_random_selection"
  },
  "daily_news": [
    {
      "id": 1,
      "title": "Título del artículo",
      "url": "https://www.isotools.us/...",
      "image_url": "https://www.isotools.us/wp-content/...",
      "ai_summary": "Resumen generado por IA...",
      "category": "ISO_9001_Gestion_Calidad",
      "news_priority": 1
    }
  ]
}
```

## 🌐 URLs de Consumo

### GitHub RAW (Recomendado)
```
https://raw.githubusercontent.com/thenext90/noticias_isotools_cms/main/isotools-daily-news.json
```

### GitHub API
```
https://api.github.com/repos/thenext90/noticias_isotools_cms/contents/isotools-daily-news.json
```

## 🔧 Configuración

### GitHub Actions
- **Horario:** Diario a las 12:00 UTC (9:00 AM Chile)
- **Trigger:** Schedule + Manual dispatch
- **Permisos:** `contents: write` para commits automáticos

### Python
- **Versión:** Python 3.11+
- **Dependencias:** Solo librerías estándar (`json`, `random`, `datetime`)

## 📊 Características Técnicas

- ✅ **Sin dependencias externas** (solo Python estándar)
- ✅ **Rotación garantizada** en cada ejecución
- ✅ **Manejo de errores** robusto
- ✅ **Logging detallado** para debugging
- ✅ **Commits automáticos** con `[skip ci]`
- ✅ **UTF-8 encoding** completo

## 🎯 Casos de Uso

1. **Sitios web** que consumen noticias ISO diarias
2. **APIs** que necesitan contenido rotativo
3. **Newsletters** automáticos
4. **Widgets** de noticias en tiempo real
5. **Aplicaciones móviles** con contenido dinámico

## 🔄 Flujo de Trabajo

1. **12:00 UTC diario:** GitHub Actions se ejecuta automáticamente
2. **Selección:** Script Python elige 3 artículos aleatorios
3. **Generación:** Crea nuevo `isotools-daily-news.json`
4. **Commit:** Cambios se commitean automáticamente
5. **Disponibilidad:** URL RAW se actualiza instantáneamente

## 📈 Estadísticas

- **Base de datos:** ~50 artículos únicos
- **Rotación:** 3 artículos nuevos cada 24 horas
- **Disponibilidad:** 99.9% (GitHub RAW)
- **Latencia:** <1 segundo (consumo directo)
- **Actualización:** Automática sin intervención manual

---

🏢 **ISOTools** | 📧 **Soporte:** GitHub Issues | 🔄 **Última actualización:** Automática
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