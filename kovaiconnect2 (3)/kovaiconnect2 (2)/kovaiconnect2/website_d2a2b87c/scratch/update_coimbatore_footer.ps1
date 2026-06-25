$baseDir = "c:\Users\acer\Downloads\website_d2a2b87c (2)\website_d2a2b87c"

$newCoimbatoreFooter = @'
     <!-- Footer -->
     <footer class="bg-brand-primary text-white py-20 px-6">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
       <div class="col-span-1 md:col-span-6 space-y-6">
        <h4 class="font-primary text-xl font-bold">
         Coimbatore.in
        </h4>
        <p class="text-white/80 max-w-xl text-sm leading-relaxed">
         Coimbatore's premier multi-service business directory connecting Kovai's finest industries with the people.
        </p>
       </div>
       <div class="col-span-1 md:col-span-3 space-y-6">
        <h4 class="font-primary text-xl font-bold">
         Quick Links
        </h4>
        <ul class="space-y-3 text-white/80 text-sm">
         <li>
          <a class="hover:text-white transition-colors" href="index.html">
           Home
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="about.html">
           About
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="#">
           Places to Visit
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="index.html#categories">
           Business Directory
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="#">
           Information Directory
          </a>
         </li>
         <li>
          <a class="hover:text-white transition-colors" href="contact.html">
           Contact
          </a>
         </li>
        </ul>
       </div>
       <div class="col-span-1 md:col-span-3 space-y-6">
        <h4 class="font-primary text-xl font-bold">
         Follow Us
        </h4>
        <div class="flex items-center gap-3">
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white text-xs font-bold transition-colors animate-on-scroll-visible" href="#">
          F
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white text-xs font-bold transition-colors animate-on-scroll-visible" href="#">
          I
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white text-xs font-bold transition-colors animate-on-scroll-visible" href="#">
          Y
         </a>
         <a class="w-8 h-8 rounded-full border border-white/30 hover:border-white flex items-center justify-center text-white text-xs font-bold transition-colors animate-on-scroll-visible" href="#">
          X
         </a>
        </div>
       </div>
      </div>
      <div class="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-xs">
       <p>
        Copyright &copy; 2026 | Powered by JB Soft System
       </p>
      </div>
     </footer>
'@

$htmlFiles = Get-ChildItem -Path $baseDir -Filter *.html
foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Replace any existing footer block with the new 3-column Coimbatore footer
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?i)<!-- Footer -->\s*<footer[\s\S]*?</footer>", $newCoimbatoreFooter)
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated footer in $($file.Name)"
}
