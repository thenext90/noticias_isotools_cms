const fs = require('fs');

// Leer el archivo JSON final
const jsonData = JSON.parse(fs.readFileSync('isotools-final-data.json', 'utf8'));

// Analizar resúmenes de los artículos
const summaries = jsonData.data.map(article => article.ai_summary);
const summaryCount = {};

// Contar frecuencia de cada resumen
summaries.forEach(summary => {
    summaryCount[summary] = (summaryCount[summary] || 0) + 1;
});

// Encontrar resúmenes duplicados
const duplicates = Object.entries(summaryCount)
    .filter(([summary, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

console.log('📊 ANÁLISIS POST-REGENERACIÓN - ' + new Date().toLocaleString());
console.log('='.repeat(60));
console.log(`📄 Total de artículos: ${summaries.length}`);
console.log(`🔢 Resúmenes únicos: ${Object.keys(summaryCount).length}`);
console.log(`🔄 Resúmenes duplicados: ${duplicates.length}`);
console.log(`📈 Porcentaje de duplicación: ${Math.round((duplicates.length / Object.keys(summaryCount).length) * 100)}%`);

if (duplicates.length > 0) {
    console.log('\n❌ RESÚMENES MÁS REPETIDOS:');
    console.log('-'.repeat(40));
    
    duplicates.slice(0, 3).forEach(([summary, count], index) => {
        console.log(`\n${index + 1}. Repetido ${count} veces:`);
        console.log(`"${summary.substring(0, 80)}..."`);
    });
} else {
    console.log('\n✅ ¡EXCELENTE! No hay resúmenes duplicados.');
}

console.log('\n🎯 RESUMEN EJECUTIVO:');
console.log('-'.repeat(40));
console.log(`• Estado: ${duplicates.length === 0 ? '✅ PERFECTO' : '⚠️ NECESITA OPENAI'}`);
console.log(`• Diversidad: ${Object.keys(summaryCount).length}/50 únicos`);
console.log(`• Mayor duplicado: ${duplicates.length > 0 ? duplicates[0][1] + ' veces' : 'N/A'}`);
console.log(`• Recomendación: ${duplicates.length > 0 ? 'Configurar OPENAI_API_KEY' : 'Sistema perfecto'}`);

console.log('\n' + '='.repeat(60));