@echo off
if exist .\node_modules\uui-framework\ RMDIR /S .\node_modules\uui-framework 
npm install -g grunt-cli && npm install && cd node_modules && git clone https://git.epam.com/epm-uui/uui-framework.git && cd uui-framework && npm install --force && grunt uui && cd ../.. && run.bat