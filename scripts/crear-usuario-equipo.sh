#!/bin/bash
# Crea (o confirma) un usuario de equipo para /whatsapp-cliente.
# Uso:
#   ./scripts/crear-usuario-equipo.sh <usuario> <clave>
#   ./scripts/crear-usuario-equipo.sh            (pide los datos por consola)
#
# Lee ADMIN_SECRET directo del .env del proyecto (no hay que copiarlo a mano).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"
URL="https://genviaya.com/api/admin/team-users"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: no se encontró $ENV_FILE" >&2
  exit 1
fi

ADMIN_SECRET=$(grep -E '^ADMIN_SECRET=' "$ENV_FILE" | head -n1 | cut -d'=' -f2-)

if [ -z "$ADMIN_SECRET" ]; then
  echo "ERROR: ADMIN_SECRET no está definido en $ENV_FILE" >&2
  exit 1
fi

USERNAME="${1:-}"
PASSWORD="${2:-}"

if [ -z "$USERNAME" ]; then
  read -rp "Usuario nuevo: " USERNAME
fi
if [ -z "$PASSWORD" ]; then
  read -rsp "Clave (mínimo 8 caracteres): " PASSWORD
  echo
fi

RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Secret: $ADMIN_SECRET" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}")

BODY=$(echo "$RESPONSE" | head -n -1)
STATUS=$(echo "$RESPONSE" | tail -n1)

echo "$BODY"

case "$STATUS" in
  201) echo "✔ Usuario '$USERNAME' creado. Ya puede entrar en https://genviaya.com/whatsapp-cliente" ;;
  409) echo "✖ Ese usuario ya existe. Usa otro nombre." ;;
  401) echo "✖ ADMIN_SECRET incorrecto — revisa $ENV_FILE" ;;
  422) echo "✖ Datos inválidos (usuario/clave no cumplen el formato mínimo)." ;;
  *)   echo "✖ Algo salió mal (HTTP $STATUS)." ;;
esac
