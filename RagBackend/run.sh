#!/bin/bash

# Define venv directory
VENV_DIR="venv"

# Check if venv exists
if [ ! -d "$VENV_DIR" ]; then
    echo "Creating virtual environment..."
    python3 -m venv $VENV_DIR
fi

# Activate venv
source $VENV_DIR/bin/activate

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Run the application
echo "Starting DJ RAG Backend..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
