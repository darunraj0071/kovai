$files = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace normal navbar links (remove tracking-tight, add text-neutral-700)
    $content = $content -replace 'class="text-base font-semibold tracking-tight hover:text-brand-primary transition-colors"', 'class="text-base font-semibold text-neutral-700 hover:text-brand-primary transition-colors"'
    
    # Also handle Categories button if styled with tracking-tight
    $content = $content -replace 'class="text-base font-semibold tracking-tight hover:text-brand-primary transition-colors flex items-center gap-1 py-2"', 'class="text-base font-semibold text-neutral-700 hover:text-brand-primary transition-colors flex items-center gap-1 py-2"'
    
    # Replace active navbar links (remove tracking-tight)
    $content = $content -replace 'class="text-base font-semibold tracking-tight text-brand-primary hover:text-brand-primary transition-colors"', 'class="text-base font-semibold text-brand-primary hover:text-brand-primary transition-colors"'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
}
Write-Host "Navbar styling update complete across all HTML files."
