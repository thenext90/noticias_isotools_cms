const fs = require('fs').promises;
const path = require('path');
const generateDailyNews = require('./generate-daily-news-enhanced');

/**
 * 🚀 ORQUESTADOR PRINCIPAL DEL SISTEMA
 * ===================================
 * Ejecuta el flujo completo: noticias + estilos dinámicos + deploy
 * Diseñado para ejecutarse automáticamente cada día vía GitHub Actions
 */

class ISODailyOrchestrator {
    constructor() {
        this.startTime = Date.now();
        this.results = {
            news_generated: false,
            styles_generated: false,
            files_created: [],
            errors: []
        };
    }

    /**
     * 🎯 Proceso principal
     */
    async execute() {
        console.log('🚀 ORQUESTADOR SISTEMA ISO DINÁMICO');
        console.log('=====================================');
        console.log(`📅 Fecha: ${new Date().toLocaleString('es-ES')}`);
        console.log(`⏰ Iniciando ejecución...\n`);

        try {
            // 1. Generar noticias diarias + estilos dinámicos
            await this.generateDailyContent();
            
            // 2. Validar archivos generados
            await this.validateGeneratedFiles();
            
            // 3. Generar reporte de ejecución
            await this.generateExecutionReport();
            
            // 4. Mostrar resumen final
            this.showFinalSummary();
            
            return this.results;
            
        } catch (error) {
            console.error('💥 ERROR CRÍTICO:', error.message);
            this.results.errors.push(error.message);
            throw error;
        }
    }

    /**
     * 📰 Generar contenido diario
     */
    async generateDailyContent() {
        console.log('📰 PASO 1: Generando contenido diario...');
        console.log('----------------------------------------');
        
        try {
            const newsData = await generateDailyNews();
            this.results.news_generated = true;
            this.results.styles_generated = true;
            
            console.log('✅ Contenido diario generado exitosamente');
            return newsData;
            
        } catch (error) {
            console.error('❌ Error generando contenido:', error.message);
            this.results.errors.push(`Content generation: ${error.message}`);
            throw error;
        }
    }

    /**
     * ✅ Validar archivos generados
     */
    async validateGeneratedFiles() {
        console.log('\n✅ PASO 2: Validando archivos generados...');
        console.log('--------------------------------------------');
        
        const expectedFiles = [
            './isotools-daily-news.json',
            '../isotools-daily-news.json',
            './generated-styles/dynamic-styles.css',
            './generated-styles/current-theme.json'
        ];
        
        const baseDir = __dirname;
        
        for (const file of expectedFiles) {
            const fullPath = path.resolve(baseDir, file);
            
            try {
                const stats = await fs.stat(fullPath);
                const sizeKB = (stats.size / 1024).toFixed(2);
                
                console.log(`   ✅ ${file} (${sizeKB} KB)`);
                this.results.files_created.push({
                    path: file,
                    size: `${sizeKB} KB`,
                    created: stats.birthtime
                });
                
            } catch (error) {
                console.log(`   ❌ ${file} - NO ENCONTRADO`);
                this.results.errors.push(`Missing file: ${file}`);
            }
        }
        
        console.log(`\n📊 Archivos validados: ${this.results.files_created.length}/${expectedFiles.length}`);
    }

    /**
     * 📋 Generar reporte de ejecución
     */
    async generateExecutionReport() {
        console.log('\n📋 PASO 3: Generando reporte de ejecución...');
        console.log('---------------------------------------------');
        
        const executionTime = (Date.now() - this.startTime) / 1000;
        
        const report = {
            execution_summary: {
                timestamp: new Date().toISOString(),
                execution_time_seconds: executionTime,
                success: this.results.errors.length === 0,
                news_generated: this.results.news_generated,
                styles_generated: this.results.styles_generated
            },
            files_generated: this.results.files_created,
            errors: this.results.errors,
            system_info: {
                node_version: process.version,
                platform: process.platform,
                memory_usage: process.memoryUsage(),
                working_directory: process.cwd()
            },
            next_execution: this.calculateNextExecution()
        };
        
        const reportPath = path.join(__dirname, 'execution-report.json');
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`✅ Reporte guardado en: execution-report.json`);
        this.results.files_created.push({
            path: './execution-report.json',
            size: `${((await fs.stat(reportPath)).size / 1024).toFixed(2)} KB`,
            created: new Date()
        });
    }

    /**
     * ⏰ Calcular próxima ejecución
     */
    calculateNextExecution() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0); // 9:00 AM del día siguiente
        
        return {
            next_run_iso: tomorrow.toISOString(),
            next_run_local: tomorrow.toLocaleString('es-ES'),
            hours_until: Math.ceil((tomorrow - new Date()) / (1000 * 60 * 60))
        };
    }

    /**
     * 📊 Mostrar resumen final
     */
    showFinalSummary() {
        const duration = (Date.now() - this.startTime) / 1000;
        
        console.log('\n🎉 EJECUCIÓN COMPLETADA');
        console.log('========================');
        console.log(`⏱️  Tiempo total: ${duration.toFixed(2)} segundos`);
        console.log(`📁 Archivos creados: ${this.results.files_created.length}`);
        console.log(`❌ Errores: ${this.results.errors.length}`);
        console.log(`📰 Noticias: ${this.results.news_generated ? '✅' : '❌'}`);
        console.log(`🎨 Estilos: ${this.results.styles_generated ? '✅' : '❌'}`);
        
        if (this.results.errors.length > 0) {
            console.log('\n⚠️  ERRORES ENCONTRADOS:');
            this.results.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        console.log('\n🔗 ARCHIVOS PRINCIPALES:');
        console.log('   📰 isotools-daily-news.json - Noticias del día');
        console.log('   🎨 generated-styles/dynamic-styles.css - Estilos dinámicos');
        console.log('   📋 execution-report.json - Reporte de ejecución');
        console.log('   🌐 dynamic-news-page.html - Página de demostración');
        console.log('   🎭 demo-themes.html - Demostración de temas');
        
        console.log('\n🚀 PRÓXIMA EJECUCIÓN:');
        const nextRun = this.calculateNextExecution();
        console.log(`   📅 ${nextRun.next_run_local}`);
        console.log(`   ⏰ En ${nextRun.hours_until} horas`);
        
        console.log('\n💡 INTEGRACIÓN GITHUB ACTIONS:');
        console.log('   Configura un cron job para ejecutar este script diariamente');
        console.log('   Ejemplo: "0 9 * * *" (cada día a las 9:00 AM)');
    }
}

// 🚀 Ejecutar si es llamado directamente
if (require.main === module) {
    const orchestrator = new ISODailyOrchestrator();
    
    orchestrator.execute()
        .then((results) => {
            console.log('\n✅ Orquestador finalizado exitosamente');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Orquestador falló:', error);
            process.exit(1);
        });
}

module.exports = ISODailyOrchestrator;