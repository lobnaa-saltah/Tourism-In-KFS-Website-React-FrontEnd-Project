const lucide = require('lucide-react');

const usedIcons = [
  'LifeBuoy', 'Clock', 'CornerUpLeft', 'CheckCircle', 'Tag', 'Send', 'Ticket'
];

let missing = [];

for (const icon of usedIcons) {
  if (!lucide[icon]) {
    missing.push(icon);
  }
}

if (missing.length > 0) {
  console.log("Missing icons:", missing.join(', '));
  process.exit(1);
} else {
  console.log("All tech support icons exist!");
}
