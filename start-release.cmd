@echo off

start /wait /b "" cmd /c ".\node_modules\.bin\nvm-switch.cmd"
if errorlevel 1 exit /b 1;

npm run start-release