const fs = require('fs');
const path = require('path');

const applyReplacements = (filepath, replacements) => {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');
  for (const [search, replace] of replacements) {
    // If search is a string, replace all using split/join to be safe
    if (typeof search === 'string') {
      content = content.split(search).join(replace);
    } else {
      content = content.replace(search, replace);
    }
  }
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Restored ${filepath}`);
};

const baseDir = path.join(__dirname, '../src');

// Home.tsx
applyReplacements(path.join(baseDir, 'pages/Home.tsx'), [
  ['max-w-7xl mx-auto grid', 'max-w-[1600px] mx-auto grid'], // Hero
  ['<section className="max-w-7xl mx-auto', '<section className="max-w-[1400px] mx-auto'], // Choreography
  ['<div className="max-w-7xl mx-auto', '<div className="max-w-[1400px] mx-auto'], // Curated
  ['text-base xl:text-xs', 'text-[11px] xl:text-xs'], // Button browse
  ['text-sm xl:text-xs', 'text-[10px] xl:text-xs'], // Issue 01
]);

// Navbar.tsx
applyReplacements(path.join(baseDir, 'components/Navbar.tsx'), [
  ['max-w-7xl', 'max-w-[1600px]'],
  ['text-base uppercase', 'text-[11px] uppercase'],
]);

// Shop.tsx
applyReplacements(path.join(baseDir, 'pages/Shop.tsx'), [
  ['max-w-7xl', 'max-w-[1400px]'],
]);

// Footer.tsx
applyReplacements(path.join(baseDir, 'components/Footer.tsx'), [
  ['max-w-7xl', 'max-w-[1400px]'],
]);

// Process.tsx
applyReplacements(path.join(baseDir, 'pages/Process.tsx'), [
  ['max-w-5xl', 'max-w-[1000px]'],
]);

// ListPiece.tsx
applyReplacements(path.join(baseDir, 'pages/ListPiece.tsx'), [
  ['max-w-5xl', 'max-w-[1000px]'],
]);

// Product.tsx
applyReplacements(path.join(baseDir, 'pages/Product.tsx'), [
  ['max-w-7xl', 'max-w-[1400px]'],
]);

// Dashboard.tsx
applyReplacements(path.join(baseDir, 'pages/Dashboard.tsx'), [
  ['max-w-7xl', 'max-w-[1200px]'],
]);

// Restore all text-sm uppercase -> text-[10px] uppercase
// Restore all text-xs uppercase -> text-[10px] uppercase (where it was originally 9px or 8px)
// Actually, let's just use regex across all files for the `text-` classes that I made too big.
const walk = (dir, callback) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  }
};

walk(baseDir, filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  // I originally changed:
  // text-[8px] -> text-xs
  // text-[9px] -> text-xs
  // text-[10px] -> text-sm
  // text-[11px] -> text-base
  
  // Now let's try to make them just standard readable small sizes without breaking buttons
  // But wait! If I just revert them to [9px], [10px], the user complained about them not being visible!
  // "i want proper sizing and the fonts to be visible."
  // So the user WANTS them visible, but 16px (text-base) was too big and broke the layout.
  // Let's settle on `text-[10px]` for the tiny ones, `text-[11px]` for medium ones, and `text-xs` (12px) for the navbar ones.
  // To do this simply without knowing the original:
  // Any `text-base uppercase` -> `text-xs uppercase` (makes it 12px instead of 16px, still visible but fits)
  // Any `text-sm uppercase` -> `text-[11px] uppercase`
  // Any `text-xs uppercase` -> `text-[10px] uppercase`
  content = content.replace(/text-base uppercase/g, 'text-xs uppercase');
  content = content.replace(/text-sm uppercase/g, 'text-[11px] uppercase');
  content = content.replace(/text-xs uppercase/g, 'text-[10px] uppercase');
  
  fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Done restoring logic.");
