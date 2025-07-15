@echo off
cd /d "C:\Users\user7\Desktop\prerna"

echo Checking and installing required Node.js packages...
npm install express >nul

echo Starting Prerna App Server...
start http://localhost:3000
node server.js
