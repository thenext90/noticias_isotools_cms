#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para limpiar todo el historial de GitHub Actions
Elimina automáticamente todas las ejecuciones de workflows
"""

import json
import requests
import time
from datetime import datetime

class GitHubActionscleaner:
    def __init__(self, token, owner, repo):
        self.token = token
        self.owner = owner
        self.repo = repo
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    
    def get_workflow_runs(self):
        """Obtener todas las ejecuciones de workflows"""
        print("🔍 Obteniendo lista de ejecuciones de workflows...")
        
        url = f"{self.base_url}/repos/{self.owner}/{self.repo}/actions/runs"
        all_runs = []
        page = 1
        
        while True:
            params = {"page": page, "per_page": 100}
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code != 200:
                print(f"❌ Error al obtener ejecuciones: {response.status_code}")
                print(f"Respuesta: {response.text}")
                return []
            
            data = response.json()
            runs = data.get("workflow_runs", [])
            
            if not runs:
                break
                
            all_runs.extend(runs)
            print(f"📋 Página {page}: {len(runs)} ejecuciones encontradas")
            page += 1
            
            # Evitar rate limiting
            time.sleep(0.1)
        
        return all_runs
    
    def delete_workflow_run(self, run_id, run_name, run_date):
        """Eliminar una ejecución específica"""
        url = f"{self.base_url}/repos/{self.owner}/{self.repo}/actions/runs/{run_id}"
        
        response = requests.delete(url, headers=self.headers)
        
        if response.status_code == 204:
            print(f"✅ Eliminado: {run_name} ({run_date})")
            return True
        else:
            print(f"❌ Error eliminando {run_id}: {response.status_code}")
            return False
    
    def clean_all_runs(self):
        """Limpiar todas las ejecuciones"""
        print("🧹 LIMPIADOR DE HISTORIAL GITHUB ACTIONS")
        print("=" * 50)
        
        # Obtener todas las ejecuciones
        runs = self.get_workflow_runs()
        
        if not runs:
            print("ℹ️ No se encontraron ejecuciones para eliminar")
            return
        
        print(f"\n📊 Total de ejecuciones encontradas: {len(runs)}")
        
        # Confirmar antes de eliminar
        print("\n⚠️ ADVERTENCIA: Esto eliminará TODAS las ejecuciones de workflows")
        print("Esta acción NO se puede deshacer.")
        
        confirm = input("\n¿Estás seguro? Escribe 'SI' para continuar: ")
        if confirm.upper() != 'SI':
            print("❌ Operación cancelada")
            return
        
        print(f"\n🚀 Iniciando eliminación de {len(runs)} ejecuciones...")
        print("-" * 50)
        
        # Eliminar cada ejecución
        success_count = 0
        error_count = 0
        
        for i, run in enumerate(runs, 1):
            run_id = run["id"]
            run_name = run["name"] or "Sin nombre"
            run_date = run["created_at"][:10]  # Solo fecha
            
            print(f"[{i}/{len(runs)}] ", end="")
            
            if self.delete_workflow_run(run_id, run_name, run_date):
                success_count += 1
            else:
                error_count += 1
            
            # Pausa para evitar rate limiting
            time.sleep(0.2)
        
        # Resumen final
        print("\n" + "=" * 50)
        print("🎉 LIMPIEZA COMPLETADA")
        print("=" * 50)
        print(f"✅ Eliminadas exitosamente: {success_count}")
        print(f"❌ Errores: {error_count}")
        print(f"📊 Total procesadas: {len(runs)}")
        
        if success_count > 0:
            print(f"\n🌐 Verifica en: https://github.com/{self.owner}/{self.repo}/actions")

def main():
    print("🧹 GITHUB ACTIONS HISTORY CLEANER")
    print("=" * 40)
    
    # Configuración del repositorio
    OWNER = "thenext90"
    REPO = "noticias_isotools_cms"
    
    print(f"📁 Repositorio: {OWNER}/{REPO}")
    print(f"🔗 URL: https://github.com/{OWNER}/{REPO}")
    
    # Solicitar token
    print("\n🔑 NECESITAS UN GITHUB TOKEN:")
    print("1. Ve a: https://github.com/settings/tokens")
    print("2. 'Generate new token (classic)'")
    print("3. Selecciona permisos: 'repo' y 'workflow'")
    print("4. Copia el token generado")
    
    token = input("\n🔐 Pega tu GitHub token aquí: ").strip()
    
    if not token:
        print("❌ Token requerido para continuar")
        return
    
    if not token.startswith(('ghp_', 'github_pat_')):
        print("⚠️ Advertencia: El token no parece tener el formato correcto")
        cont = input("¿Continuar de todos modos? (s/N): ")
        if cont.lower() != 's':
            return
    
    # Crear limpiador y ejecutar
    cleaner = GitHubActionsleaner(token, OWNER, REPO)
    cleaner.clean_all_runs()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Operación cancelada por el usuario")
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        print("💡 Asegúrate de que tu token tenga los permisos correctos")