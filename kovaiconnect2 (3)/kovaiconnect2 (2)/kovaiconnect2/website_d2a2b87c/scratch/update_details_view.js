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

  // Search and replace code in detailsContent.innerHTML
  const searchPattern = `            detailsContent.innerHTML = \`
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full uppercase tracking-widest">\\\${b.loc}</span>
              </div>
              <h2 class="font-primary text-3xl md:text-4xl font-bold text-brand-dark">\\\${b.name}</h2>
              <p class="text-base md:text-lg text-brand-dark/70 leading-relaxed font-medium">\\\${b.desc}</p>
              
              <div class="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-4">
                <a href="\\\${b.link}" target="_blank" class="w-full sm:w-auto bg-brand-primary text-white text-center py-4 px-8 rounded-xl font-bold hover:opacity-90 transition-opacity">
                  Visit Official Website
                </a>
              </div>
            </div>
          \`;`;

  const replacementCode = `            detailsContent.innerHTML = \`
            <div class="space-y-6">
              <h2 class="font-primary text-3xl md:text-4xl font-bold text-brand-dark">\${b.name}</h2>
              <p class="text-base md:text-lg text-brand-dark/70 leading-relaxed font-medium">\${b.desc}</p>
              
              <div class="pt-6 border-t border-neutral-200 space-y-4">
                <h4 class="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">Additional Directory Details</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div class="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                    <span class="text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest block mb-1">Locality Area</span>
                    <span class="font-semibold text-brand-dark">\${b.loc}</span>
                  </div>
                  <div class="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                    <span class="text-[11px] font-bold text-brand-dark/40 uppercase tracking-widest block mb-1">Website URL</span>
                    <a href="\${b.link}" target="_blank" class="font-semibold text-brand-primary hover:underline break-all">\${b.link}</a>
                  </div>
                </div>
              </div>
            </div>
          \`;`;

  const regex = /detailsContent\.innerHTML = `[\s\S]*?Visit Official Website[\s\S]*?`;/g;

  if (content.match(regex)) {
    const original = content;
    content = content.replace(regex, replacementCode);
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated detailsContent rendering in ${filename}`);
    } else {
      console.log(`No change made to ${filename}`);
    }
  } else {
    console.log(`Error: Could not match detailsContent details view code in ${filename}`);
  }
});
