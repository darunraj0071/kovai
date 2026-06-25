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

  // Replace listings grid render block
  const replacementCardCode = `listingsGrid.innerHTML = filtered.map(b => \`
           <div onclick="showBusinessDetails('\${encodeURIComponent(b.name)}')" class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-executive transition-all flex flex-col justify-between group cursor-pointer" data-animation-on-scroll>
             <div class="flex flex-col gap-2 mb-4">
               <h3 class="font-primary text-xl font-bold text-brand-dark line-clamp-2">\${b.name}</h3>
               <p class="text-sm text-brand-dark/80 line-clamp-2">\${b.desc}</p>
             </div>
           </div>
         \`).join('');`;

  const mapRegex = /listingsGrid\.innerHTML = filtered\.map[\s\S]*?\.join\(['"]{2}\);/g;

  if (content.match(mapRegex)) {
    const original = content;
    content = content.replace(mapRegex, replacementCardCode);
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully fixed listings card rendering in ${filename}`);
    } else {
      console.log(`No change made to listings cards in ${filename} (already updated?)`);
    }
  } else {
    console.log(`Error: Could not find listings map code block in ${filename}`);
  }
});
