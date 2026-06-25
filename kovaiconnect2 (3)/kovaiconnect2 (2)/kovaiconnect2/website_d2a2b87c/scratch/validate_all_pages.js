const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');

// Helper to recursively find all html files, ignoring node_modules if present
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules') return;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getHtmlFiles(rootDir);
console.log(`Found ${files.length} HTML files to validate recursively.`);

let totalErrors = 0;

files.forEach(filePath => {
  const fname = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Basic check of script blocks compiling
  const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptIndex = 0;
  
  while ((match = scriptRegex.exec(content)) !== null) {
    const jsCode = match[1].trim();
    if (!jsCode) continue;
    
    try {
      new vm.Script(jsCode);
    } catch (err) {
      console.log(`❌ JavaScript Syntax Error in ${fname} (Script block ${scriptIndex}):`);
      console.log(err.stack || err.message);
      totalErrors++;
    }
    scriptIndex++;
  }
  
  // 2. Basic Tag mismatch check (div, section, header, nav, main, body, html)
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, ''); // strip comments
  const tagRegex = /<\/?(div|section|header|nav|main|body|html)\b[^>]*>/gi;
  const tags = cleanContent.match(tagRegex) || [];
  
  const stack = [];
  let fileTagErrors = 0;
  
  tags.forEach(t => {
    const isClosing = t.startsWith('</');
    const tagNameMatch = t.match(/<\/?([a-zA-Z0-9]+)/);
    if (!tagNameMatch) return;
    const tagName = tagNameMatch[1].toLowerCase();
    
    if (isClosing) {
      if (stack.length === 0) {
        console.log(`❌ ${fname} Tag Error: Mismatched closing tag ${t}`);
        fileTagErrors++;
        totalErrors++;
      } else {
        const [popName, popTag] = stack.pop();
        if (popName !== tagName) {
          console.log(`❌ ${fname} Tag Error: Closing tag ${t} mismatches opening tag ${popTag}`);
          fileTagErrors++;
          totalErrors++;
        }
      }
    } else {
      stack.push([tagName, t]);
    }
  });
  
  if (stack.length > 0) {
    console.log(`❌ ${fname} Tag Error: Unclosed tags remaining on stack:`);
    stack.forEach(([name, tag]) => {
      console.log(`  ${tag}`);
    });
    totalErrors += stack.length;
  }
});

if (totalErrors === 0) {
  console.log(`\n✅ All ${files.length} HTML files are recursively validated and syntactically correct!`);
} else {
  console.log(`\n❌ Validation failed with ${totalErrors} error(s) total.`);
}
