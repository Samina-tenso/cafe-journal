#!/usr/bin/env bash
# Usage (zsh):
#   source scripts/activate_backend_venv.sh
# This script sources the backend/.venv activation script so the venv is activated
# in your current shell session.

# Resolve the script directory in a way that works when sourced or executed
if [ -n "${BASH_SOURCE[0]:-}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
else
  SCRIPT_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
fi

VENV_ACTIVATE="$SCRIPT_DIR/backend/.venv/bin/activate"

if [ -f "$VENV_ACTIVATE" ]; then
  # shellcheck source=/dev/null
  source "$VENV_ACTIVATE"
else
  echo "Error: venv activation script not found at $VENV_ACTIVATE"
  echo "Create the venv at backend/.venv or update this script to point to the correct path."
fi
