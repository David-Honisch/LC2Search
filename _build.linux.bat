@echo off
rem call electron-packager . lc2search --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
call npm run package-linux
pause
@echo on