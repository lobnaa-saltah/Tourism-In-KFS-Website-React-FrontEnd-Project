import { useState } from 'react';

export const useImageGallery = (images) => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const nextImage = () => {
    if (!images || images.length === 0) return;
    setCurrentGalleryIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!images || images.length === 0) return;
    setCurrentGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return { currentGalleryIndex, nextImage, prevImage };
};
