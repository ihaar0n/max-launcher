@echo off
chcp 65001 >nul
title Publicar actualización de MAX
cd /d "%~dp0"
echo.
echo   ===  Publicar una actualización de MAX en GitHub  ===
echo.
echo   Todos los launchers instalados la detectarán, avisarán de las novedades
echo   y se actualizarán solos.
echo.
node -v >nul 2>&1 || (echo   Falta Node.js. Instálalo desde https://nodejs.org & pause & exit /b 1)
for /f "tokens=2 delims=:, " %%v in ('findstr /c:"\"version\"" package.json') do set ACTUAL=%%~v
echo   Versión actual: %ACTUAL%
set /p NUEVA=  Nueva versión (la primera vez 1.0.0; luego 1.0.1, 1.1.0...): 
if "%NUEVA%"=="" (echo   No has escrito versión. & pause & exit /b 1)
call npm version %NUEVA% --no-git-tag-version --allow-same-version >nul || (echo   Versión no válida. Usa números como 1.7.0 & pause & exit /b 1)
echo.
echo   Se va a abrir NOVEDADES.md: escribe lo nuevo, guarda y cierra el Bloc de notas.
start /wait notepad NOVEDADES.md
echo.
echo   Pega tu token de GitHub (con permiso "repo") y pulsa Enter.
echo   No se guarda en ningún sitio: solo se usa ahora para subir la versión.
set /p GH_TOKEN=  Token: 
if "%GH_TOKEN%"=="" (echo   Sin token no se puede publicar. & pause & exit /b 1)
call npm install || (echo   Falló npm install. & pause & exit /b 1)
call npx electron-builder --win nsis --publish always -c.releaseInfo.releaseNotesFile=NOVEDADES.md || (echo. & echo   No se pudo publicar. Revisa el token y que exista el repositorio ihaar0n/max-launcher. & set GH_TOKEN= & pause & exit /b 1)
set GH_TOKEN=
echo.
echo   Listo: MAX %NUEVA% publicado. Los launchers la detectarán en menos de 30 minutos
echo   (o al abrirse). Recuerda poner también la versión en MAX Panel › Launcher si quieres
echo   que sea obligatoria.
pause
