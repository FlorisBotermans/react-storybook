export type TMediaSectionProps = {
  id?: string;
  type: 'video' | 'image';
  videoUrl?: string;
  imageUrls?: string[];
  alt?: string;
  description?: string;
  credits?: string;
  linkUrl?: string;
};

export type TImageProps = {
  imageUrls: string[];
  alt?: string;
}
