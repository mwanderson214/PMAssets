#!/bin/bash

echo "Starting PropWise Server..."

# Try Python 3 first
if command -v python3 &> /dev/null; then
    python3 server.py
# Then Python
elif command -v python &> /dev/null; then
    python server.py
# Then Node.js http-server
elif command -v npx &> /dev/null; then
    echo "Using Node.js http-server..."
    npx http-server -p 8000
# Then PHP
elif command -v php &> /dev/null; then
    echo "Using PHP built-in server..."
    php -S localhost:8000
else
    echo "Error: No suitable server found."
    echo "Please install Python 3, Node.js, or PHP."
    exit 1
fi
