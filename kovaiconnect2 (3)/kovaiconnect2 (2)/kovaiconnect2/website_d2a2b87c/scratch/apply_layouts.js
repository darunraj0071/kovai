const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..');

const mainPages = [
  'index.html',
  'home.html',
  'about.html',
  'contact.html',
  'register.html'
];

const categoryFiles = [
  'textiles.html',
  'it.html',
  'healthcare.html',
  'manufacturing.html',
  'education.html',
  'retail.html'
];

// Helper to generate the premium Browse Sectors HTML
function getBrowseSectorsHTML(isNested) {
  const prefix = isNested ? '../' : '';
  return `
      <!-- Browse Other Categories Section -->
      <section class="w-full py-16 px-6 bg-neutral-50 border-t border-neutral-100 flex flex-col items-center">
        <div class="max-w-[1200px] w-full text-center space-y-8">
          <div class="flex flex-col items-center text-center space-y-2">
            <h3 class="font-primary text-2xl md:text-3xl font-bold text-brand-dark">Explore Other Sectors</h3>
            <p class="text-sm md:text-base text-brand-dark/50 max-w-md">Browse through other verified industries and businesses in Coimbatore.</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
            <!-- Textiles -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/textiles_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Textiles"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">Textiles</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">Heritage spinning & yarn</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}textiles.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- IT -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/it_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="IT & Software"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">IT & Software</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">SaaS & tech innovations</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}it.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Healthcare -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/healthcare_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Healthcare"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">Healthcare</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">World-class clinical hubs</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}healthcare.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Manufacturing -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/manufacturing_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Manufacturing"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">Manufacturing</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">Pumps & precision tools</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}manufacturing.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Education -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/education_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Education"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">Education</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">Top institutions & research</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}education.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Retail -->
            <div class="relative group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-100 bg-white p-5 h-48 flex flex-col justify-between items-center text-center cursor-default">
              <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="w-12 h-12 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 mx-auto relative z-10">
                <img src="${prefix}images/retail_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Retail & Lifestyle"/>
              </div>
              <div class="relative z-10 text-center flex flex-col items-center justify-center flex-grow">
                <h4 class="font-primary text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">Retail</h4>
                <p class="text-[10px] text-brand-dark/50 group-hover:text-brand-dark/70 transition-colors mt-1.5 leading-tight">Luxury silks & shopping</p>
              </div>
              <div class="pt-2 border-t border-neutral-100 mt-2 w-full flex justify-center relative z-10">
                <a href="${prefix}retail.html" class="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider hover:opacity-80 flex items-center gap-1 transition-all duration-300">
                  Explore
                  <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>`;
}

// Helper to generate the clean, left-aligned footer HTML
function getFooterHTML(prefix) {
  return `
     <!-- Footer -->
     <footer class="bg-brand-primary text-white pt-20 pb-10 px-6">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
       <div class="space-y-3 flex flex-col items-center md:items-start">
        <h4 class="font-primary text-2xl font-bold tracking-tight">
         kovaiconnect.com
        </h4>
        <p class="text-white/80 max-w-sm text-sm leading-relaxed">
         Coimbatore's premier multi-service business directory connecting Kovai's finest industries with the people.
        </p>
       </div>
       <div class="space-y-3 flex flex-col items-center md:items-start">
        <h4 class="font-primary text-lg font-bold uppercase tracking-wider text-white/50">
         Quick Links
        </h4>
        <ul class="space-y-2 text-white/85 text-sm">
         <li>
          <a class="hover:text-white transition-colors" href="${prefix}index.html">
           Home
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="${prefix}index.html#categories">
           Categories
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="${prefix}about.html">
           About
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="${prefix}contact.html">
           Contact
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="${prefix}register.html">
           Register Business
          </a>
         </li>
        </ul>
       </div>
       <div class="space-y-3 flex flex-col items-center md:items-start">
        <h4 class="font-primary text-lg font-bold uppercase tracking-wider text-white/50">
         Follow Us
        </h4>
        <div class="flex items-center gap-3">
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors" href="#" aria-label="Facebook">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors" href="#" aria-label="Instagram">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 0 0 0 0-2.881z"/></svg>
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors" href="#" aria-label="YouTube">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white transition-colors" href="#" aria-label="X">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
         </a>
        </div>
       </div>
      </div>
      <div class="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-xs">
       <p>
        Copyright &copy; 2026 | Powered by JB Soft System
       </p>
      </div>
     </footer>`;
}

// Regex to find and replace footer block in static files
const footerRegex = /<!-- Footer -->[\s\S]*?<\/footer>/g;

// Regex to find and replace categories dropdown block in navbar
const dropdownRegex = /<div class="relative group">\s*<button class="nav-link-modern[^"]* flex items-center gap-1.5 py-2">[\s\S]*?<\/div>\s*<\/div>/g;

// 1. Process Main Pages
mainPages.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace footer
  content = content.replace(footerRegex, getFooterHTML(''));

  // Replace dropdown navbar
  content = content.replace(dropdownRegex, `  <a class="nav-link-modern" href="index.html#categories">Explore Categories</a>`);
  if (file === 'index.html' || file === 'home.html') {
    // Replace the entire category section with a clean, verified 6-card layout to avoid regex loop corruption
    content = content.replace(
      /<!-- SECTOR DIRECTORY SECTION -->[\s\S]*?<!-- Coimbatore Location Map Section -->/,
      `<!-- SECTOR DIRECTORY SECTION -->
      <section class="w-full py-16 md:py-24 px-6 flex flex-col items-center bg-neutral-50" id="categories">
       <div id="categories-section" class="max-w-[1200px] w-full">
         <div class="flex flex-col items-center text-center mb-16 px-6 animate-on-scroll-visible" data-animation-on-scroll="">
          <div class="w-16 h-1 bg-brand-primary mb-6"></div>
          <h2 class="font-primary text-3xl md:text-[44px] text-brand-dark tracking-tightest px-4 leading-tight">
           Explore Coimbatore by Sector
          </h2>
          <p class="text-brand-dark/50 mt-4 max-w-[600px] text-base md:text-lg px-4">
           Select a category below to browse verified businesses, access official portals, and connect with industry leaders.
          </p>
         </div>
        
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <!-- Textiles Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/textiles_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Textiles & Mills"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">Textiles & Mills</h3>
             <p class="card-premium-desc">Browse Kovai's heritage sector: spinning mills, cotton exports, and apparel manufacturers.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="textiles.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>

           <!-- IT & Software Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/it_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="IT & Software"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">IT & Software</h3>
             <p class="card-premium-desc">Discover Coimbatore's booming tech space: SaaS pioneers, delivery centers, and startups.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="it.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>

           <!-- Healthcare Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/healthcare_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Healthcare"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">Healthcare</h3>
             <p class="card-premium-desc">Find verified hospitals, research foundations, multi-specialty hubs, and diagnostic labs.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="healthcare.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>

           <!-- Manufacturing Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/manufacturing_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Manufacturing"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">Manufacturing</h3>
             <p class="card-premium-desc">Connect with pump brands, precision engineering firms, auto parts, and heavy industries.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="manufacturing.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>

           <!-- Education Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/education_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Education"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">Education</h3>
             <p class="card-premium-desc">Explore top engineering, arts, and science colleges, deemed universities, and research hubs.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="education.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>

           <!-- Retail & Lifestyle Card -->
           <div class="card-premium group" data-animation-on-scroll="">
             <div class="card-premium-image-container">
               <img src="images/retail_banner.png" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Retail & Lifestyle"/>
             </div>
             <h3 class="card-premium-title group-hover:text-brand-primary transition-colors duration-300">Retail & Lifestyle</h3>
             <p class="card-premium-desc">Find gold showrooms, designer silk boutiques, wedding textile malls, and shopping centers.</p>
             <div class="pt-4 border-t border-neutral-100 w-full flex justify-center">
               <a href="retail.html" class="btn-explore">
                 Explore
               </a>
             </div>
           </div>
          </div>
         </div>
        </section>
        
        <!-- Coimbatore Location Map Section -->`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated footer, padding, overlapping text, and icons in ${file}`);
});

// 2. Process Category Pages
categoryFiles.forEach(file => {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert "Explore Other Sectors" above the footer if not already present
  if (!content.includes('Explore Other Sectors')) {
    content = content.replace('<!-- Footer -->', getBrowseSectorsHTML(false) + '\n\n      <!-- Footer -->');
  } else {
    // If already there, replace the old sectors grid with updated layout
    const oldSectorsRegex = /<!-- Browse Other Categories Section -->[\s\S]*?<\/section>/g;
    content = content.replace(oldSectorsRegex, getBrowseSectorsHTML(false));
  }

  // Replace footer with clean left-aligned style
  content = content.replace(footerRegex, getFooterHTML(''));

  // Replace dropdown navbar
  content = content.replace(dropdownRegex, `  <a class="nav-link-modern" href="index.html#categories">Explore Categories</a>`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated footer and added other categories navigation in ${file}`);
});

// 3. Process generate_static_details.js script
const generatorScriptPath = path.join(targetDir, 'scratch', 'generate_static_details.js');
if (fs.existsSync(generatorScriptPath)) {
  let content = fs.readFileSync(generatorScriptPath, 'utf8');

  // Insert "Explore Other Sectors" above the footer in template
  if (!content.includes('Explore Other Sectors')) {
    content = content.replace('<!-- Footer -->', getBrowseSectorsHTML(true) + '\n\n     <!-- Footer -->');
  } else {
    const templateSectorsRegex = /<!-- Browse Other Categories Section -->[\s\S]*?<\/section>/g;
    content = content.replace(templateSectorsRegex, getBrowseSectorsHTML(true));
  }

  // Update footer in template
  content = content.replace(footerRegex, getFooterHTML('../'));

  // Replace dropdown navbar in template
  content = content.replace(dropdownRegex, `  <a class="nav-link-modern" href="../index.html#categories">Explore Categories</a>`);

  fs.writeFileSync(generatorScriptPath, content, 'utf8');
  console.log('Updated template in generate_static_details.js');
}

// 4. Run generator script to compile changes into all detail HTML pages
console.log('Re-compiling static business detail pages...');
execSync('node generate_static_details.js', { cwd: __dirname, stdio: 'inherit' });
console.log('Successfully completed all page updates!');
