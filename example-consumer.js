// 📄 EJEMPLO: Cómo consumir el JSON de ISOTools desde otro repositorio
// Copia este código a tu otro proyecto para usar los datos

class ISOToolsConsumer {
    constructor(githubRawUrl) {
        // URL del JSON en GitHub RAW
        this.jsonUrl = githubRawUrl || 'https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-final-data.json';
        this.cache = null;
        this.lastFetch = null;
        this.cacheTimeout = 3600000; // 1 hora en ms
    }
    
    // Método principal para obtener todos los datos
    async fetchData(useCache = true) {
        // Verificar cache
        if (useCache && this.cache && this.lastFetch && 
            (Date.now() - this.lastFetch) < this.cacheTimeout) {
            console.log('📦 Usando datos en cache');
            return this.cache;
        }
        
        try {
            console.log('🌐 Descargando datos desde:', this.jsonUrl);
            
            const response = await fetch(this.jsonUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'ISOTools-Consumer/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Actualizar cache
            this.cache = data;
            this.lastFetch = Date.now();
            
            console.log(`✅ Datos cargados: ${data.metadata.total_articles} artículos`);
            console.log(`🤖 IA Success Rate: ${data.statistics.ai_success_rate}`);
            console.log(`📅 Última actualización: ${data.metadata.generated_at}`);
            
            return data;
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error.message);
            
            // Intentar usar cache como fallback
            if (this.cache) {
                console.log('📦 Usando cache por error de conexión');
                return this.cache;
            }
            
            throw error;
        }
    }
    
    // Obtener artículos por categoría
    async getByCategory(category) {
        const data = await this.fetchData();
        return data.data.filter(article => article.category === category);
    }
    
    // Obtener solo resúmenes generados por IA
    async getAISummaries() {
        const data = await this.fetchData();
        return data.data.filter(article => article.ai_generated);
    }
    
    // Buscar artículos por palabra clave en el título
    async searchByKeyword(keyword) {
        const data = await this.fetchData();
        const keywordLower = keyword.toLowerCase();
        return data.data.filter(article => 
            article.title.toLowerCase().includes(keywordLower) ||
            article.ai_summary.toLowerCase().includes(keywordLower)
        );
    }
    
    // Obtener estadísticas
    async getStatistics() {
        const data = await this.fetchData();
        return {
            ...data.statistics,
            metadata: data.metadata,
            configuration: data.configuration
        };
    }
    
    // Obtener artículo por ID
    async getById(id) {
        const data = await this.fetchData();
        return data.data.find(article => article.id === id);
    }
    
    // Generar HTML simple para mostrar artículos
    async generateHTML() {
        const data = await this.fetchData();
        
        let html = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <h1>🤖 ${data.metadata.title}</h1>
            <p><strong>Fuente:</strong> ${data.metadata.source}</p>
            <p><strong>Última actualización:</strong> ${new Date(data.metadata.generated_at).toLocaleString()}</p>
            <p><strong>Total artículos:</strong> ${data.metadata.total_articles}</p>
            <p><strong>Éxito IA:</strong> ${data.statistics.ai_success_rate}</p>
            <hr>
        `;
        
        data.data.forEach(article => {
            html += `
            <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3>${article.title}</h3>
                <p><strong>📝 Resumen IA:</strong> ${article.ai_summary}</p>
                <p><strong>🏷️ Categoría:</strong> ${article.category}</p>
                <p><strong>🤖 Generado por IA:</strong> ${article.ai_generated ? '✅ Sí' : '❌ No'}</p>
                <p><a href="${article.url}" target="_blank">📖 Leer artículo completo →</a></p>
            </div>
            `;
        });
        
        html += `</div>`;
        return html;
    }
}

// ===================================================================
// 🚀 EJEMPLOS DE USO
// ===================================================================

async function ejemplosDeUso() {
    // Configurar la URL de tu JSON en GitHub
    const consumer = new ISOToolsConsumer(
        'https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-final-data.json'
    );
    
    try {
        console.log('🚀 EJEMPLOS DE USO DEL JSON DE ISOTOOLS');
        console.log('=====================================');
        
        // 1. Obtener todos los datos
        console.log('\n📊 1. Obteniendo todos los datos...');
        const allData = await consumer.fetchData();
        console.log(`   Total artículos: ${allData.metadata.total_articles}`);
        
        // 2. Obtener artículos de una categoría específica
        console.log('\n🏷️ 2. Artículos de IA (ISO 42001)...');
        const aiArticles = await consumer.getByCategory('ISO_42001_Inteligencia_Artificial');
        console.log(`   Encontrados: ${aiArticles.length} artículos`);
        aiArticles.forEach(article => {
            console.log(`   - ${article.title.substring(0, 60)}...`);
        });
        
        // 3. Buscar por palabra clave
        console.log('\n🔍 3. Buscando artículos con "calidad"...');
        const calidadArticles = await consumer.searchByKeyword('calidad');
        console.log(`   Encontrados: ${calidadArticles.length} artículos`);
        
        // 4. Obtener estadísticas
        console.log('\n📈 4. Estadísticas del dataset...');
        const stats = await consumer.getStatistics();
        console.log(`   Tasa de éxito IA: ${stats.ai_success_rate}`);
        console.log(`   Promedio caracteres: ${stats.avg_summary_length}`);
        console.log(`   Categorías: ${stats.total_categories}`);
        
        // 5. Obtener un artículo específico
        console.log('\n📄 5. Artículo específico (ID: 1)...');
        const article1 = await consumer.getById(1);
        if (article1) {
            console.log(`   Título: ${article1.title}`);
            console.log(`   Resumen: ${article1.ai_summary.substring(0, 100)}...`);
        }
        
        console.log('\n✅ Todos los ejemplos funcionando correctamente!');
        
    } catch (error) {
        console.error('❌ Error en los ejemplos:', error.message);
    }
}

// ===================================================================
// 🌐 USO EN UNA PÁGINA WEB
// ===================================================================

// Para usar en una página web, agregar este script:
/*
<script>
async function cargarISOToolsData() {
    const consumer = new ISOToolsConsumer(
        'https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-final-data.json'
    );
    
    try {
        const html = await consumer.generateHTML();
        document.getElementById('isotools-content').innerHTML = html;
    } catch (error) {
        document.getElementById('isotools-content').innerHTML = 
            '<p>Error cargando datos de ISOTools: ' + error.message + '</p>';
    }
}

// Llamar al cargar la página
window.addEventListener('load', cargarISOToolsData);
</script>

<!-- HTML -->
<div id="isotools-content">Cargando datos de ISOTools...</div>
*/

// ===================================================================
// 🔄 EXPORTAR PARA NODE.JS / MÓDULOS
// ===================================================================

// Para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ISOToolsConsumer, ejemplosDeUso };
}

// Para ES6 modules
// export { ISOToolsConsumer, ejemplosDeUso };

console.log('📋 ISOTools Consumer cargado. Usar ejemplosDeUso() para probar.');