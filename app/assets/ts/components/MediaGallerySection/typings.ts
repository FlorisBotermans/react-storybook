export type TMediaGallerySectionProps = {
  id?: string;
  items: Media[];
  prevSlideText?: string;
  nextSlideText?: string;
};

type Media = {
  type: 'video' | 'image';
  videoUrl?: string;
  imageUrls?: string[];
  imageSize?: {
    width: number;
    height: number;
  };
  imageUrlsFull?: string[];
  imageSizeFull?: {
    width: number;
    height: number;
  };
  alt?: string;
  title?: string;
  description?: string;
  showTitle : boolean;
};

export type TVideoSlideProps = {
  videoUrl?: string;
  posterImageUrls?: string[];
  alt?: string;
  active: boolean;
  autoplay?: boolean;
  inOverlay?: boolean;
}