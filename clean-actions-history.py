#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para limpiar historial de GitHub Actions usando la API de GitHub
Requiere un token de GitHub con permisos de repo
"""

import requests
import json
import time

def delete_workflow_runs(owner, repo, token):
    """
    Elimina todos los workflow runs de un repositorio
    """
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # Obtener todos los workflows
    workflows_url = f'https://api.github.com/repos/{owner}/{repo}/actions/workflows'
    response = requests.get(workflows_url, headers=headers)
    
    if response.status_code != 200:
        print(f"❌ Error obteniendo workflows: {response.status_code}")
        return False
    
    workflows = response.json()['workflows']
    print(f"📋 Encontrados {len(workflows)} workflows")
    
    total_deleted = 0
    
    for workflow in workflows:
        workflow_id = workflow['id']
        workflow_name = workflow['name']
        print(f"\n🔄 Procesando workflow: {workflow_name}")
        
        # Obtener runs de este workflow
        runs_url = f'https://api.github.com/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs'
        
        while True:
            response = requests.get(runs_url, headers=headers)
            if response.status_code != 200:
                print(f"❌ Error obteniendo runs: {response.status_code}")
                break
            
            data = response.json()
            runs = data['workflow_runs']
            
            if not runs:
                print("✅ No hay más runs para eliminar")
                break
            
            print(f"🗑️ Eliminando {len(runs)} runs...")
            
            for run in runs:
                run_id = run['id']
                delete_url = f'https://api.github.com/repos/{owner}/{repo}/actions/runs/{run_id}'
                
                delete_response = requests.delete(delete_url, headers=headers)
                if delete_response.status_code == 204:
                    total_deleted += 1
                    print(f"  ✅ Run {run_id} eliminado")
                else:
                    print(f"  ❌ Error eliminando run {run_id}: {delete_response.status_code}")
                
                # Rate limiting - esperar un poco entre requests
                time.sleep(0.1)
    
    print(f"\n🎉 ¡Limpieza completada! Total eliminados: {total_deleted} runs")
    return True

def main():
    print("🧹 LIMPIADOR DE HISTORIAL GITHUB ACTIONS")
    print("=" * 45)
    
    # Configuración
    owner = "thenext90"
    repo = "noticias_isotools_cms"
    
    print("⚠️  IMPORTANTE: Necesitas un GitHub Personal Access Token")
    print("📋 Pasos para obtenerlo:")
    print("   1. Ve a: https://github.com/settings/tokens")
    print("   2. Generate new token (classic)")
    print("   3. Selecciona scopes: 'repo' y 'workflow'")
    print("   4. Copia el token generado")
    print("")
    
    token = input("🔑 Ingresa tu GitHub token: ").strip()
    
    if not token:
        print("❌ Token requerido")
        return
    
    print(f"\n🎯 Repositorio: {owner}/{repo}")
    confirm = input("⚠️  ¿Estás seguro de eliminar TODO el historial? (si/no): ").strip().lower()
    
    if confirm not in ['si', 'sí', 'yes', 'y']:
        print("❌ Operación cancelada")
        return
    
    print("\n🚀 Iniciando limpieza...")
    success = delete_workflow_runs(owner, repo, token)
    
    if success:
        print("\n✅ ¡Historial de GitHub Actions limpiado completamente!")
    else:
        print("\n❌ Hubo errores durante la limpieza")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⏹️ Operación interrumpida por el usuario")
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")