# 🗞️ Sistema de Noticias Diarias ISO - Documentación

## 📋 **Descripción del Sistema**

Este sistema automatizado genera **4 artículos aleatorios diarios** extraídos de la base de datos principal de 30+ artículos ISO, actualizándose automáticamente cada día para mantener contenido fresco en tu sección de noticias.

## 🚀 **Características Principales**

### ✨ **Funcionalidades Core:**
- 🎲 **Selección aleatoria diaria** de 4 artículos
- 🔄 **Rotación automática** cada 24 horas
- 📅 **Programación temporal** con GitHub Actions
- 🌐 **Consumo directo** vía GitHub RAW URL
- 📊 **Metadata completa** para integración web

### ⚙️ **Configuración Técnica:**
- **Horario**: 6:00 UTC diariamente (12:00 PM España)
- **Algoritmo**: Selección seeded-random para consistencia
- **Formato**: JSON estructurado para APIs
- **Versionado**: Automático con git commits

## 📁 **Archivos del Sistema**

```
📦 manu2/
├── 🗞️ isotools-daily-news.json          # ← JSON de 4 artículos (consumo externo)
├── 📄 isotools-final-data.json           # ← Base de datos de 30+ artículos
├── 📂 isotools-summaries-standalone/
│   ├── 🔧 generate-daily-news.js         # ← Script generador de noticias
│   ├── 🗞️ isotools-daily-news.json      # ← Copia local
│   └── 📄 isotools-final-data.json       # ← Base de datos fuente
└── 📂 .github/workflows/
    └── ⚙️ daily-news-update.yml          # ← GitHub Action automatizado
```

## 🌐 **URLs de Consumo**

### **Producción (GitHub RAW):**
```
https://raw.githubusercontent.com/thenext90/manu2/main/isotools-daily-news.json
```

### **Desarrollo (GitHub Blob):**
```
https://github.com/thenext90/manu2/blob/main/isotools-daily-news.json
```

## 💻 **Integración en tu Sitio Web**

### **JavaScript/TypeScript:**
```javascript
// Fetch diario de noticias ISO
async function loadDailyISONews() {
    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/thenext90/manu2/main/isotools-daily-news.json'
        );
        const newsData = await response.json();
        
        console.log(`📰 ${newsData.daily_news.length} noticias para hoy`);
        console.log(`📅 Fecha: ${newsData.metadata.generated_date}`);
        
        return newsData.daily_news;
    } catch (error) {
        console.error('Error cargando noticias ISO:', error);
        return [];
    }
}

// Uso en componente
const dailyNews = await loadDailyISONews();
dailyNews.forEach(article => {
    console.log(`📰 ${article.title}`);
    console.log(`🏷️ ${article.category}`);
    console.log(`🔗 ${article.url}`);
});
```

### **React Component:**
```jsx
import React, { useEffect, useState } from 'react';

function DailyISONews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/thenext90/manu2/main/isotools-daily-news.json')
            .then(r => r.json())
            .then(data => {
                setNews(data.daily_news);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, []);
    
    if (loading) return <div>📰 Cargando noticias ISO...</div>;
    
    return (
        <div className="daily-iso-news">
            <h3>🗞️ Noticias ISO del Día</h3>
            {news.map((article, index) => (
                <div key={article.rotation_id} className="news-item">
                    <h4>{article.title}</h4>
                    <p>{article.ai_summary}</p>
                    <span className="category">{article.category}</span>
                    <a href={article.url} target="_blank">Leer más →</a>
                </div>
            ))}
        </div>
    );
}

export default DailyISONews;
```

### **PHP:**
```php
<?php
// Cargar noticias diarias ISO
function loadDailyISONews() {
    $url = 'https://raw.githubusercontent.com/thenext90/manu2/main/isotools-daily-news.json';
    
    $response = file_get_contents($url);
    if ($response === FALSE) {
        return ['error' => 'No se pudieron cargar las noticias'];
    }
    
    $newsData = json_decode($response, true);
    return $newsData['daily_news'];
}

// Uso
$dailyNews = loadDailyISONews();
foreach ($dailyNews as $article) {
    echo "<h3>{$article['title']}</h3>";
    echo "<p>{$article['ai_summary']}</p>";
    echo "<a href='{$article['url']}'>Leer más</a>";
}
?>
```

## ⚙️ **Comandos de Gestión**

### **Ejecutar manualmente:**
```bash
# Navegar al directorio
cd isotools-summaries-standalone

# Generar noticias para hoy
node generate-daily-news.js
```

### **Forzar actualización vía GitHub:**
1. Ve a tu repositorio en GitHub
2. Click en "Actions" 
3. Selecciona "🗞️ Actualización Diaria de Noticias ISO"
4. Click "Run workflow" → "Run workflow"

### **Programar horario diferente:**
Edita `.github/workflows/daily-news-update.yml`:
```yaml
schedule:
  - cron: '0 12 * * *'  # 12:00 UTC en lugar de 6:00 UTC
```

## 📊 **Estructura del JSON de Noticias**

```json
{
  "metadata": {
    "title": "ISOTools - Noticias Diarias",
    "generated_date": "2025-10-04",
    "total_articles": 4,
    "next_update": "2025-10-05"
  },
  "daily_news": [
    {
      "id": 1,
      "title": "Título del artículo",
      "url": "https://...",
      "ai_summary": "Resumen del artículo",
      "category": "ISO_9001_Gestion_Calidad",
      "news_priority": 1,
      "rotation_id": "2025-10-4-1"
    }
  ],
  "statistics": {
    "total_selected": 4,
    "categories_today": ["ISO_9001_Gestion_Calidad", "..."],
    "selection_date": "2025-10-04"
  }
}
```

## 🔧 **Personalización**

### **Cambiar cantidad de artículos:**
En `generate-daily-news.js`, línea ~15:
```javascript
const selectedArticles = selectRandomArticles(mainData.data, 6); // Cambiar 4 a 6
```

### **Modificar algoritmo de selección:**
Edita la función `selectRandomArticles()` para:
- Priorizar categorías específicas
- Evitar artículos recientes
- Filtrar por palabras clave

### **Agregar metadatos personalizados:**
En `createNewsJson()` agrega campos como:
```javascript
custom_fields: {
    website_section: "noticias",
    priority_level: "high",
    display_duration: "24_hours"
}
```

## 🚨 **Solución de Problemas**

### **❌ Action falla:**
1. Verifica que existe `isotools-final-data.json`
2. Revisa logs en GitHub Actions
3. Confirma permisos de escritura del repositorio

### **❌ JSON vacío:**
1. Ejecuta manualmente: `node generate-daily-news.js`
2. Verifica archivo fuente de 30 artículos
3. Revisa logs de errores

### **❌ No se actualiza:**
1. Confirma que GitHub Actions está habilitado
2. Verifica cron schedule en UTC
3. Revisa si hay commits automáticos

## 📈 **Métricas y Monitoreo**

### **Verificar funcionamiento:**
- Check daily commits en GitHub
- Validar JSON structure vía URL RAW
- Monitor tamaño y contenido del archivo

### **Estadísticas disponibles:**
- Artículos por categoría diaria
- Frecuencia de rotación
- Performance del algoritmo

¡El sistema está listo para generar noticias ISO frescas automáticamente cada día! 🚀