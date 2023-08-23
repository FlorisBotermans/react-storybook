type TBannerProps = {
  linkText: string;
  linkUrl: string;
}

export type TCTAProps = {
  title: string;
  imageUrls: string[];
  imageUrlsStyle: 'CTA' | 'CTALarge';
  linkText: string;
  linkUrl: string;
  className?: string;
};

export type TCTASectionProps = {
  id?: string;
  banner: TBannerProps;
  blocks: TCTAProps[];
};