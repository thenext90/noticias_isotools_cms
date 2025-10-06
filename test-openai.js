// Test rápido de generación de resúmenes con OpenAI
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Función de prueba (copia de la función principal)
async function generateAISummary(title) {
    console.log(`🤖 Generando resumen IA para: "${title.substring(0, 50)}..."`);
    
    try {
        // Si hay una API key válida, usar OpenAI
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'tu_api_key_aqui' && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            // Analizar el título para generar contexto específico
            const titleLower = title.toLowerCase();
            let specificContext = "";
            let uniqueAngle = "";
            
            // Identificar norma ISO específica
            const isoNumber = title.match(/ISO\s*(\d+)/i);
            if (isoNumber) {
                const isoCode = isoNumber[1];
                const isoContexts = {
                    '9001': 'gestión de calidad y satisfacción del cliente',
                    '14001': 'gestión ambiental y sostenibilidad empresarial',
                    '45001': 'seguridad y salud ocupacional en el trabajo',
                    '27001': 'seguridad de la información y ciberseguridad',
                    '50001': 'gestión energética y eficiencia en consumo',
                    '22000': 'seguridad alimentaria y control de riesgos',
                    '37001': 'sistemas anti-soborno y ética empresarial',
                    '55001': 'gestión de activos físicos y optimización',
                    '21500': 'dirección y gestión de proyectos exitosos',
                    '26000': 'responsabilidad social corporativa',
                    '37301': 'compliance management y cumplimiento normativo',
                    '22301': 'continuidad del negocio y gestión de crisis',
                    '39001': 'seguridad vial en transporte y logística',
                    '30401': 'gestión del conocimiento organizacional',
                    '16949': 'calidad automotriz y manufacturing',
                    '13485': 'dispositivos médicos y regulación sanitaria',
                    '28000': 'seguridad en cadena de suministro',
                    '42001': 'inteligencia artificial y sistemas IA éticos'
                };
                specificContext = isoContexts[isoCode] || 'sistemas de gestión normalizados';
            }
            
            // Generar ángulos únicos basados en palabras clave
            if (titleLower.includes('digital') || titleLower.includes('automatización')) {
                uniqueAngle = "transformación digital y automatización de procesos";
            } else if (titleLower.includes('auditoria') || titleLower.includes('auditor')) {
                uniqueAngle = "auditorías internas y control de cumplimiento";
            } else if (titleLower.includes('kpi') || titleLower.includes('indicador') || titleLower.includes('medición')) {
                uniqueAngle = "medición de indicadores y análisis de desempeño";
            } else if (titleLower.includes('compliance') || titleLower.includes('cumplimiento')) {
                uniqueAngle = "cumplimiento regulatorio y gestión de riesgos";
            } else if (titleLower.includes('software') || titleLower.includes('herramienta')) {
                uniqueAngle = "herramientas tecnológicas y software especializado";
            } else if (titleLower.includes('industria 4.0') || titleLower.includes('blockchain')) {
                uniqueAngle = "tecnologías emergentes e Industria 4.0";
            } else if (titleLower.includes('laboratorio') || titleLower.includes('calibración')) {
                uniqueAngle = "gestión de laboratorios y metrología";
            } else if (titleLower.includes('riesgo') || titleLower.includes('crisis')) {
                uniqueAngle = "gestión de riesgos y continuidad operacional";
            } else {
                uniqueAngle = "optimización operacional y mejora continua";
            }
            
            const enhancedPrompt = `Eres un consultor senior especializado en ${specificContext}. Analiza este título de artículo y genera un resumen único de exactamente 2-3 oraciones que se enfoque específicamente en ${uniqueAngle}:

TÍTULO: "${title}"

INSTRUCCIONES ESPECÍFICAS:
1. Identifica QUÉ problema empresarial específico resuelve
2. Menciona beneficios CUANTIFICABLES o resultados medibles
3. Incluye el sector o tipo de organizaciones que más se benefician
4. Usa terminología técnica específica de ${specificContext}
5. Evita frases genéricas como "mejora la eficiencia" - sé específico
6. Enfócate en el aspecto de ${uniqueAngle}

FORMATO: Escribe exactamente 2-3 oraciones profesionales sin introducir con "Este artículo" o similar. Ve directo al contenido.`;

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ 
                    role: "user", 
                    content: enhancedPrompt 
                }],
                max_tokens: 250,
                temperature: 0.9
            });

            const summary = completion.choices[0].message.content.trim();
            console.log(`✅ Resumen generado con OpenAI (${summary.length} caracteres)`);
            
            return summary;
        }
    } catch (error) {
        console.error(`❌ Error generando resumen:`, error.message);
        return "Error en generación";
    }
}

// Títulos de prueba para verificar diversidad
const testTitles = [
    "¿Cuáles son los beneficios de la ISO 9001 2026?",
    "Software de gestión medioambiental: 7 requisitos clave para elegir la mejor solución para tu empresa",
    "Automatización de procesos ISO: cómo las herramientas digitales transforman la gestión de calidad",
    "ISO 37301: sistemas de gestión de compliance y su implementación práctica",
    "Auditorías internas ISO: metodología avanzada para el control de calidad empresarial"
];

async function testSummaries() {
    console.log('🧪 PROBANDO GENERACIÓN DE RESÚMENES CON OPENAI');
    console.log('='.repeat(60));
    
    for (let i = 0; i < testTitles.length; i++) {
        console.log(`\n${i + 1}. TÍTULO: ${testTitles[i]}`);
        console.log('-'.repeat(50));
        
        const summary = await generateAISummary(testTitles[i]);
        console.log(`RESUMEN: ${summary}`);
        
        // Pausa entre llamadas
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

testSummaries().catch(console.error);