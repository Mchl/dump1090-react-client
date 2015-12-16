#!/bin/sh

webpack

cp ./node_modules/react/dist/react-with-addons.js ./dist/react-with-addons.js
cp ./sbs1.js ./dist/sbs1.js
cp ./node_modules/normalize.css/normalize.css ./dist/normalize.css
cp ./node_modules/leaflet/dist/leaflet.css ./dist/leaflet.css
cp ./style.css ./dist/style.css
sed 's/node_modules\/react\/dist\///' <index.html | \
  sed 's/node_modules\/normalize.css\///' | \
  sed 's/node_modules\/leaflet\/dist\///' | \
  sed 's/<script src="http:\/\/localhost:8090\/webpack-dev-server.js"><\/script>//' | \
  sed 's/http:\/\/localhost:8090\/assets\///' > ./dist/index.html

scp ./dist/* pi@192.168.0.12:/usr/share/dump1090-mutability/html/r
