const fs = require('fs').promises;
const path = require('path');

// Script para generar JSON diario de 4 artículos aleatorios para sección de noticias
// Se ejecuta automáticamente vía GitHub Actions cada día

async function generateDailyNews() {
    console.log('🗞️ GENERADOR DE NOTICIAS DIARIAS ISO');
    console.log('===================================');
    console.log('📅 Generando 4 artículos aleatorios para hoy...\n');
    
    const startTime = Date.now();
    
    try {
        // 1. Leer el JSON principal de 30 artículos
        console.log('📖 Leyendo base de datos principal de artículos...');
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
        
        // 2. Seleccionar 4 artículos aleatorios
        console.log('\n🎲 Seleccionando 4 artículos aleatorios...');
        const selectedArticles = selectRandomArticles(mainData.data, 4);
        
        // 3. Crear JSON optimizado para noticias diarias
        console.log('\n📄 Estructurando JSON para noticias diarias...');
        const newsJson = createNewsJson(selectedArticles, mainData.metadata);
        
        // 4. Guardar archivo de noticias
        console.log('\n💾 Guardando JSON de noticias diarias...');
        const newsFileName = 'isotools-daily-news.json';
        const newsJsonString = JSON.stringify(newsJson, null, 2);
        
        await fs.writeFile(path.join(__dirname, newsFileName), newsJsonString, 'utf8');
        
        // También guardar en directorio raíz
        await fs.writeFile(path.join(__dirname, '..', newsFileName), newsJsonString, 'utf8');
        
        const processingTime = Math.round((Date.now() - startTime) / 1000);
        
        // 5. Mostrar resumen detallado
        console.log('\n🎉 NOTICIAS DIARIAS GENERADAS EXITOSAMENTE!');
        console.log('==========================================');
        console.log(`📄 Archivo generado: ${newsFileName}`);
        console.log(`📊 Artículos seleccionados: ${newsJson.daily_news.length}`);
        console.log(`🎲 Selección aleatoria: ✅ Completada`);
        console.log(`📅 Fecha generación: ${newsJson.metadata.generated_date}`);
        console.log(`⏱️ Tiempo procesamiento: ${processingTime} segundos`);
        console.log(`🔄 Próxima actualización: Mañana automáticamente`);
        
        console.log('\n📋 ARTÍCULOS SELECCIONADOS HOY:');
        console.log('==============================');
        selectedArticles.forEach((article, index) => {
            console.log(`\n${index + 1}. 📰 ${article.title.substring(0, 60)}...`);
            console.log(`   🏷️ Categoría: ${article.category}`);
            console.log(`   📄 Página origen: ${article.page_found || 1}`);
            console.log(`   🔗 URL: ${article.url}`);
        });
        
        console.log('\n🚀 INTEGRACIÓN CON GITHUB ACTIONS:');
        console.log('=================================');
        console.log('1. 📂 Archivo listo para consumo externo');
        console.log('2. 🌐 URL RAW disponible para tu sitio web');
        console.log('3. 🔄 Se actualizará automáticamente cada día');
        console.log('4. 📊 Rotación inteligente de contenido');
        
        return newsJson;
        
    } catch (error) {
        console.error('\n❌ ERROR AL GENERAR NOTICIAS:', error.message);
        console.error('🔧 Detalles del error:', error);
        throw error;
    }
}

// Función para seleccionar artículos aleatorios sin repetir
function selectRandomArticles(articles, count) {
    // Crear una copia para no modificar el original
    const availableArticles = [...articles];
    const selectedArticles = [];
    
    // Usar timestamp actual + fecha para verdadera aleatoriedad en cada ejecución
    const now = new Date();
    const timeBasedSeed = now.getTime() + now.getDate() + now.getHours() + now.getMinutes();
    
    console.log(`🎲 Usando semilla aleatoria: ${timeBasedSeed}`);
    
    // Función de random mejorada que cambia en cada ejecución
    let randomSeed = timeBasedSeed;
    function improvedRandom() {
        randomSeed = (randomSeed * 9301 + 49297) % 233280;
        return randomSeed / 233280;
    }
    
    // Mezclar el array primero para mayor aleatoriedad
    for (let i = availableArticles.length - 1; i > 0; i--) {
        const j = Math.floor(improvedRandom() * (i + 1));
        [availableArticles[i], availableArticles[j]] = [availableArticles[j], availableArticles[i]];
    }
    
    for (let i = 0; i < count && availableArticles.length > 0; i++) {
        const randomIndex = Math.floor(improvedRandom() * availableArticles.length);
        const selectedArticle = availableArticles.splice(randomIndex, 1)[0];
        
        // Agregar información extra para noticias
        selectedArticles.push({
            ...selectedArticle,
            news_priority: i + 1,
            selected_date: new Date().toISOString(),
            rotation_id: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${i + 1}`
        });
    }
    
    return selectedArticles;
}

// Función para crear JSON estructurado para noticias
function createNewsJson(selectedArticles, originalMetadata) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
        metadata: {
            title: "ISOTools - Noticias Diarias",
            description: "Selección diaria de 4 artículos destacados sobre normas ISO",
            source: "ISOTools Corporate Blog (isotools.us)",
            generated_date: today.toISOString().split('T')[0],
            generated_at: today.toISOString(),
            next_update: tomorrow.toISOString().split('T')[0],
            total_articles: selectedArticles.length,
            rotation_type: "daily_random_selection",
            version: "1.0.0",
            purpose: "Noticias diarias para sección web",
            github_raw_example: "https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-daily-news.json",
            parent_source: originalMetadata?.source || "ISOTools Blog",
            language: "español"
        },
        configuration: {
            daily_rotation: true,
            articles_per_day: 4,
            selection_method: "true_random_with_timestamp",
            auto_update: true,
            github_action_enabled: true,
            cache_duration_hours: 24,
            rotation_on_each_execution: true
        },
        daily_news: selectedArticles,
        statistics: {
            total_selected: selectedArticles.length,
            categories_today: [...new Set(selectedArticles.map(art => art.category))],
            avg_summary_length: Math.round(
                selectedArticles.reduce((sum, art) => sum + (art.summary_length || 0), 0) / selectedArticles.length
            ),
            selection_date: today.toISOString().split('T')[0],
            rotation_id: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        },
        usage_instructions: {
            consume_url: "Usa la URL RAW de GitHub para consumir estos datos",
            fetch_example: "const news = await fetch('https://raw.githubusercontent.com/user/repo/main/isotools-daily-news.json').then(r => r.json())",
            update_frequency: "Se actualiza automáticamente cada día a las 6:00 UTC",
            integration_tip: "Perfecto para secciones de noticias, widgets, y feeds RSS"
        }
    };
}

// Función de fallback si no existe el JSON principal
async function generateFallbackData() {
    console.log('📦 Generando datos de fallback para noticias...');
    return {
        data: [
            {
                id: 1,
                title: "¿Cómo decidir si la certificación del estándar ISO 42001 es la opción adecuada para su organización?",
                url: "https://www.isotools.us/2025/09/25/como-decidir-si-la-certificacion-del-estandar-iso-42001-es-la-opcion-adecuada-para-su-organizacion/",
                ai_summary: "La certificación ISO 42001 ayuda a las organizaciones a implementar sistemas de gestión de inteligencia artificial éticos y responsables, asegurando el cumplimiento normativo.",
                category: "ISO_42001_Inteligencia_Artificial",
                page_found: 1
            },
            {
                id: 2,
                title: "Calidad 5.0: cómo la inteligencia artificial y el factor humano transforman la excelencia operativa",
                url: "https://www.isotools.us/2025/09/23/calidad-5-0-como-la-inteligencia-artificial-y-el-factor-humano-transforman-la-excelencia-operativa/",
                ai_summary: "La Calidad 5.0 integra inteligencia artificial con experiencia humana para crear sistemas de gestión más eficientes y centrados en las personas.",
                category: "ISO_9001_Gestion_Calidad",
                page_found: 1
            },
            {
                id: 3,
                title: "Cumplimiento ISO 27001: los 9 pasos esenciales para preparar tu certificación",
                url: "https://www.isotools.us/2025/09/16/cumplimiento-iso-27001-los-9-pasos-esenciales-para-preparar-tu-certificacion/",
                ai_summary: "Guía práctica con 9 pasos fundamentales para implementar ISO 27001 y asegurar la gestión efectiva de la seguridad de la información empresarial.",
                category: "ISO_27001_Seguridad_Informacion",
                page_found: 1
            },
            {
                id: 4,
                title: "¿Cuáles son los beneficios de la ISO 9001 2026?",
                url: "https://www.isotools.us/2025/09/15/cuales-son-los-beneficios-de-la-iso-9001-2026/",
                ai_summary: "La próxima versión ISO 9001:2026 incorporará tecnologías emergentes y metodologías ágiles para mejorar la gestión de calidad organizacional.",
                category: "ISO_9001_Gestion_Calidad",
                page_found: 1
            },
            {
                id: 5,
                title: "Software de gestión medioambiental: 7 requisitos clave para elegir la mejor solución para tu empresa",
                url: "https://www.isotools.us/2025/09/09/software-de-gestion-medioambiental-7-requisitos-clave-para-elegir-la-mejor-solucion-para-tu-empresa/",
                ai_summary: "Criterios esenciales para seleccionar software de gestión ambiental que cumpla con ISO 14001 y optimice el rendimiento sostenible empresarial.",
                category: "ISO_14001_Gestion_Ambiental",
                page_found: 1
            },
            {
                id: 6,
                title: "ISO 45001: mejores prácticas para la gestión de la seguridad y salud en el trabajo",
                url: "https://www.isotools.us/2025/09/05/iso-45001-mejores-practicas-para-la-gestion-de-la-seguridad-y-salud-en-el-trabajo/",
                ai_summary: "Implementación efectiva de ISO 45001 mediante mejores prácticas que reducen riesgos laborales y mejoran el bienestar de los trabajadores.",
                category: "ISO_45001_Seguridad_Salud_Trabajo",
                page_found: 2
            }
        ],
        metadata: {
            source: "ISOTools Corporate Blog (isotools.us)"
        }
    };
}

// Exportar funciones
module.exports = {
    generateDailyNews,
    selectRandomArticles,
    createNewsJson
};

// Ejecutar si se llama directamente
if (require.main === module) {
    console.log('🗞️ Generador de Noticias Diarias ISO');
    console.log('=====================================');
    console.log('📋 Este script va a:');
    console.log('   1. 📖 Leer la base de datos de 30+ artículos');
    console.log('   2. 🎲 Seleccionar 4 artículos aleatorios');
    console.log('   3. 📄 Crear JSON optimizado para noticias');
    console.log('   4. 💾 Guardar archivo isotools-daily-news.json');
    console.log('   5. 🔄 Preparar para rotación diaria automática');
    console.log('');
    
    generateDailyNews()
        .then((result) => {
            console.log('\n✅ GENERACIÓN DE NOTICIAS COMPLETADA!');
            console.log(`📊 ${result.daily_news.length} artículos listos para tu sección de noticias`);
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ GENERACIÓN FALLÓ:', error.message);
            console.error('💡 Verifica que exista el archivo principal isotools-final-data.json');
            process.exit(1);
        });
}