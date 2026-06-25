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

const categoryDataArrays = {
  'textiles.html': 'textileBusinesses',
  'it.html': 'itBusinesses',
  'healthcare.html': 'healthBusinesses',
  'manufacturing.html': 'mfgBusinesses',
  'education.html': 'educationBusinesses',
  'retail.html': 'retailBusinesses'
};

categoryFiles.forEach(filename => {
  const filePath = path.join(targetDir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  const arrayName = categoryDataArrays[filename];

  // 1. Update search placeholder in HTML
  content = content.replace(
    /placeholder="Search by college name or location\.\.\."/g,
    'placeholder="Search by college name or keyword..."'
  );
  content = content.replace(
    /placeholder="Search by name or location \(e\.g\. Avinashi Road\)\.\.\."/g,
    'placeholder="Search by business name or keyword..."'
  );
  content = content.replace(
    /placeholder="Search by name or location\.\.\."/g,
    'placeholder="Search by name or keyword..."'
  );

  // 2. Update search filter logic (replace b.loc with b.desc in filter query)
  const searchFilterPattern = new RegExp(`const filtered = ${arrayName}\\.filter\\(b => \\s*b\\.name\\.toLowerCase\\(\\)\\.includes\\(cleanQuery\\) \\|\\| \\s*b\\.loc\\.toLowerCase\\(\\)\\.includes\\(cleanQuery\\)\\s*\\);`, 'g');
  const replacementFilter = `const filtered = ${arrayName}.filter(b => \n          b.name.toLowerCase().includes(cleanQuery) || \n          b.desc.toLowerCase().includes(cleanQuery)\n        );`;
  
  content = content.replace(searchFilterPattern, replacementFilter);

  // 3. Update detailsContent innerHTML to remove location and add comprehensive details
  const detailsRegex = /detailsContent\.innerHTML = `[\s\S]*?Visit Official Website[\s\S]*?`;/g;
  const detailsRegexAlt = /detailsContent\.innerHTML = `[\s\S]*?Website URL[\s\S]*?`;/g;

  const replacementDetails = `            detailsContent.innerHTML = \`
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full uppercase tracking-widest">Verified Directory Listing</span>
                <span class="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
              </div>
              <h2 class="font-primary text-3xl md:text-4xl font-bold text-brand-dark">\${b.name}</h2>
              <p class="text-base md:text-lg text-brand-dark/70 leading-relaxed font-medium">\${b.desc}</p>
              
              <div class="pt-6 border-t border-neutral-200 space-y-6">
                <h4 class="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">Company Profile & Directory Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div class="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-1">
                    <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">Listing Reference ID</span>
                    <span class="font-bold text-brand-dark">KC-COIMBATORE-\${Math.abs(b.name.split('').reduce((a,b)=>{a=(a<<5)-a+b.charCodeAt(0);return a&a},0)).toString(36).toUpperCase()}</span>
                  </div>
                  <div class="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-1">
                    <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">Website URL</span>
                    <a href="\${b.link}" target="_blank" class="font-bold text-brand-primary hover:underline break-all">\${b.link}</a>
                  </div>
                </div>
                
                <div class="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm space-y-3">
                  <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">Detailed Business Overview</span>
                  <p class="text-xs text-brand-dark/60 leading-relaxed">
                    \${b.name} is a premier entity headquartered in Coimbatore, Tamil Nadu, actively listed under the regional business registry directory. With a proven reputation in this sector, they are recognized for delivering reliable services and products aligned with modern industry benchmarks. For direct inquiries, official communications, or product catalogs, visitors are encouraged to access their verified website link directly.
                  </p>
                </div>
              </div>
            </div>
          \`;`;

  if (content.match(detailsRegex)) {
    content = content.replace(detailsRegex, replacementDetails);
  } else if (content.match(detailsRegexAlt)) {
    content = content.replace(detailsRegexAlt, replacementDetails);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated layout and search filtering in ${filename}`);
});
