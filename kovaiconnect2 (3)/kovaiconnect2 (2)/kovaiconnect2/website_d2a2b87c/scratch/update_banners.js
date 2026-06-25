const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');

const filesToUpdate = {
  'index.html': {
    search: `#app-root .custom-hero-banner {\n      padding-top: 90px !important;\n      padding-bottom: 90px !important;\n    }`,
    replace: `#app-root .custom-hero-banner {\n      padding-top: 90px !important;\n      padding-bottom: 90px !important;\n      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/home_banner.png');\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n    }`
  },
  'home.html': {
    search: `#app-root .custom-hero-banner {\n      padding-top: 90px !important;\n      padding-bottom: 90px !important;\n    }`,
    replace: `#app-root .custom-hero-banner {\n      padding-top: 90px !important;\n      padding-bottom: 90px !important;\n      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/home_banner.png');\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n    }`
  },
  'about.html': {
    search: `#app-root .about-hero-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .about-hero-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/about_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'contact.html': {
    search: `#app-root .contact-hero-section {\n      padding-top: 108px !important;\n      padding-bottom: 56px !important;\n      background-color: #b91c1c !important;\n    }`,
    replace: `#app-root .contact-hero-section {\n      padding-top: 108px !important;\n      padding-bottom: 56px !important;\n      background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.7)), url('images/contact_banner.png');\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n    }`
  },
  'register.html': {
    search: `#app-root .register-hero-section {\n      padding-top: 108px !important;\n      padding-bottom: 56px !important;\n      background-color: #b91c1c !important;\n    }`,
    replace: `#app-root .register-hero-section {\n      padding-top: 108px !important;\n      padding-bottom: 56px !important;\n      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/register_banner.png');\n      background-size: cover;\n      background-position: center;\n      background-repeat: no-repeat;\n    }`
  },
  'textiles.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/textiles_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'it.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/it_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'healthcare.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/healthcare_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'manufacturing.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/manufacturing_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'education.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/education_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  },
  'retail.html': {
    search: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-color: #b91c1c !important;\n      }`,
    replace: `#app-root .submodule-search-section {\n        padding-top: 108px !important;\n        padding-bottom: 56px !important;\n        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.65)), url('images/retail_banner.png');\n        background-size: cover;\n        background-position: center;\n        background-repeat: no-repeat;\n      }`
  }
};

for (const [filename, config] of Object.entries(filesToUpdate)) {
  const filePath = path.join(targetDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Warning: ${filename} does not exist`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Normalize line endings to LF for consistent replacement
  const originalContent = content;
  content = content.replace(/\r\n/g, '\n');
  const searchNormalized = config.search.replace(/\r\n/g, '\n');
  const replaceNormalized = config.replace.replace(/\r\n/g, '\n');
  
  if (content.includes(searchNormalized)) {
    content = content.replace(searchNormalized, replaceNormalized);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filename}`);
  } else {
    // Try doing a line-by-line normalization search in case formatting is slightly different
    console.log(`Failed to find target block in ${filename} directly. Checking alternative formatting...`);
    // Let's do a more robust substring matching or warning
    const parts = searchNormalized.split('\n').map(p => p.trim());
    let matches = true;
    for (const part of parts) {
      if (part && !content.includes(part)) {
        matches = false;
        console.log(`  Missing snippet: "${part}"`);
      }
    }
  }
}
