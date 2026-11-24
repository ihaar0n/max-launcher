@echo off
chcp 65001 >nul
title Crear MAX
cd /d "%~dp0"
echo.
echo   Creando el instalador de MAX...
echo.
node -v >nul 2>&1 || (echo   Falta Node.js. Instalalo desde https://nodejs.org y vuelve a abrir este archivo. & pause & exit /b 1)
call npm install || (echo   Fallo npm install. & pause & exit /b 1)
call npm run crear || (echo   Fallo al crear el instalador. & pause & exit /b 1)
echo.
echo   Listo. Abre el instalador de la carpeta "instalador".
start "" "%~dp0instalador"
pause
