const fs = require('fs');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync('isotools-final-data.json', 'utf8'));

console.log('🖼️ VERIFICACIÓN DE IMÁGENES');
console.log('===========================\n');

// Verificar primeros 5 artículos
data.data.slice(0, 5).forEach((article, i) => {
    console.log(`${i+1}. ${article.title.substring(0, 60)}...`);
    console.log(`   📷 Imagen: ${article.image_url || 'null'}`);
    console.log(`   📊 Estado: ${article.image_url ? '✅ Con imagen' : '❌ Sin imagen'}`);
    console.log('');
});

// Estadísticas generales
const withImages = data.data.filter(article => article.image_url).length;
const withoutImages = data.data.length - withImages;

console.log('📊 ESTADÍSTICAS GENERALES');
console.log('=========================');
console.log(`Total artículos: ${data.data.length}`);
console.log(`Con imágenes: ${withImages} (${Math.round(withImages/data.data.length*100)}%)`);
console.log(`Sin imágenes: ${withoutImages} (${Math.round(withoutImages/data.data.length*100)}%)`);