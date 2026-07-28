const fs = require('fs');
const path = require('path');

function getStructure(dir, level = 0) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      if (file === 'node_modules' || file === '.git') return;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const indent = "— ".repeat(level);
      
      if (stat && stat.isDirectory()) {
        results.push(`${indent}📁 ${file}/`);
        results = results.concat(getStructure(filePath, level + 1));
      } else {
        results.push(`${indent}📄 ${file}`);
      }
    });
  } catch (err) {
    results.push(`Erreur de lecture: ${err.message}`);
  }
  return results;
}

module.exports = (req, res) => {
  const rootDir = path.join(__dirname, '..');
  const tree = getStructure(rootDir);
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Structure du Dépôt Vercel</title>
      <style>
        body { font-family: monospace; background: #0f172a; color: #38bdf8; padding: 20px; line-height: 1.6; }
        h1 { color: #f43f5e; }
        pre { background: #1e293b; padding: 15px; border-radius: 10px; color: #f1f5f9; }
      </style>
    </head>
    <body>
      <h1>🔍 Exploration de la structure du projet</h1>
      <p>Voici l'arborescence exacte telle que Vercel la voit à la racine :</p>
      <pre>${tree.join('\n')}</pre>
    </body>
    </html>
  `);
};
