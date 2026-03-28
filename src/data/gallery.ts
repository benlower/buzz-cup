import type { ImageMetadata } from 'astro';

export interface GalleryPhoto {
  src: ImageMetadata;
  alt: string;
  caption: string;
}
