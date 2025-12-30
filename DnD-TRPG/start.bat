@echo off
REM DnD TRPG - 啟動腳本 (Windows)

echo.
echo ========================================
echo   DnD TRPG - 冒險之書
echo ========================================
echo.

cd /d "%~dp0"

echo 正在啟動本地服務器...
echo.

REM 檢查 Python
python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo 使用 Python 啟動服務器...
    echo 遊戲將在 http://localhost:8000 打開
    echo 按 Ctrl+C 停止服務器
    echo.
    python -m http.server 8000
) else (
    REM 檢查 Node.js
    node --version >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo 使用 Node.js 啟動服務器...
        echo 遊戲將在 http://localhost:8000 打開
        npx http-server -p 8000
    ) else (
        echo.
        echo ❌ 錯誤：未找到 Python 或 Node.js
        echo.
        echo 請選擇以下方式之一：
        echo 1. 安裝 Python: https://www.python.org/downloads/
        echo 2. 安裝 Node.js: https://nodejs.org/
        echo 3. 在瀏覽器中直接打開 index.html
        echo.
        pause
        exit /b 1
    )
)
