const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');

const categoryFiles = [
  'textiles.html',
  'it.html',
  'healthcare.html',
  'manufacturing.html',
  'education.html',
  'retail.html'
];

categoryFiles.forEach(filename => {
  const filePath = path.join(targetDir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace from renderListings(); up to </script>
  // We want:
  //       renderListings();
  //     });
  //   </script>
  
  const badScriptBlockRegex = /renderListings\(\);\s*[\s\S]*?\s*<\/script>/;
  const cleanScriptReplacement = `renderListings();\n    });\n  </script>`;
  
  if (badScriptBlockRegex.test(content)) {
    content = content.replace(badScriptBlockRegex, cleanScriptReplacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully cleaned up script syntax in ${filename}`);
  } else {
    console.log(`Could not find target script block to clean up in ${filename}`);
  }
});
console.log('Cleanup finished!');
