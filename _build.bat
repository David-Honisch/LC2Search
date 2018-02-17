@echo off
call _build.linux.bat
call _build.windows.bat
call _build.mac.bat
call _build.android.bat
pause
@echo on