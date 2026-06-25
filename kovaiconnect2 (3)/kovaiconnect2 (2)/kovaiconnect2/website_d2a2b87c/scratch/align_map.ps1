$file = "contact.html"
Write-Host "Updating layout in $file to align map height..."
$content = Get-Content -Path $file -Raw

# 1. Insert CSS rules into the style tag
$styleTarget = '@media \(min-width: 768px\) \{\s*#app-root \.contact-hero-section \{\s*padding-top: 130px !important;\s*padding-bottom: 64px !important;\s*\}\s*\}'
$styleReplacement = @"
@media (min-width: 768px) {
      #app-root .contact-hero-section {
        padding-top: 130px !important;
        padding-bottom: 64px !important;
      }
      .contact-info-panel-flex {
        display: flex !important;
        flex-direction: column !important;
        height: 100% !important;
      }
      .contact-map-section-flex {
        display: flex !important;
        flex-direction: column !important;
        flex-grow: 1 !important;
        height: 100% !important;
      }
      .contact-map-wrapper-flex {
        flex-grow: 1 !important;
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
      }
      .contact-map-iframe-flex {
        border: 0 !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    }
"@

if ($content -match $styleTarget) {
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $styleTarget, $styleReplacement)
    Write-Host "Injected CSS classes successfully."
} else {
    Write-Warning "Could not inject CSS classes."
}

# 2. Update Right Column wrapper and Map section markup
# Find:
#         <!-- Right Column: Info Panel -->
#         <div class="space-y-8">
#
# Replace with:
#         <!-- Right Column: Info Panel -->
#         <div class="space-y-8 contact-info-panel-flex">
$content = $content -replace '<!-- Right Column: Info Panel -->\s*<div class="space-y-8">', '<!-- Right Column: Info Panel -->
        <div class="space-y-8 contact-info-panel-flex">'

# Find:
#           <!-- Our Location Map -->
#           <div class="space-y-4 pt-6 border-t border-neutral-100">
#             <h3 class="font-primary text-xl font-bold text-brand-primary">Our Location Map</h3>
#             <div class="w-full h-[400px] overflow-hidden border border-neutral-200 shadow-sm" style="height: 400px;">
#               <iframe src="https://www.google.com/maps/embed\?pb=[^"]+" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
#             </div>
#           </div>
#
# Replace with:
#           <!-- Our Location Map -->
#           <div class="space-y-4 pt-6 border-t border-neutral-100 contact-map-section-flex">
#             <h3 class="font-primary text-xl font-bold text-brand-primary mb-2">Our Location Map</h3>
#             <div class="w-full h-[300px] overflow-hidden border border-neutral-200 shadow-sm contact-map-wrapper-flex" style="height: 300px;">
#               <iframe class="contact-map-iframe-flex" src="https://www.google.com/maps/embed?pb=..." width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
#             </div>
#           </div>
$mapPattern = '(?s)<!-- Our Location Map -->\s*<div class="space-y-4 pt-6 border-t border-neutral-100">\s*<h3 class="font-primary text-xl font-bold text-brand-primary">Our Location Map</h3>\s*<div class="w-full h-\[400px\] overflow-hidden border border-neutral-200 shadow-sm" style="height: 400px;">\s*<iframe src="([^"]+)" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>\s*</div>\s*</div>'

$mapReplacement = @'
          <!-- Our Location Map -->
          <div class="space-y-4 pt-6 border-t border-neutral-100 contact-map-section-flex">
            <h3 class="font-primary text-xl font-bold text-brand-primary mb-2">Our Location Map</h3>
            <div class="w-full h-[300px] overflow-hidden border border-neutral-200 shadow-sm contact-map-wrapper-flex" style="height: 300px;">
              <iframe class="contact-map-iframe-flex" src="$1" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
'@

if ($content -match $mapPattern) {
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, $mapPattern, $mapReplacement)
    Write-Host "Updated map section markup successfully."
} else {
    Write-Warning "Could not find map section markup pattern."
}

Set-Content -Path $file -Value $content -NoNewline
Write-Host "Completed update."
