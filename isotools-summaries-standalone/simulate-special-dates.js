const fs = require('fs').promises;
const path = require('path');
const ISODynamicStyleGenerator = require('./generate-dynamic-styles');

/**
 * 🧪 SIMULADOR DE FECHAS ESPECIALES ISO
 * ===================================
 * Permite probar cómo se ve el sitio en diferentes fechas especiales
 */

class ISODateSimulator {
    constructor() {
        this.generator = new ISODynamicStyleGenerator();
    }

    /**
     * 🎭 Simula una fecha específica
     */
    async simulateDate(monthDay) {
        console.log(`🎭 SIMULANDO FECHA: ${monthDay}`);
        console.log('================================');
        
        // Temporalmente cambiar la fecha en el generador
        const originalDate = this.generator.currentDate;
        const [month, day] = monthDay.split('-').map(Number);
        this.generator.currentDate = new Date(2025, month - 1, day);
        
        try {
            // Generar estilos para la fecha simulada
            const result = await this.generator.generate();
            
            console.log(`✅ Simulación completada para: ${monthDay}`);
            console.log(`🎨 Tema aplicado: ${result.theme_applied}`);
            
            return result;
        } finally {
            // Restaurar fecha original
            this.generator.currentDate = originalDate;
        }
    }

    /**
     * 🎪 Demostración de múltiples fechas especiales
     */
    async demonstrateAllSpecialDates() {
        console.log('🎪 DEMOSTRACIÓN DE FECHAS ESPECIALES ISO');
        console.log('========================================\n');

        const specialDates = [
            '10-14', // Día Mundial de la Normalización
            '09-12', // Día de la Ciberseguridad
            '06-05', // Día Mundial del Medio Ambiente
            '04-28', // Día Mundial de la Seguridad
            '11-20', // Día Mundial de la Calidad
        ];

        for (const date of specialDates) {
            console.log(`\n${'='.repeat(60)}`);
            await this.simulateDate(date);
            console.log(`${'='.repeat(60)}\n`);
            
            // Pausa para mejor visualización
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('🎉 ¡Demostración completada!');
        console.log('Revisa la carpeta generated-styles/ para ver los diferentes estilos generados.');
    }
}

// 🚀 Ejecutar simulación si es llamado directamente
if (require.main === module) {
    const simulator = new ISODateSimulator();
    
    // Obtener fecha desde argumentos de línea de comandos
    const targetDate = process.argv[2];
    
    if (targetDate) {
        // Simular fecha específica
        simulator.simulateDate(targetDate).catch(console.error);
    } else {
        // Demostrar todas las fechas especiales
        simulator.demonstrateAllSpecialDates().catch(console.error);
    }
}

module.exports = ISODateSimulator;