const fs = require('fs').promises;
const path = require('path');
const ISODynamicStyleGenerator = require('./generate-dynamic-styles');

// Script para generar JSON diario de 4 artículos aleatorios para sección de noticias
// Ahora incluye generación automática de estilos dinámicos basados en fechas ISO especiales
// Se ejecuta automáticamente vía GitHub Actions cada día

async function generateDailyNews() {
    console.log('🗞️ GENERADOR DE NOTICIAS DIARIAS ISO + ESTILOS DINÁMICOS');
    console.log('========================================================');
    console.log('📅 Generando contenido y tema visual para hoy...\n');
    
    const startTime = Date.now();
    
    try {
        // 1. GENERAR ESTILOS DINÁMICOS BASADOS EN FECHA ISO
        console.log('🎨 PASO 1: Generando estilos dinámicos...');
        const styleGenerator = new ISODynamicStyleGenerator();
        const themeConfig = await styleGenerator.generate();
        
        console.log(`✅ Tema aplicado: ${themeConfig.theme_applied}`);
        console.log(`🎨 Archivo CSS: ${themeConfig.css_file}\n`);
        
        // 2. LEER EL JSON PRINCIPAL DE ARTÍCULOS
        console.log('📖 PASO 2: Leyendo base de datos principal de artículos...');
        const mainJsonPath = path.join(__dirname, 'isotools-final-data.json');
        
        let mainData;
        try {
            const mainJsonContent = await fs.readFile(mainJsonPath, 'utf8');
            mainData = JSON.parse(mainJsonContent);
        } catch (error) {
            console.log('⚠️ No se encontró JSON principal, usando datos de fallback...');
            mainData = await generateFallbackData();
        }
        
        console.log(`✅ Base de datos cargada: ${mainData.data.length} artículos disponibles`);
        
        // 3. SELECCIONAR ARTÍCULOS ALEATORIOS
        console.log('\n🎲 PASO 3: Seleccionando 4 artículos aleatorios...');
        const selectedArticles = selectRandomArticles(mainData.data, 4);
        
        // 4. CREAR ESTRUCTURA DE NOTICIAS DIARIAS
        const dailyNews = {
            metadata: {
                title: "ISOTools - Noticias Diarias",
                description: "Selección diaria de 4 artículos destacados sobre normas ISO",
                generated_at: new Date().toISOString(),
                total_articles: selectedArticles.length,
                source: "ISOTools Corporate Blog",
                purpose: "Noticias diarias para sección web",
                rotation_algorithm: "random_selection",
                update_frequency: "daily",
                language: "español",
                theme_applied: themeConfig.theme_applied,
                special_date: themeConfig.special_date
            },
            visual_theme: themeConfig,
            daily_articles: selectedArticles,
            categories_summary: generateCategoriesSummary(selectedArticles),
            next_update: getNextUpdateTime()
        };
        
        // 5. GUARDAR ARCHIVO DE NOTICIAS DIARIAS
        const outputPath = path.join(__dirname, 'isotools-daily-news.json');
        await fs.writeFile(outputPath, JSON.stringify(dailyNews, null, 2));
        
        // 6. COPIAR AL DIRECTORIO RAÍZ
        const rootOutputPath = path.join(__dirname, '..', 'isotools-daily-news.json');
        await fs.writeFile(rootOutputPath, JSON.stringify(dailyNews, null, 2));
        
        // 7. MOSTRAR RESUMEN
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        
        console.log('\n🎉 ¡GENERACIÓN COMPLETADA!');
        console.log('==========================');
        console.log(`⏱️ Tiempo total: ${duration.toFixed(2)} segundos`);
        console.log(`🎨 Tema visual: ${themeConfig.theme_applied}`);
        console.log(`📰 Artículos seleccionados: ${selectedArticles.length}`);
        console.log(`📁 Archivo principal: ${outputPath}`);
        console.log(`📁 Archivo raíz: ${rootOutputPath}`);
        console.log(`🎨 Estilos CSS: generated-styles/dynamic-styles.css`);
        
        console.log('\n📋 ARTÍCULOS SELECCIONADOS:');
        selectedArticles.forEach((article, index) => {
            console.log(`   ${index + 1}. ${article.title}`);
            console.log(`      📂 ${article.category}`);
            console.log(`      🔗 ${article.url}`);
        });
        
        return dailyNews;
        
    } catch (error) {
        console.error('\n❌ ERROR AL GENERAR NOTICIAS:', error.message);
        console.error('Stack:', error.stack);
        throw error;
    }
}

/**
 * 🎲 Selecciona artículos aleatorios de la base de datos
 */
function selectRandomArticles(articles, count) {
    const availableArticles = [...articles];
    const selectedArticles = [];
    
    console.log(`🔀 Seleccionando ${count} artículos de ${availableArticles.length} disponibles...`);
    
    for (let i = 0; i < Math.min(count, availableArticles.length); i++) {
        const randomIndex = Math.floor(Math.random() * availableArticles.length);
        const selectedArticle = availableArticles.splice(randomIndex, 1)[0];
        
        selectedArticles.push({
            ...selectedArticle,
            news_priority: i + 1,
            selected_date: new Date().toISOString(),
            rotation_id: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${i + 1}`
        });
        
        console.log(`   ✅ Seleccionado: ${selectedArticle.title.substring(0, 60)}...`);
    }
    
    return selectedArticles;
}

/**
 * 📊 Genera resumen de categorías
 */
function generateCategoriesSummary(articles) {
    const categories = {};
    
    articles.forEach(article => {
        const category = article.category || 'Sin_Categoria';
        categories[category] = (categories[category] || 0) + 1;
    });
    
    return {
        total_categories: Object.keys(categories).length,
        distribution: categories,
        most_common: Object.keys(categories).reduce((a, b) => 
            categories[a] > categories[b] ? a : b
        )
    };
}

/**
 * ⏰ Calcula próxima actualización
 */
function getNextUpdateTime() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9:00 AM del día siguiente
    
    return {
        next_update_iso: tomorrow.toISOString(),
        next_update_local: tomorrow.toLocaleString(),
        hours_until_update: Math.ceil((tomorrow - today) / (1000 * 60 * 60))
    };
}

/**
 * 🚨 Datos de fallback si no existe el JSON principal
 */
async function generateFallbackData() {
    return {
        metadata: {
            title: "ISOTools - Datos de Fallback",
            generated_at: new Date().toISOString(),
            total_articles: 3,
            source: "fallback_data"
        },
        data: [
            {
                id: "fallback-1",
                title: "Importancia de las Normas ISO en la Gestión Empresarial",
                url: "https://www.isotools.us/blog-corporativo/",
                ai_summary: "Las normas ISO proporcionan frameworks robustos para la gestión de calidad, seguridad y eficiencia operativa en organizaciones modernas.",
                category: "ISO_General",
                ai_generated: true,
                page_found: 1,
                extracted_at: new Date().toISOString(),
                processed_at: new Date().toISOString()
            },
            {
                id: "fallback-2",
                title: "Beneficios de la Certificación ISO 9001 para PYMES",
                url: "https://www.isotools.us/blog-corporativo/",
                ai_summary: "La implementación de ISO 9001 mejora la competitividad, eficiencia operativa y satisfacción del cliente en pequeñas y medianas empresas.",
                category: "ISO_9001_Gestion_Calidad",
                ai_generated: true,
                page_found: 1,
                extracted_at: new Date().toISOString(),
                processed_at: new Date().toISOString()
            },
            {
                id: "fallback-3",
                title: "Tendencias en Gestión de Seguridad de la Información",
                url: "https://www.isotools.us/blog-corporativo/",
                ai_summary: "ISO 27001 se posiciona como estándar esencial para proteger activos digitales y garantizar la continuidad del negocio en la era digital.",
                category: "ISO_27001_Seguridad_Informacion",
                ai_generated: true,
                page_found: 1,
                extracted_at: new Date().toISOString(),
                processed_at: new Date().toISOString()
            }
        ]
    };
}

// 🚀 Ejecutar si es llamado directamente
if (require.main === module) {
    generateDailyNews().catch(error => {
        console.error('💥 Error crítico:', error);
        process.exit(1);
    });
}

module.exports = generateDailyNews;