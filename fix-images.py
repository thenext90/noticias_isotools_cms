#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corregir las URLs de imágenes en isotools-final-data.json
Reemplaza las URLs ficticias por imágenes genéricas que sí existen
"""

import json

def get_generic_image_by_category(category):
    """
    Retorna una imagen genérica válida basándose en la categoría ISO
    """
    # Mapeo de categorías a imágenes genéricas confiables
    category_images = {
        'ISO_9001_Calidad': 'https://picsum.photos/400/250?random=9001',
        'ISO_9001_Gestion_Calidad': 'https://picsum.photos/400/250?random=9001',
        'ISO_14001_Gestion_Ambiental': 'https://picsum.photos/400/250?random=14001',
        'ISO_27001_Seguridad_Informacion': 'https://picsum.photos/400/250?random=27001',
        'ISO_45001_Seguridad_Salud': 'https://picsum.photos/400/250?random=45001',
        'ISO_50001_Gestion_Energia': 'https://picsum.photos/400/250?random=50001',
        'ISO_42001_Inteligencia_Artificial': 'https://picsum.photos/400/250?random=42001',
        'ISO_Normas_Generales': 'https://picsum.photos/400/250?random=1000',
        'ISO_22000_Seguridad_Alimentaria': 'https://picsum.photos/400/250?random=22000',
        'ISO_31000_Gestion_Riesgos': 'https://picsum.photos/400/250?random=31000',
        'ISO_37001_Antisoborno': 'https://picsum.photos/400/250?random=37001',
        'Herramientas_Digitales_ISO': 'https://picsum.photos/400/250?random=5000',
        'ISO_55001_Gestion_Activos': 'https://picsum.photos/400/250?random=55001'
    }
    
    # Retornar imagen específica por categoría o imagen genérica por defecto
    return category_images.get(category, 'https://picsum.photos/400/250?random=999')

def fix_images_in_json():
    print("🖼️ CORRECTOR DE IMÁGENES - ISOTools JSON")
    print("=" * 45)
    
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
    images_fixed = 0
    images_already_ok = 0
    
    # Procesar cada artículo
    for article in data['data']:
        current_image = article.get('image_url', '')
        category = article.get('category', 'ISO_Normas_Generales')
        
        # Si la imagen es nula, vacía, contiene fechas futuras (2025), o usa placeholder anterior
        if (not current_image or 
            '2025/' in current_image or 
            current_image.startswith('https://www.isotools.us/wp-content/uploads/default') or
            'via.placeholder.com' in current_image):
            new_image = get_generic_image_by_category(category)
            article['image_url'] = new_image
            images_fixed += 1
            print(f"🔧 Corregida imagen para: {article['title'][:50]}...")
            print(f"   Categoría: {category}")
            print(f"   Nueva imagen: {new_image}")
        else:
            images_already_ok += 1
    
    # Actualizar metadata
    data['metadata']['images_status'] = 'corrected_generic_placeholders'
    data['metadata']['images_fixed'] = images_fixed
    data['metadata']['last_image_fix'] = "2025-10-05T22:10:00.000Z"
    
    # Guardar archivo corregido
    with open('isotools-final-data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n📊 RESUMEN:")
    print(f"✅ Imágenes corregidas: {images_fixed}")
    print(f"✅ Imágenes ya válidas: {images_already_ok}")
    print(f"✅ Total artículos: {len(data['data'])}")
    print(f"\n🚀 Archivo isotools-final-data.json actualizado!")
    
    return True

if __name__ == "__main__":
    try:
        success = fix_images_in_json()
        if success:
            print("✅ Proceso de corrección completado exitosamente")
        else:
            print("❌ Error en el proceso de corrección")
            exit(1)
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        exit(1)