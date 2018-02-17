@echo off
rem call npm i
rem call electron-packager . --overwrite
rem move LC2RateMyPosts-win32-x64 old
rem call electron-packager .
rem cd cordova
rem call cordova build --release android
rem call electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"
echo not supported up to now !!
pause
@echo on