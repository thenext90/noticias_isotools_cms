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
    

    # Leer artículos desde isotools_blog_articles.json
    try:
        with open('isotools_blog_articles.json', 'r', encoding='utf-8') as f:
            all_articles = json.load(f)
        print(f"✅ Cargados {len(all_articles)} artículos desde isotools_blog_articles.json")
    except FileNotFoundError:
        print("❌ No se encontró isotools_blog_articles.json")
        print("💡 Asegúrate de que el archivo existe en el directorio actual")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Error al leer isotools_blog_articles.json: {e}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado al cargar datos: {e}")
        return False

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
    today_str = datetime.now().strftime('%Y-%m-%d')
    log_filename = f"daily-news-selection-log-{today_str}.txt"
    selected_ids = []
    for i, article in enumerate(selected_articles):
        article['news_priority'] = i + 1
        article['selected_date'] = datetime.now().isoformat()
        article['rotation_id'] = f"{today_str}-{i+1}"
        selected_ids.append(str(article.get('id', 'N/A')))
        # Asegurar que el campo image_url esté presente (pero sin generar automáticamente)
        if 'image_url' not in article or not article.get('image_url'):
            article['image_url'] = None  # Dejar como null en lugar de generar automáticamente
    # Guardar log de selección diaria
    try:
        with open(log_filename, 'w', encoding='utf-8') as logf:
            logf.write(f"Fecha: {today_str}\n")
            logf.write(f"IDs seleccionados: {', '.join(selected_ids)}\n")
    except Exception as e:
        print(f"⚠️ No se pudo guardar el log de selección diaria: {e}")
    
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
            "parent_source": "isotools_blog_articles.json",
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
    print(f"\n📋 Artículos seleccionados:")
    for i, article in enumerate(selected_articles, 1):
        title = article.get('title') or article.get('text', '[Sin título]')
        print(f"{i}. {title[:60]}...")
        categoria = article.get('category', 'N/A')
        print(f"   Categoría: {categoria}")
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