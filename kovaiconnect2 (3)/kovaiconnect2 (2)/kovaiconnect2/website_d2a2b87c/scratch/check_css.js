const fs = require('fs');
const path = require('path');

const cssPath = "c:\\Users\\acer\\Downloads\\website_d2a2b87c (2)\\website_d2a2b87c\\css\\styles.css";
const content = fs.readFileSync(cssPath, 'utf8');

const classes = [
    'pointer-events-none',
    'inset-y-0',
    'pl-14',
    'pl-6',
    'absolute',
    'left-0',
    'flex',
    'items-center',
    'w-5',
    'h-5',
    'text-brand-dark/40',
    'w-full',
    'bg-white',
    'border',
    'border-neutral-200',
    'rounded-full',
    'h-14',
    'pr-6',
    'focus:outline-none',
    'focus:border-brand-primary/50',
    'focus:ring-1',
    'focus:ring-brand-primary/30',
    'shadow-sm',
    'transition-all',
    'text-brand-dark',
    'font-medium',
    'placeholder-neutral-400'
];

console.log("Checking class definitions in styles.css:\n");
classes.forEach(cls => {
    // Escape special characters for regex
    const escapedCls = cls.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Look for `#app-root .className` or similar pattern
    const regex = new RegExp(`\\.(${escapedCls})\\b|\\\\(${escapedCls})\\\\|\\.(${escapedCls})[:\\s]`, 'i');
    
    // Simple search in file
    const found = content.includes(cls) || regex.test(content);
    console.log(`${cls}: ${found ? "FOUND" : "NOT FOUND"}`);
});
