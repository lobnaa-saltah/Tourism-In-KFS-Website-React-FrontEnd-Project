export const highlightText = (text) => {
  if (!text) return text;
  const regex = /["«'](.*?)["»']/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <span key={index} className="text-gold">{part}</span>;
    }
    return part;
  });
};
