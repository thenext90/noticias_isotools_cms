#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para remover imágenes auto-generadas del JSON
Elimina todas las imágenes placeholder y deja solo las reales (si las hay)
"""

import json

def remove_auto_generated_images():
    print("🖼️ REMOVEDOR DE IMÁGENES AUTO-GENERADAS")
    print("=" * 42)
    
    # Leer archivo principal
    try:
        with open('isotools-final-data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"✅ Archivo cargado: {len(data['data'])} artículos")
    except FileNotFoundError:
        print("❌ No se encontró isotools-final-data.json")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Error al leer JSON: {e}")
        return False
    
    # Contadores
    images_removed = 0
    real_images_kept = 0
    
    # Procesar cada artículo
    for article in data['data']:
        current_image = article.get('image_url', '')
        
        # Detectar imágenes auto-generadas (placeholder, picsum, via.placeholder, etc.)
        is_auto_generated = (
            not current_image or
            'picsum.photos' in current_image or
            'via.placeholder.com' in current_image or
            'placeholder' in current_image.lower() or
            'random=' in current_image or
            current_image.startswith('https://www.isotools.us/wp-content/uploads/default') or
            '2025/' in current_image  # URLs futuras que no existen
        )
        
        if is_auto_generated:
            # Remover imagen auto-generada
            article['image_url'] = None
            images_removed += 1
            print(f"🗑️ Removida imagen auto-generada: {article['title'][:50]}...")
        else:
            # Mantener imagen real (si existe y no es auto-generada)
            real_images_kept += 1
            print(f"✅ Mantenida imagen real: {article['title'][:50]}...")
    
    # Actualizar metadata
    data['metadata']['images_status'] = 'auto_generated_removed'
    data['metadata']['images_removed'] = images_removed
    data['metadata']['real_images_kept'] = real_images_kept
    data['metadata']['last_image_cleanup'] = "2025-10-05T22:20:00.000Z"
    data['metadata']['image_policy'] = "no_auto_generated_placeholders"
    
    # Guardar archivo sin imágenes auto-generadas
    with open('isotools-final-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n📊 RESUMEN:")
    print(f"🗑️ Imágenes auto-generadas removidas: {images_removed}")
    print(f"✅ Imágenes reales mantenidas: {real_images_kept}")
    print(f"📄 Total artículos: {len(data['data'])}")
    print(f"\n🚀 Archivo isotools-final-data.json actualizado sin imágenes auto-generadas!")
    
    return True

if __name__ == "__main__":
    try:
        success = remove_auto_generated_images()
        if success:
            print("✅ Proceso de limpieza completado exitosamente")
        else:
            print("❌ Error en el proceso de limpieza")
            exit(1)
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        exit(1)