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

  // Regex to match detailsContent.innerHTML content
  const detailsRegex = /detailsContent\.innerHTML = `[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;/g;

  const replacementDetails = `            detailsContent.innerHTML = \`
            <div class="space-y-8 text-left">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full uppercase tracking-widest">Verified Directory Listing</span>
                <span class="text-xs font-bold bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full uppercase tracking-widest">Active Status</span>
              </div>
              
              <div class="space-y-4">
                <h2 class="font-primary text-3xl md:text-[40px] font-bold text-brand-dark leading-tight">\${b.name}</h2>
                <p class="text-lg md:text-xl text-brand-dark/75 leading-relaxed font-medium">\${b.desc}</p>
              </div>
              
              <div class="pt-8 border-t border-neutral-200 space-y-6">
                <h4 class="text-sm font-bold text-brand-dark/50 uppercase tracking-widest">Company Profile & Directory Information</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-2">
                    <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Listing Reference ID</span>
                    <span class="text-base font-bold text-brand-dark block">KC-COIMBATORE-\${Math.abs(b.name.split('').reduce((a,b)=>{a=(a<<5)-a+b.charCodeAt(0);return a&a},0)).toString(36).toUpperCase()}</span>
                  </div>
                  <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-2">
                    <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Website URL</span>
                    <a href="\${b.link}" target="_blank" class="text-base font-bold text-brand-primary hover:underline break-all block">\${b.link}</a>
                  </div>
                </div>
                
                <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-3">
                  <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest block">Detailed Business Overview</span>
                  <p class="text-sm md:text-base text-brand-dark/65 leading-relaxed text-left">
                    \${b.name} is a premier entity headquartered in Coimbatore, Tamil Nadu, actively listed under the regional business registry directory. With a proven reputation in this sector, they are recognized for delivering reliable services and products aligned with modern industry benchmarks. For direct inquiries, official communications, or product catalogs, visitors are encouraged to access their verified website link directly.
                  </p>
                </div>
              </div>
            </div>
          \`;`;

  if (content.match(detailsRegex)) {
    const original = content;
    content = content.replace(detailsRegex, replacementDetails);
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated font sizes and text alignment in ${filename}`);
    } else {
      console.log(`No change made to ${filename}`);
    }
  } else {
    console.log(`Error: Could not match detailsContent block in ${filename}`);
  }
});
