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
        return
    
    # Seleccionar 3 artículos aleatorios
    all_articles = main_data['data']
    selected_articles = random.sample(all_articles, 3)
    
    # Agregar información de rotación
    for i, article in enumerate(selected_articles):
        article['news_priority'] = i + 1
        article['selected_date'] = datetime.now().isoformat()
        article['rotation_id'] = f"{datetime.now().strftime('%Y-%m-%d')}-{i+1}"
    
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
    
    # Guardar archivo
    with open('isotools-daily-news.json', 'w', encoding='utf-8') as f:
        json.dump(daily_news, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Generado isotools-daily-news.json con 3 artículos")
    print("\n📋 Artículos seleccionados:")
    for i, article in enumerate(selected_articles, 1):
        print(f"{i}. {article['title'][:60]}...")
        print(f"   Categoría: {article['category']}")
    
    print(f"\n🚀 Archivo listo para consumo en GitHub!")

if __name__ == "__main__":
    generate_daily_news()