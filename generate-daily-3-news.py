#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para generar JSON diario de 3 artículos aleatorios
Genera isotools-daily-news.json con 3 artículos seleccionados aleatoriamente
"""

import json
import random
import os
from datetime import datetime, timedelta

def generate_daily_news():
    print("🗞️ GENERADOR DE NOTICIAS DIARIAS ISO (3 artículos)")
    print("=" * 50)
    
    # Leer archivo principal
    try:
        with open('isotools-final-data.json', 'r', encoding='utf-8') as f:
            main_data = json.load(f)
        print(f"✅ Cargados {len(main_data['data'])} artículos")
    except FileNotFoundError:
        print("❌ No se encontró isotools-final-data.json")
        print("💡 Asegúrate de que el archivo existe en el directorio actual")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Error al leer isotools-final-data.json: {e}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado al cargar datos: {e}")
        return False
    
    # Extraer artículos
    all_articles = main_data['data']
    
    # Validar que tengamos suficientes artículos
    if len(all_articles) < 3:
        print(f"❌ No hay suficientes artículos ({len(all_articles)} disponibles, se necesitan al menos 3)")
        return False
    
    # Seleccionar 3 artículos aleatorios
    try:
        selected_articles = random.sample(all_articles, 3)
    except ValueError as e:
        print(f"❌ Error al seleccionar artículos aleatorios: {e}")
        return False
    
    # Agregar información de rotación y asegurar que tengan todos los campos necesarios
    for i, article in enumerate(selected_articles):
        article['news_priority'] = i + 1
        article['selected_date'] = datetime.now().isoformat()
        article['rotation_id'] = f"{datetime.now().strftime('%Y-%m-%d')}-{i+1}"
        
        # Asegurar que el campo image_url esté presente (pero sin generar automáticamente)
        if 'image_url' not in article or not article['image_url']:
            article['image_url'] = None  # Dejar como null en lugar de generar automáticamente
    
    # Crear JSON de noticias diarias
    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    
    daily_news = {
        "metadata": {
            "title": "ISOTools - Noticias Diarias",
            "description": "Selección diaria de 3 artículos destacados sobre normas ISO",
            "source": "ISOTools Corporate Blog (isotools.us)",
            "generated_date": today.strftime("%Y-%m-%d"),
            "generated_at": today.isoformat(),
            "next_update": tomorrow.strftime("%Y-%m-%d"),
            "total_articles": 3,
            "rotation_type": "daily_random_selection",
            "version": "1.0.0",
            "purpose": "Noticias diarias para sección web",
            "github_raw_example": "https://raw.githubusercontent.com/tu-usuario/tu-repo/main/isotools-daily-news.json",
            "parent_source": main_data['metadata']['source'],
            "language": "español"
        },
        "configuration": {
            "daily_rotation": True,
            "articles_per_day": 3,
            "selection_method": "true_random_with_timestamp",
            "auto_update": True,
            "github_action_enabled": True,
            "cache_duration_hours": 24,
            "rotation_on_each_execution": True
        },
        "daily_news": selected_articles,
        "generation_info": {
            "selected_at": today.isoformat(),
            "next_rotation": tomorrow.isoformat(),
            "algorithm": "python_random_sample",
            "total_available_articles": len(all_articles),
            "rotation_guaranteed": True
        }
    }
    
    # Guardar archivo JSON
    with open('isotools-daily-news.json', 'w', encoding='utf-8') as f:
        json.dump(daily_news, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Generado isotools-daily-news.json con 3 artículos")
    print("\n📋 Artículos seleccionados:")
    for i, article in enumerate(selected_articles, 1):
        print(f"{i}. {article['title'][:60]}...")
        print(f"   Categoría: {article['category']}")
        if 'image_url' in article and article['image_url']:
            print(f"   Imagen: ✅")
        else:
            print(f"   Imagen: ❌ (sin imagen)")
    
    print(f"\n🚀 Archivo listo para consumo en GitHub!")
    return True

if __name__ == "__main__":
    try:
        success = generate_daily_news()
        if success:
            print("✅ Proceso completado exitosamente")
        else:
            print("❌ Error en el proceso")
            exit(1)
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        exit(1)