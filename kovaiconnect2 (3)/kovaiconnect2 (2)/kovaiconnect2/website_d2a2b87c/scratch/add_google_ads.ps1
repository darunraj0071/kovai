# 1. Update Category Listing HTML files
$listingFiles = @("textiles.html", "it.html", "healthcare.html", "manufacturing.html", "education.html", "retail.html")

$adMarkupListing = @"
    <!-- Listings Grid Section -->
    <section class="w-full py-16 px-6 flex flex-col items-center bg-white">
     <!-- Google Advertisement Banner -->
     <div class="max-w-[1200px] w-full mb-12">
       <div class="bg-neutral-50 border border-neutral-200 p-4 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[90px] md:min-h-[120px] rounded-none">
         <span class="text-[9px] font-bold text-neutral-400 uppercase tracking-widest absolute top-2 right-4">Advertisement</span>
         <div class="w-full flex items-center justify-center">
           <ins class="adsbygoogle"
                style="display:inline-block;width:728px;height:90px"
                data-ad-client="ca-pub-placeholder"
                data-ad-slot="1234567890"></ins>
           <div class="flex flex-col md:flex-row items-center gap-4 text-brand-dark">
             <span class="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">Ad</span>
             <span class="text-sm font-semibold tracking-tight text-neutral-600">Grow Your Business Online with Coimbatore's #1 Digital Agency - JB Soft System</span>
             <a href="https://www.jbsoft.in" target="_blank" class="text-xs font-bold text-brand-primary border border-brand-primary px-3 py-1 hover:bg-brand-primary hover:text-white transition-colors">Learn More</a>
           </div>
         </div>
       </div>
     </div>

     <div class="max-w-[1200px] w-full">
"@

foreach ($file in $listingFiles) {
    if (Test-Path $file) {
        Write-Host "Adding Google Ads to $file..."
        $content = Get-Content -Path $file -Raw
        
        $target = '(?s)<!-- Listings Grid Section -->\s*<section class="w-full py-16 px-6 flex flex-col items-center bg-white">\s*<div class="max-w-\[1200px\] w-full">'
        
        if ($content -match $target) {
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $target, $adMarkupListing)
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "Successfully added ad to $file."
        } else {
            Write-Warning "Target pattern not found in $file."
        }
    }
}

# 2. Update Homepage (index.html and home.html)
$homepageFiles = @("index.html", "home.html")

$adMarkupHome = @"
      <!-- Google Advertisement Banner -->
      <div class="max-w-[1200px] w-full mx-auto my-8 px-6">
        <div class="bg-neutral-50 border border-neutral-200 p-4 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[90px] md:min-h-[120px] rounded-none">
          <span class="text-[9px] font-bold text-neutral-400 uppercase tracking-widest absolute top-2 right-4">Advertisement</span>
          <div class="w-full flex items-center justify-center">
            <ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="ca-pub-placeholder"
                 data-ad-slot="1234567890"></ins>
            <div class="flex flex-col md:flex-row items-center gap-4 text-brand-dark">
              <span class="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">Ad</span>
              <span class="text-sm font-semibold tracking-tight text-neutral-600">Grow Your Business Online with Coimbatore's #1 Digital Agency - JB Soft System</span>
              <a href="https://www.jbsoft.in" target="_blank" class="text-xs font-bold text-brand-primary border border-brand-primary px-3 py-1 hover:bg-brand-primary hover:text-white transition-colors">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Coimbatore Location Map Section -->
"@

foreach ($file in $homepageFiles) {
    if (Test-Path $file) {
        Write-Host "Adding Google Ads to $file..."
        $content = Get-Content -Path $file -Raw
        
        $target = '<!-- Coimbatore Location Map Section -->'
        
        if ($content -match $target) {
            $content = $content -replace $target, $adMarkupHome
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "Successfully added ad to $file."
        } else {
            Write-Warning "Target pattern not found in $file."
        }
    }
}

Write-Host "Google Ads integration script completed."
