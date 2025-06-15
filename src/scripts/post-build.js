const fs = require('fs');
const path = require('path');

// Leggi il file index.html
const indexPath = path.join(__dirname, '../build/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Modifica i percorsi
indexContent = indexContent.replace(/\/static\//g, './static/');
indexContent = indexContent.replace(/\/manifest\.json/g, './manifest.json');
indexContent = indexContent.replace(/\/favicon\.ico/g, './favicon.ico');
indexContent = indexContent.replace(/\/logo192\.png/g, './logo192.png');

// Scrivi il file modificato
fs.writeFileSync(indexPath, indexContent);

console.log('Post-build script completed successfully!'); 