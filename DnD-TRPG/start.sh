#!/bin/bash

# DnD TRPG - 啟動腳本 (macOS/Linux)

echo ""
echo "========================================"
echo "  DnD TRPG - 冒險之書"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "正在啟動本地服務器..."
echo ""

# 檢查 Python 3
if command -v python3 &> /dev/null; then
    echo "使用 Python 3 啟動服務器..."
    echo "遊戲將在 http://localhost:8000 打開"
    echo "按 Ctrl+C 停止服務器"
    echo ""
    python3 -m http.server 8000
    
# 檢查 Python 2
elif command -v python &> /dev/null; then
    echo "使用 Python 2 啟動服務器..."
    echo "遊戲將在 http://localhost:8000 打開"
    echo "按 Ctrl+C 停止服務器"
    echo ""
    python -m SimpleHTTPServer 8000
    
# 檢查 Node.js
elif command -v node &> /dev/null; then
    echo "使用 Node.js 啟動服務器..."
    echo "遊戲將在 http://localhost:8000 打開"
    npx http-server -p 8000
    
else
    echo ""
    echo "❌ 錯誤：未找到 Python 或 Node.js"
    echo ""
    echo "請選擇以下方式之一："
    echo "1. 使用 Homebrew 安裝 Python:"
    echo "   brew install python"
    echo "2. 安裝 Node.js: https://nodejs.org/"
    echo "3. 在瀏覽器中直接打開 index.html"
    echo ""
    exit 1
fi
