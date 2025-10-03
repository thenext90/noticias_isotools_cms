const express = require('express');
const cors = require('cors');

// Configuración de OpenAI
let OpenAI;
try {
    OpenAI = require('openai');
} catch (error) {
    console.log('OpenAI no disponible:', error.message);
}

// Importar fetch de forma compatible
let fetch;
if (typeof globalThis.fetch === 'undefined') {
    fetch = require('node-fetch');
} else {
    fetch = globalThis.fetch;
}

const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Variables de entorno
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Configurar CORS y middleware
app.use(cors());
app.use(express.json());

// Inicializar OpenAI si está disponible
let openai;
if (OpenAI && OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: OPENAI_API_KEY
    });
    console.log('✅ OpenAI configurado correctamente');
} else {
    console.log('⚠️ OpenAI no configurado - funcionalidad limitada');
}

// Datos de fallback basados en el JSON real de ISOTools
const fallbackData = {
    "metadata": {
        "source": "ISOTools Corporate Blog",
        "extracted_at": "2025-10-02T00:00:00.000Z",
        "total_articles": 7,
        "purpose": "AI Summary Generation",
        "description": "Artículos especializados en sistemas de gestión ISO"
    },
    "articles": [
        {
            "id": 1,
            "title": "¿Cómo decidir si la certificación del estándar ISO 42001 es la opción adecuada para su organización?",
            "url": "https://www.isotools.us/2025/09/25/como-decidir-si-la-certificacion-del-estandar-iso-42001-es-la-opcion-adecuada-para-su-organizacion/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 2,
            "title": "Calidad 5.0: cómo la inteligencia artificial y el factor humano transforman la excelencia operativa",
            "url": "https://www.isotools.us/2025/09/23/calidad-5-0-como-la-inteligencia-artificial-y-el-factor-humano-transforman-la-excelencia-operativa/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 3,
            "title": "Cumplimiento ISO 27001: los 9 pasos esenciales para preparar tu certificación",
            "url": "https://www.isotools.us/2025/09/16/cumplimiento-iso-27001-los-9-pasos-esenciales-para-preparar-tu-certificacion/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 4,
            "title": "¿Cuáles son los beneficios de la ISO 9001 2026?",
            "url": "https://www.isotools.us/2025/09/15/cuales-son-los-beneficios-de-la-iso-9001-2026/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 5,
            "title": "El coste de no implementar ISO 42001: riesgos reputacionales, regulatorios y de mercado",
            "url": "https://www.isotools.us/2025/09/11/el-coste-de-no-implementar-iso-42001-riesgos-reputacionales-regulatorios-y-de-mercado/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 6,
            "title": "Software de gestión medioambiental: 7 requisitos clave para elegir la mejor solución para tu empresa",
            "url": "https://www.isotools.us/2025/09/09/software-de-gestion-medioambiental-7-requisitos-clave-para-elegir-la-mejor-solucion-para-tu-empresa/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        },
        {
            "id": 7,
            "title": "AI Act e ISO 42001: directrices de compatibilidad e implementación",
            "url": "https://www.isotools.us/2025/09/04/ai-act-e-iso-42001-directrices-de-compatibilidad-e-implementacion/",
            "source": "ISOTools Blog",
            "category": "ISO_Corporate_Blog",
            "extracted_date": "2025-10-02T00:00:00.000Z"
        }
    ]
};

// Función para hacer scraping de ISOTools
async function scrapeISOTools() {
    try {
        console.log('🕷️ Iniciando scraping de ISOTools...');
        
        const response = await fetch('https://www.isotools.us/blog-corporativo/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 15000
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const articles = [];
        const selectors = [
            'article h2 a',
            'article h3 a', 
            '.post-title a',
            '.entry-title a',
            '.blog-post h2 a',
            '.blog-post h3 a',
            'h2.entry-title a',
            'h3.entry-title a',
            '.post-item h2 a',
            '.post-item h3 a',
            '.entry-header h2 a',
            '.entry-header h3 a'
        ];

        for (const selector of selectors) {
            $(selector).each((index, element) => {
                const title = $(element).text().trim();
                let url = $(element).attr('href');
                
                if (title && url && title.length > 20 && title.length < 200) {
                    if (!url.startsWith('http')) {
                        url = 'https://www.isotools.us' + (url.startsWith('/') ? url : '/' + url);
                    }
                    
                    const isoKeywords = ['iso', 'calidad', 'gestión', 'auditoría', 'certificación', 'compliance', 'estándar', 'norma'];
                    const hasISOContent = isoKeywords.some(keyword => 
                        title.toLowerCase().includes(keyword.toLowerCase())
                    );
                    
                    if (hasISOContent && !articles.some(article => article.url === url)) {
                        articles.push({
                            id: articles.length + 1,
                            title: title,
                            url: url,
                            source: 'ISOTools Blog',
                            scraped_at: new Date().toISOString(),
                            category: 'ISO_Corporate_Blog'
                        });
                    }
                }
            });
            
            if (articles.length >= 8) break;
        }

        console.log(`✅ Scraping completado: ${articles.length} artículos encontrados`);
        return articles.slice(0, 8);

    } catch (error) {
        console.error('❌ Error en scraping, usando datos de fallback:', error);
        return fallbackData.articles;
    }
}

// Función para generar resúmenes con OpenAI
async function generateSummaryWithAI(title) {
    if (!openai) {
        return "🤖 Resumen con IA no disponible - OpenAI no configurado";
    }

    try {
        const prompt = `Como experto en normas ISO y sistemas de gestión, genera un resumen profesional y conciso de 2-3 oraciones sobre el siguiente artículo basándote en su título:

"${title}"

El resumen debe:
- Explicar los beneficios clave para las organizaciones
- Mencionar aplicaciones prácticas
- Usar terminología profesional de gestión de calidad
- Ser directo y orientado a resultados
- Incluir el valor que aporta implementar lo que se describe

Resumen:`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.7
        });

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generando resumen:', error);
        return "❌ Error al generar resumen automático con IA";
    }
}

// Ruta principal - página dedicada de resúmenes
app.get('/', async (req, res) => {
    try {
        const articles = await scrapeISOTools();
        
        let successCount = 0;
        let errorCount = 0;
        const articlesWithSummaries = [];

        console.log(`📝 Generando resúmenes para ${articles.length} artículos...`);

        for (const article of articles) {
            try {
                const summary = await generateSummaryWithAI(article.title);
                articlesWithSummaries.push({
                    ...article,
                    summary: summary,
                    summary_generated: !summary.includes('❌') && !summary.includes('no disponible'),
                    characters: summary.length,
                    ai_model: 'GPT-3.5-turbo'
                });
                
                if (!summary.includes('❌') && !summary.includes('no disponible')) {
                    successCount++;
                } else {
                    errorCount++;
                }
            } catch (error) {
                articlesWithSummaries.push({
                    ...article,
                    summary: "Error al procesar con IA",
                    summary_generated: false,
                    error: error.message
                });
                errorCount++;
            }
        }

        console.log(`✅ Procesamiento completado: ${successCount} éxitos, ${errorCount} errores`);

        const html = generateSummariesHTML(articlesWithSummaries, successCount, errorCount);
        res.send(html);

    } catch (error) {
        console.error('Error en endpoint principal:', error);
        res.status(500).send(`
            <html>
                <head>
                    <title>Error - ISOTools Resúmenes IA</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
                        .error { background: rgba(231, 76, 60, 0.9); padding: 30px; border-radius: 15px; max-width: 600px; margin: 0 auto; }
                        .btn { background: white; color: #333; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h1>⚠️ Error del Sistema</h1>
                        <p>No se pudieron cargar los resúmenes de ISOTools</p>
                        <p><strong>Error:</strong> ${error.message}</p>
                        <button class="btn" onclick="window.location.reload()">🔄 Reintentar</button>
                        <button class="btn" onclick="window.location.href='/json'">📄 Ver JSON</button>
                    </div>
                </body>
            </html>
        `);
    }
});

// Ruta JSON simple
app.get('/json', async (req, res) => {
    try {
        const articles = await scrapeISOTools();
        res.json({
            source: "ISOTools Corporate Blog - Dedicated App",
            total: articles.length,
            extracted_at: new Date().toISOString(),
            purpose: "AI Summary Generation",
            branch: "isotools-summaries-only",
            articles: articles
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            fallback_data: fallbackData 
        });
    }
});

// Función para generar HTML de resúmenes
function generateSummariesHTML(articles, successCount, errorCount) {
    const totalArticles = articles.length;
    const successRate = totalArticles > 0 ? Math.round((successCount / totalArticles) * 100) : 0;

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🤖 ISOTools - Resúmenes con Inteligencia Artificial</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            .header {
                text-align: center;
                background: white;
                padding: 40px;
                border-radius: 20px;
                margin-bottom: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            .header h1 {
                font-size: 2.5em;
                color: #2c3e50;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .header .subtitle {
                font-size: 1.2em;
                color: #7f8c8d;
                margin-bottom: 20px;
            }

            .logo-section {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                margin-bottom: 20px;
                padding: 20px;
                background: linear-gradient(135deg, #1e3c72, #2a5298);
                border-radius: 15px;
                color: white;
            }

            .logo-section img {
                height: 60px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }

            .stats-section {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .stat-card {
                background: white;
                padding: 25px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-left: 5px solid #3498db;
                transition: transform 0.3s ease;
            }

            .stat-card:hover {
                transform: translateY(-5px);
            }

            .stat-number {
                font-size: 2.5em;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 5px;
            }

            .stat-label {
                color: #7f8c8d;
                font-size: 0.9em;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .articles-section {
                background: white;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            .section-title {
                font-size: 1.8em;
                color: #2c3e50;
                margin-bottom: 25px;
                text-align: center;
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .article-card {
                background: #f8f9fa;
                margin-bottom: 25px;
                padding: 25px;
                border-radius: 15px;
                border-left: 5px solid #27ae60;
                transition: all 0.3s ease;
                position: relative;
            }

            .article-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }

            .article-card.error {
                border-left-color: #e74c3c;
                background: #fdf2f2;
            }

            .article-title {
                font-size: 1.3em;
                color: #2c3e50;
                margin-bottom: 15px;
                font-weight: 600;
                line-height: 1.4;
                padding-right: 80px;
            }

            .article-summary {
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 15px;
                border-left: 3px solid #3498db;
                line-height: 1.6;
                font-size: 1.05em;
            }

            .summary-label {
                font-weight: bold;
                color: #3498db;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .article-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.9em;
                color: #7f8c8d;
                margin-top: 15px;
                flex-wrap: wrap;
                gap: 10px;
            }

            .article-link {
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                text-decoration: none;
                font-size: 0.9em;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }

            .article-link:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
            }

            .ai-badge {
                position: absolute;
                top: 15px;
                right: 15px;
                background: linear-gradient(135deg, #27ae60, #2ecc71);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.8em;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .error-badge {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }

            .refresh-section {
                text-align: center;
                margin-top: 30px;
                padding: 20px;
            }

            .refresh-btn {
                background: linear-gradient(135deg, #8e44ad, #9b59b6);
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                font-size: 1.1em;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 5px;
            }

            .refresh-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(142, 68, 173, 0.3);
            }

            .json-link {
                color: white;
                text-decoration: none;
                background: rgba(255,255,255,0.2);
                padding: 8px 16px;
                border-radius: 15px;
                margin: 5px;
                display: inline-block;
                transition: all 0.3s ease;
            }

            .json-link:hover {
                background: rgba(255,255,255,0.3);
            }

            .footer-info {
                margin-top: 20px;
                color: white;
                opacity: 0.9;
                font-size: 0.9em;
            }

            @media (max-width: 768px) {
                .container {
                    padding: 10px;
                }
                
                .header {
                    padding: 20px;
                }
                
                .header h1 {
                    font-size: 2em;
                }
                
                .logo-section {
                    flex-direction: column;
                    text-align: center;
                }

                .article-title {
                    padding-right: 0;
                    margin-bottom: 40px;
                }

                .ai-badge {
                    position: relative;
                    top: auto;
                    right: auto;
                    margin-bottom: 15px;
                    align-self: flex-start;
                }

                .article-meta {
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header Section -->
            <div class="header">
                <h1>🤖 ISOTools - Resúmenes con IA</h1>
                <p class="subtitle">Inteligencia Artificial aplicada a contenido ISO especializado</p>
                
                <!-- Logo y descripción -->
                <div class="logo-section">
                    <img src="https://www.isotools.us/wp-content/uploads/2018/02/logo-isotools-blanco.png" 
                         alt="ISOTools Logo" 
                         onerror="this.style.display='none';">
                    <div>
                        <h3>🏢 ISOTools Excellence Platform</h3>
                        <p>Blog corporativo especializado en sistemas de gestión ISO procesado con OpenAI GPT-3.5-turbo para generar resúmenes automáticos profesionales</p>
                    </div>
                </div>
            </div>

            <!-- Estadísticas -->
            <div class="stats-section">
                <div class="stat-card">
                    <div class="stat-number">${totalArticles}</div>
                    <div class="stat-label">Artículos Procesados</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${successCount}</div>
                    <div class="stat-label">Resúmenes IA Generados</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${successRate}%</div>
                    <div class="stat-label">Tasa de Éxito</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">GPT-3.5</div>
                    <div class="stat-label">Modelo IA Usado</div>
                </div>
            </div>

            <!-- Artículos con resúmenes -->
            <div class="articles-section">
                <h2 class="section-title">📄 Resúmenes Automáticos con Inteligencia Artificial</h2>
                
                ${articles.map((article, index) => `
                    <div class="article-card ${!article.summary_generated ? 'error' : ''}">
                        <div class="ai-badge ${!article.summary_generated ? 'error-badge' : ''}">
                            ${article.summary_generated ? '🤖 IA Generado' : '⚠️ Error IA'}
                        </div>
                        
                        <div class="article-title">
                            ${index + 1}. ${article.title}
                        </div>
                        
                        <div class="article-summary">
                            <div class="summary-label">
                                <span>📝 Resumen Generado con IA:</span>
                                ${article.summary_generated ? '<span style="color: #27ae60;">✓ Procesado</span>' : '<span style="color: #e74c3c;">✗ Error</span>'}
                            </div>
                            ${article.summary}
                        </div>
                        
                        <div class="article-meta">
                            <div>
                                <span>📅 ${new Date(article.scraped_at || article.extracted_date).toLocaleDateString('es-ES')}</span>
                                ${article.characters ? ` | 📊 ${article.characters} caracteres` : ''}
                                ${article.ai_model ? ` | 🧠 ${article.ai_model}` : ''}
                                | 🏢 ${article.source}
                            </div>
                            <a href="${article.url}" target="_blank" class="article-link">
                                📖 Leer Artículo Completo →
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Sección de actualización -->
            <div class="refresh-section">
                <button class="refresh-btn" onclick="window.location.reload()">
                    🔄 Actualizar Resúmenes
                </button>
                <button class="refresh-btn" onclick="window.open('/json', '_blank')" style="background: linear-gradient(135deg, #3498db, #2980b9);">
                    📄 Ver Datos JSON
                </button>
                
                <div class="footer-info">
                    <p>🤖 Los resúmenes se generan en tiempo real usando OpenAI GPT-3.5-turbo</p>
                    <p>🕷️ Datos extraídos automáticamente de isotools.us/blog-corporativo</p>
                    <p>🔄 La página se actualiza automáticamente cada 10 minutos</p>
                    <p>🌿 Aplicación dedicada - Rama: isotools-summaries-only</p>
                </div>
            </div>
        </div>

        <script>
            // Auto-refresh cada 10 minutos
            setTimeout(() => {
                if (confirm('🔄 ¿Actualizar resúmenes con nuevo contenido de ISOTools?')) {
                    window.location.reload();
                }
            }, 600000);

            // Mostrar indicador de carga
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🤖 ISOTools Resúmenes IA - Aplicación dedicada cargada');
                console.log('📊 Estadísticas: ${totalArticles} artículos, ${successCount} resúmenes generados');
            });
        </script>
    </body>
    </html>
    `;
}

// Manejador de salud para verificación
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'ISOTools Summaries with AI',
        timestamp: new Date().toISOString(),
        openai_configured: !!openai,
        branch: 'isotools-summaries-only',
        purpose: 'Dedicated app for ISOTools AI summaries'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 ISOTools Summaries AI App running on port ${PORT}`);
    console.log(`🔗 Local access: http://localhost:${PORT}`);
    console.log(`🤖 OpenAI Status: ${openai ? 'Configured' : 'Not configured'}`);
    console.log(`🌿 Branch: isotools-summaries-only`);
});

module.exports = app;