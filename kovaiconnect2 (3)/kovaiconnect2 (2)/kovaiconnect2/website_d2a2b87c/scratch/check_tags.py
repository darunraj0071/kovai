import os
import re

files = ["index.html", "home.html", "education.html", "healthcare.html", "it.html", "manufacturing.html", "retail.html", "textiles.html"]
base_dir = r"c:\Users\acer\Downloads\website_d2a2b87c (2)\website_d2a2b87c"

for fname in files:
    path = os.path.join(base_dir, fname)
    if not os.path.exists(path):
        print(f"{fname} does not exist")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to trace <div> and </div> tags
    # Let's clean the HTML from comments first
    content_clean = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Let's find all tags of interest: <div, </div>, <header, </header>, <nav, </nav>, <main, </main>, <body, </body>
    tags = re.findall(r'</?(?:div|header|nav|main|body)\b[^>]*>', content_clean, re.IGNORECASE)
    
    print(f"\n--- Checking {fname} ---")
    stack = []
    errors = []
    
    for t in tags:
        is_closing = t.startswith('</')
        tag_name = re.match(r'</?([a-zA-Z0-9]+)', t).group(1).lower()
        
        if is_closing:
            if not stack:
                print(f"Error: Mismatched closing tag {t}")
                errors.append(t)
            else:
                pop_name, pop_tag = stack.pop()
                if pop_name != tag_name:
                    print(f"Error: Closing tag {t} mismatches opening tag {pop_tag}")
                    errors.append(t)
        else:
            stack.append((tag_name, t))
            
    if stack:
        print("Unclosed tags remaining on stack:")
        for name, tag in stack:
            print(f"  {tag}")
    else:
        if not errors:
            print("Perfect match!")
