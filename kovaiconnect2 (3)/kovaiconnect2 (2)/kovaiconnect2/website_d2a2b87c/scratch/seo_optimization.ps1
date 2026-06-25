# Define SEO metadata dictionary for all pages
$seoData = @{
    "index.html" = @{
        "title" = "Kovai Connect | Coimbatore's Definitive Business Directory"
        "desc" = "Explore Coimbatore's premier business directory. Find verified spinning mills, IT & software companies, top healthcare hubs, pump manufacturers, and educational institutions in Coimbatore."
        "keywords" = "Coimbatore business directory, Kovai business portal, textiles Coimbatore, IT companies in Coimbatore, hospitals in Coimbatore, pump manufacturers Coimbatore, top engineering colleges Coimbatore, Kovai Connect"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kovai Connect",
          "url": "https://kovaiconnect.com/",
          "description": "Coimbatore''s definitive multi-service business directory.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://kovaiconnect.com/index.html?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }'
    }
    "home.html" = @{
        "title" = "Kovai Connect | Coimbatore's Definitive Business Directory"
        "desc" = "Explore Coimbatore's premier business directory. Find verified spinning mills, IT & software companies, top healthcare hubs, pump manufacturers, and educational institutions in Coimbatore."
        "keywords" = "Coimbatore business directory, Kovai business portal, textiles Coimbatore, IT companies in Coimbatore, hospitals in Coimbatore, pump manufacturers Coimbatore, top engineering colleges Coimbatore, Kovai Connect"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Kovai Connect",
          "url": "https://kovaiconnect.com/",
          "description": "Coimbatore''s definitive multi-service business directory."
        }'
    }
    "about.html" = @{
        "title" = "About Us | Kovai Connect - Coimbatore's Business Directory"
        "desc" = "Learn about Kovai Connect, the leading business directory dedicated to indexing and verifying Coimbatore's major industries, textiles, IT software parks, and manufacturing plants."
        "keywords" = "about Kovai Connect, Coimbatore directory mission, Kovai industries, Coimbatore business index"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Kovai Connect",
          "description": "The mission, background, and goals of Coimbatore''s premier business directory."
        }'
    }
    "contact.html" = @{
        "title" = "Contact Us | Kovai Connect - Coimbatore's Business Directory"
        "desc" = "Get in touch with Kovai Connect support. Submit listing queries, locate our West Mambalam office, or reach us via phone or email."
        "keywords" = "contact Kovai Connect, Coimbatore directory support, Kovai business listing support"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Kovai Connect",
          "description": "Support channels and office locations for Coimbatore''s business directory."
        }'
    }
    "register.html" = @{
        "title" = "Register Business | Kovai Connect - Coimbatore's Business Directory"
        "desc" = "Add your business profile to Coimbatore's premier directory. Register your IT firm, textile mill, manufacturing plant, or local shop to gain high visibility."
        "keywords" = "register business Coimbatore, add local listing Kovai, business directory submission Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "RegisterAction",
          "name": "Register Business on Kovai Connect"
        }'
    }
    "textiles.html" = @{
        "title" = "Textiles & Spinning Mills in Coimbatore | Kovai Connect"
        "desc" = "Explore the heritage textile hub of Coimbatore. Find verified spinning mills, cotton yarn manufacturers, and garment exporters on Avinashi Road and Peelamedu."
        "keywords" = "textile mills Coimbatore, spinning mills Kovai, cotton yarn exporters Coimbatore, textile industry Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Textiles & Spinning Mills in Coimbatore",
          "description": "Directory listings for verified spinning mills and technical textiles in Coimbatore."
        }'
    }
    "it.html" = @{
        "title" = "IT & Software Companies in Coimbatore | Kovai Connect"
        "desc" = "Discover top IT parks, SaaS companies, and software services firms in Coimbatore. Browse tech leaders located in Saravanampatti and Avinashi Road."
        "keywords" = "IT companies Coimbatore, software firms Coimbatore, tech parks Kovai, SaaS startups Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "IT & Software Companies in Coimbatore",
          "description": "Directory listings for top IT parks, software hubs, and startups in Coimbatore."
        }'
    }
    "healthcare.html" = @{
        "title" = "Healthcare & Multi-specialty Hospitals in Coimbatore | Kovai Connect"
        "desc" = "Find world-class healthcare in Coimbatore. Explore multi-specialty hospitals, eye clinics, heart centers, and specialized research clinics."
        "keywords" = "hospitals Coimbatore, healthcare Kovai, top clinics Coimbatore, medical centers Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Healthcare & Multi-specialty Hospitals in Coimbatore",
          "description": "Directory listings for world-class medical facilities and hospitals in Coimbatore."
        }'
    }
    "manufacturing.html" = @{
        "title" = "Manufacturing & Precision Engineering in Coimbatore | Kovai Connect"
        "desc" = "Connect with Coimbatore's industrial base. Browse agricultural pump makers, domestic motor brands, CNC machinery manufacturers, and auto component suppliers."
        "keywords" = "manufacturing Coimbatore, pump manufacturers Coimbatore, CNC machine manufacturers Kovai, precision engineering Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Manufacturing & Precision Engineering in Coimbatore",
          "description": "Directory listings for pump brands, CNC components, and manufacturing companies in Coimbatore."
        }'
    }
    "education.html" = @{
        "title" = "Education & Top Colleges in Coimbatore | Kovai Connect"
        "desc" = "Explore top educational institutions in Coimbatore. Find deemed universities, top engineering colleges, arts & science schools, and research campuses."
        "keywords" = "colleges Coimbatore, engineering colleges Kovai, universities Coimbatore, best schools Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Education & Top Colleges in Coimbatore",
          "description": "Directory listings for verified deemed universities and colleges in Coimbatore."
        }'
    }
    "retail.html" = @{
        "title" = "Retail & Designer Silk Saree Showrooms in Coimbatore | Kovai Connect"
        "desc" = "Shop retail and lifestyle in Coimbatore. Find leading designer silk saree showrooms, luxury jewellery retailers, wedding malls, and shopping centers."
        "keywords" = "retail Coimbatore, silk saree showrooms Coimbatore, jewellery shops Kovai, shopping malls Coimbatore"
        "schema" = '{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Retail & Designer Silk Saree Showrooms in Coimbatore",
          "description": "Directory listings for silk saree showrooms and retail centers in Coimbatore."
        }'
    }
}

foreach ($fileName in $seoData.Keys) {
    if (Test-Path $fileName) {
        Write-Host "Optimizing SEO on $fileName..."
        $data = $seoData[$fileName]
        $content = Get-Content -Path $fileName -Raw
        
        $title = $data["title"]
        $desc = $data["desc"]
        $keywords = $data["keywords"]
        $schema = $data["schema"]
        
        # Build new head SEO layout
        $seoHeadBlock = @"
  <head>
   <meta charset="utf-8"/>
   <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
   <title>$title</title>
   
   <!-- SEO Metadata -->
   <meta name="description" content="$desc" />
   <meta name="keywords" content="$keywords" />
   <meta name="robots" content="index, follow" />
   <meta name="author" content="kovaiconnect.com" />
   <link rel="canonical" href="https://kovaiconnect.com/$fileName" />
   
   <!-- Open Graph / Facebook -->
   <meta property="og:type" content="website" />
   <meta property="og:title" content="$title" />
   <meta property="og:description" content="$desc" />
   <meta property="og:url" content="https://kovaiconnect.com/$fileName" />
   <meta property="og:image" content="https://kovaiconnect.com/images/og-image.jpg" />
   <meta property="og:site_name" content="Kovai Connect" />

   <!-- Twitter -->
   <meta property="twitter:card" content="summary_large_image" />
   <meta property="twitter:title" content="$title" />
   <meta property="twitter:description" content="$desc" />
   <meta property="twitter:image" content="https://kovaiconnect.com/images/og-image.jpg" />

   <!-- Structured Schema Markup (Google & AI Search) -->
   <script type="application/ld+json">
   $schema
   </script>

   <link href="https://fonts.googleapis.com" rel="preconnect"/>
   <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
   <link href="css/css2" rel="stylesheet"/>
"@
        
        # Replace original head structure up to CSS link
        $targetPattern = '(?s)<head>\s*<meta charset="utf-8"/>\s*<meta content="width=device-width, initial-scale=1.0" name="viewport"/>\s*<title>.*?</title>\s*<link href="https://fonts.googleapis.com" rel="preconnect"/>\s*<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>\s*<link href="css/css2" rel="stylesheet"/>'
        
        if ($content -match $targetPattern) {
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $targetPattern, $seoHeadBlock)
            Set-Content -Path $fileName -Value $content -NoNewline
            Write-Host "Successfully SEO optimized $fileName."
        } else {
            Write-Warning "Could not find matching head structure in $fileName."
        }
    }
}
