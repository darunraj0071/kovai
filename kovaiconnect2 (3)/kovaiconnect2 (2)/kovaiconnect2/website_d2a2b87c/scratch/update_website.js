const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');

const files = [
  'index.html',
  'home.html',
  'about.html',
  'contact.html',
  'register.html',
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

// 1. Update advertisement removal on all pages
const adRegex = /<!-- Google Advertisement Banner -->[\s\S]*?<\/ins>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;

files.forEach(filename => {
  const filePath = path.join(targetDir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove advertisement box
  let updated = false;
  if (content.match(adRegex)) {
    content = content.replace(adRegex, '');
    updated = true;
  } else {
    // Try matching if the whitespace is slightly different
    const alternativeAdRegex = /<!-- Google Advertisement Banner -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
    if (content.match(alternativeAdRegex)) {
      content = content.replace(alternativeAdRegex, '');
      updated = true;
    }
  }

  // 2. Increase padding for banners on inner pages (not index.html or home.html)
  if (filename !== 'index.html' && filename !== 'home.html') {
    const originalContent = content;
    // Replace mobile padding
    content = content.replace(
      /padding-top:\s*108px\s*!important;\s*padding-bottom:\s*56px\s*!important;/g,
      'padding-top: 130px !important;\n        padding-bottom: 80px !important;'
    );
    // Replace desktop padding
    content = content.replace(
      /padding-top:\s*130px\s*!important;\s*padding-bottom:\s*64px\s*!important;/g,
      'padding-top: 180px !important;\n          padding-bottom: 110px !important;'
    );
    if (content !== originalContent) {
      updated = true;
    }
  }

  // 3. For category pages: card updates, details container injection, and routing logic
  if (categoryDataArrays[filename]) {
    const arrayName = categoryDataArrays[filename];
    
    // Check if details-view section is already present
    if (!content.includes('id="details-view"')) {
      const detailsSection = `
    <!-- Details View Section -->
    <section id="details-view" class="hidden w-full py-16 px-6 bg-white min-h-[400px] flex flex-col items-center">
      <div class="max-w-[800px] w-full">
        <button id="back-to-listings" class="group mb-8 text-sm font-bold text-brand-primary flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider">
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to Directory
        </button>
        <div id="details-content" class="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-100 shadow-sm space-y-8">
          <!-- Populated dynamically by javascript -->
        </div>
      </div>
    </section>
`;
      content = content.replace('</main>', detailsSection + '\n   </main>');
      updated = true;
    }

    // Refactor rendering loop to remove location/link from cards and add onclick
    const originalCardCode = `listingsGrid.innerHTML = filtered.map(b => \`
           <div class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-executive transition-all flex flex-col justify-between group" data-animation-on-scroll>
             <div class="flex flex-col gap-2 mb-4">
               <div class="text-[10px] font-bold text-brand-primary uppercase tracking-widest">\${b.loc}</div>
               <h3 class="font-primary text-xl font-bold text-brand-dark line-clamp-2">\${b.name}</h3>
               <p class="text-sm text-brand-dark/80 line-clamp-2">\${b.desc}</p>
             </div>
             <a href="\${b.link}" target="_blank" class="text-xs font-bold text-brand-primary flex items-center gap-2 group-hover:gap-3 transition-all">
               WEBSITE <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="2"/></svg>
             </a>
           </div>
         \`).join('');`;

    // Support single and double quote formatting variations in files
    const replacementCardCode = `listingsGrid.innerHTML = filtered.map(b => \`
           <div onclick="showBusinessDetails('\${encodeURIComponent(b.name)}')" class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-executive transition-all flex flex-col justify-between group cursor-pointer" data-animation-on-scroll>
             <div class="flex flex-col gap-2 mb-4">
               <h3 class="font-primary text-xl font-bold text-brand-dark line-clamp-2">\${b.name}</h3>
               <p class="text-sm text-brand-dark/80 line-clamp-2">\${b.desc}</p>
             </div>
           </div>
         \`).join('');`;

    if (content.includes('listingsGrid.innerHTML = filtered.map(b => `')) {
      content = content.replace(originalCardCode, replacementCardCode);
      updated = true;
    } else {
      // In case formatting varies slightly (e.g. mobile search comments/double quotes)
      const genericRegex = /listingsGrid\.innerHTML = filtered\.map[\s\S]*?\}\s*`\)\.join\(''\);/g;
      content = content.replace(genericRegex, replacementCardCode);
      updated = true;
    }

    // Append routing functions to event handler
    const originalInitCode = `// Setup Search Input Event\n      searchInput.addEventListener('input', (e) => {\n        renderListings(e.target.value);\n      });\n\n      // Initial Render\n      renderListings();\n    });`;
    
    const replacementInitCode = `// Setup Search Input Event
      searchInput.addEventListener('input', (e) => {
        renderListings(e.target.value);
      });

      // Initial Render
      renderListings();

      // Dynamic routing & details view logic
      const checkUrlRoute = () => {
        const params = new URLSearchParams(window.location.search);
        const bizName = params.get('biz');
        if (bizName) {
          const decoded = decodeURIComponent(bizName);
          const business = ${arrayName}.find(b => b.name === decoded);
          if (business) {
            renderDetailsPage(business);
            return;
          }
        }
        showMainListings();
      };

      const renderDetailsPage = (b) => {
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.parentElement) {
          searchInput.parentElement.classList.add('hidden');
        }
        const listingsGridSection = document.getElementById('listings-grid').parentElement.parentElement;
        if (listingsGridSection) {
          listingsGridSection.classList.add('hidden');
        }
        
        const detailsView = document.getElementById('details-view');
        const detailsContent = document.getElementById('details-content');
        if (detailsView && detailsContent) {
          detailsContent.innerHTML = \`
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full uppercase tracking-widest">\${b.loc}</span>
              </div>
              <h2 class="font-primary text-3xl md:text-4xl font-bold text-brand-dark">\${b.name}</h2>
              <p class="text-base md:text-lg text-brand-dark/70 leading-relaxed font-medium">\${b.desc}</p>
              
              <div class="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-4">
                <a href="\${b.link}" target="_blank" class="w-full sm:w-auto bg-brand-primary text-white text-center py-4 px-8 rounded-xl font-bold hover:opacity-90 transition-opacity">
                  Visit Official Website
                </a>
              </div>
            </div>
          \`;
          detailsView.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const showMainListings = () => {
        const searchInput = document.getElementById('search-input');
        if (searchInput && searchInput.parentElement) {
          searchInput.parentElement.classList.remove('hidden');
        }
        const listingsGridSection = document.getElementById('listings-grid').parentElement.parentElement;
        if (listingsGridSection) {
          listingsGridSection.classList.remove('hidden');
        }
        const detailsView = document.getElementById('details-view');
        if (detailsView) {
          detailsView.classList.add('hidden');
        }
      };

      window.showBusinessDetails = (name) => {
        history.pushState(null, '', '?biz=' + encodeURIComponent(name));
        checkUrlRoute();
      };

      const backBtn = document.getElementById('back-to-listings');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          history.pushState(null, '', window.location.pathname);
          checkUrlRoute();
        });
      }

      window.addEventListener('popstate', checkUrlRoute);
      checkUrlRoute();
    });`;

    if (content.includes('// Setup Search Input Event')) {
      // Clean up dynamic text space differences
      content = content.replace(
        /\/\/\s*Setup\s*Search\s*Input\s*Event[\s\S]*?renderListings\(\);\s*\}\);/g,
        replacementInitCode
      );
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated ${filename}`);
  } else {
    console.log(`No changes made to ${filename}`);
  }
});
