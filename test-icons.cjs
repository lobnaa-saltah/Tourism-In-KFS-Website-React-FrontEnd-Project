const lucide = require('lucide-react');

const usedIcons = [
  'Phone', 'Search', 'ShieldAlert', 'Zap', 'Droplet', 'Flame', 'PhoneCall', 'Mail', 
  'Activity', 'Scale', 'Building2', 'ShoppingBag', 'Eye', 'HeartPulse', 'Hospital',
  'Building', 'Pill', 'Briefcase', 'Plane', 'GraduationCap', 'Gavel',
  'Leaf', 'Factory', 'Car', 'Baby', 'TrafficCone', 'Map', 'HelpCircle',
  'Accessibility', 'Users', 'AlertTriangle', 'PlusCircle'
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
  console.log("All icons exist!");
}
