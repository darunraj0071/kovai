
const fs = require('fs');
const path = require('path');

const files = ["index.html", "home.html", "education.html", "healthcare.html", "it.html", "manufacturing.html", "retail.html", "textiles.html"];
const baseDir = "c:\\Users\\acer\\Downloads\\website_d2a2b87c (2)\\website_d2a2b87c";

files.forEach(fname => {
    const filePath = path.join(baseDir, fname);
    if (!fs.existsSync(filePath)) {
        console.log(`${fname} does not exist`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove comments
    content = content.replace(/<!--[\s\S]*?-->/g, '');

    // Match tags
    const tagRegex = /<\/?(div|header|nav|main|body)\b[^>]*>/gi;
    const tags = content.match(tagRegex) || [];

    console.log(`\n--- Checking ${fname} ---`);
    const stack = [];
    let errors = 0;

    tags.forEach(t => {
        const isClosing = t.startsWith('</');
        const tagNameMatch = t.match(/<\/?([a-zA-Z0-9]+)/);
        if (!tagNameMatch) return;
        const tagName = tagNameMatch[1].toLowerCase();

        if (isClosing) {
            if (stack.length === 0) {
                console.log(`Error: Mismatched closing tag ${t}`);
                errors++;
            } else {
                const [popName, popTag] = stack.pop();
                if (popName !== tagName) {
                    console.log(`Error: Closing tag ${t} mismatches opening tag ${popTag}`);
                    errors++;
                }
            }
        } else {
            stack.push([tagName, t]);
        }
    });

    if (stack.length > 0) {
        console.log("Unclosed tags remaining on stack:");
        stack.forEach(([name, tag]) => {
            console.log(`  ${tag}`);
        });
    } else if (errors === 0) {
        console.log("Perfect match!");
    }
});
