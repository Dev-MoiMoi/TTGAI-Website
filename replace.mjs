import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssDir = path.join(__dirname, 'styles');
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

for (const file of files) {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.match(/#C5A059/ig)) {
    content = content.replace(/#C5A059/ig, '#BA7517');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Replaced colors in', file);
  }
}
