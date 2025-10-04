const fs = require('fs').promises;
const path = require('path');

/**
 * 🎨 GENERADOR DE ESTILOS DINÁMICOS ISO
 * ===================================
 * Transforma el sitio web según fechas especiales del mundo ISO
 * Genera CSS, HTML y configuraciones únicas para cada día especial
 */

class ISODynamicStyleGenerator {
    constructor() {
        this.calendarPath = path.join(__dirname, 'iso-calendar-themes.json');
        this.outputPath = path.join(__dirname, 'generated-styles');
        this.currentDate = new Date();
    }

    /**
     * 📅 Detecta si hoy es una fecha especial ISO
     */
    async detectSpecialDate() {
        try {
            const calendarData = JSON.parse(await fs.readFile(this.calendarPath, 'utf8'));
            const today = this.formatDate(this.currentDate);
            
            console.log(`🔍 Verificando fecha especial para: ${today}`);
            
            if (calendarData.special_dates[today]) {
                const specialDate = calendarData.special_dates[today];
                console.log(`🎉 ¡FECHA ESPECIAL DETECTADA!`);
                console.log(`📅 ${specialDate.name}`);
                console.log(`📋 ${specialDate.description}`);
                console.log(`🏷️ Normas: ${specialDate.iso_standards.join(', ')}`);
                return { date: today, ...specialDate };
            } else {
                console.log(`📅 Fecha normal - usando tema por defecto`);
                return { 
                    date: today, 
                    ...calendarData.fallback_themes.default,
                    name: "Día Normal - Profesional"
                };
            }
        } catch (error) {
            console.error('❌ Error detectando fecha especial:', error);
            return null;
        }
    }

    /**
     * 🎨 Genera CSS dinámico basado en el tema del día
     */
    generateDynamicCSS(theme) {
        const { colors, typography, layout, animations, special_elements } = theme.theme || theme;
        
        return `
/* 🎨 ESTILOS DINÁMICOS ISO - ${theme.name} */
/* Generado automáticamente el ${new Date().toISOString()} */

:root {
    /* 🎨 Colores del tema ${theme.name} */
    --primary-color: ${colors.primary};
    --secondary-color: ${colors.secondary};
    --accent-color: ${colors.accent};
    --background-color: ${colors.background};
    --text-color: ${colors.text};
    
    /* 📝 Tipografía */
    --primary-font: ${typography.primary_font};
    --heading-font: ${typography.heading_font};
    
    /* ✨ Propiedades de animación */
    --animation-duration: 0.8s;
    --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 🌟 Layout principal */
body {
    font-family: var(--primary-font);
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all var(--animation-duration) var(--animation-easing);
}

/* 📰 Contenedor de noticias */
.news-container {
    background: linear-gradient(135deg, 
        ${colors.background} 0%, 
        ${this.lightenColor(colors.primary, 0.95)} 100%);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    transition: transform var(--animation-duration) var(--animation-easing);
}

.news-container:hover {
    transform: translateY(-8px);
}

/* 🎯 Títulos dinámicos */
h1, h2, h3 {
    font-family: var(--heading-font);
    color: var(--primary-color);
    position: relative;
}

h1::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
    border-radius: 2px;
}

/* 🏷️ Tarjetas de artículos */
.article-card {
    background: rgba(255, 255, 255, 0.9);
    border-left: 4px solid var(--accent-color);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.article-card:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateX(8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

/* 🎨 Categorías especiales */
.category-badge {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
    margin: 0.5rem 0;
}

/* ✨ Animaciones específicas del tema */
${this.generateAnimations(animations)}

/* 🎭 Elementos especiales del tema */
${this.generateSpecialElements(special_elements, colors)}

/* 📱 Responsive design */
@media (max-width: 768px) {
    .news-container {
        padding: 1rem;
        margin: 0.5rem;
    }
    
    .article-card {
        padding: 1rem;
    }
}

/* 🌙 Modo oscuro automático para temas específicos */
${this.shouldUseDarkMode(theme) ? this.generateDarkMode(colors) : ''}
`;
    }

    /**
     * ✨ Genera animaciones CSS específicas del tema
     */
    generateAnimations(animations) {
        if (!animations) return '';
        
        let animationCSS = '';
        
        animations.forEach(animation => {
            switch(animation) {
                case 'matrix_code':
                    animationCSS += `
@keyframes matrix-rain {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
}

.matrix-bg::before {
    content: '010110100101';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: var(--accent-color);
    opacity: 0.1;
    animation: matrix-rain 10s infinite linear;
    pointer-events: none;
    z-index: -1;
}`;
                    break;
                    
                case 'leaf_grow':
                    animationCSS += `
@keyframes leaf-grow {
    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
    50% { transform: scale(1.1) rotate(0deg); opacity: 0.8; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.eco-element {
    animation: leaf-grow 1.5s ease-out;
}`;
                    break;
                    
                case 'certificate_stamp':
                    animationCSS += `
@keyframes stamp-appear {
    0% { transform: scale(0) rotate(180deg); opacity: 0; }
    70% { transform: scale(1.2) rotate(-10deg); opacity: 0.8; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.iso-badge {
    animation: stamp-appear 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`;
                    break;
            }
        });
        
        return animationCSS;
    }

    /**
     * 🎭 Genera elementos especiales CSS
     */
    generateSpecialElements(elements, colors) {
        if (!elements) return '';
        
        let specialCSS = '';
        
        elements.forEach(element => {
            switch(element) {
                case 'binary_background':
                    specialCSS += `
body::before {
    content: '${this.generateBinaryPattern()}';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: monospace;
    font-size: 12px;
    color: ${colors.accent};
    opacity: 0.05;
    pointer-events: none;
    z-index: -1;
    line-height: 1.2;
}`;
                    break;
                    
                case 'nature_patterns':
                    specialCSS += `
.article-card::before {
    content: '🌿';
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 2rem;
    opacity: 0.3;
    filter: grayscale(50%);
}`;
                    break;
                    
                case 'quality_badges':
                    specialCSS += `
.quality-indicator {
    position: relative;
}

.quality-indicator::after {
    content: '✓';
    position: absolute;
    top: -5px;
    right: -5px;
    background: ${colors.accent};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}`;
                    break;
            }
        });
        
        return specialCSS;
    }

    /**
     * 🌙 Genera modo oscuro para temas específicos
     */
    generateDarkMode(colors) {
        return `
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: ${this.darkenColor(colors.background, 0.9)};
        --text-color: ${this.lightenColor(colors.text, 0.9)};
    }
}`;
    }

    /**
     * 🛠️ Utilidades de color
     */
    lightenColor(color, factor) {
        // Implementación simplificada
        return color + Math.floor(255 * factor).toString(16).padStart(2, '0');
    }

    darkenColor(color, factor) {
        // Implementación simplificada
        return color.replace(/[0-9a-f]/gi, (match) => 
            Math.floor(parseInt(match, 16) * factor).toString(16)
        );
    }

    shouldUseDarkMode(theme) {
        const darkThemes = ['cybersecurity', 'security_matrix'];
        return darkThemes.includes(theme.theme?.name || theme.name);
    }

    generateBinaryPattern() {
        let pattern = '';
        for (let i = 0; i < 1000; i++) {
            pattern += Math.random() > 0.5 ? '1' : '0';
            if (i % 80 === 0) pattern += '\n';
        }
        return pattern;
    }

    /**
     * 📅 Formatea fecha a MM-DD
     */
    formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
    }

    /**
     * 🚀 Proceso principal
     */
    async generate() {
        console.log('🎨 GENERADOR DE ESTILOS DINÁMICOS ISO');
        console.log('====================================');
        
        try {
            // Crear directorio de salida
            await fs.mkdir(this.outputPath, { recursive: true });
            
            // Detectar fecha especial
            const specialDate = await this.detectSpecialDate();
            if (!specialDate) return;
            
            // Generar CSS dinámico
            const dynamicCSS = this.generateDynamicCSS(specialDate);
            
            // Guardar archivos
            const cssPath = path.join(this.outputPath, 'dynamic-styles.css');
            await fs.writeFile(cssPath, dynamicCSS);
            
            // Generar archivo de configuración
            const config = {
                generated_at: new Date().toISOString(),
                special_date: specialDate,
                theme_applied: specialDate.theme?.name || specialDate.name,
                css_file: 'dynamic-styles.css'
            };
            
            const configPath = path.join(this.outputPath, 'current-theme.json');
            await fs.writeFile(configPath, JSON.stringify(config, null, 2));
            
            console.log(`✅ Estilos generados para: ${specialDate.name}`);
            console.log(`📁 Archivos creados en: ${this.outputPath}`);
            
            return config;
            
        } catch (error) {
            console.error('❌ Error generando estilos:', error);
            throw error;
        }
    }
}

// 🚀 Ejecutar si es llamado directamente
if (require.main === module) {
    const generator = new ISODynamicStyleGenerator();
    generator.generate().catch(console.error);
}

module.exports = ISODynamicStyleGenerator;