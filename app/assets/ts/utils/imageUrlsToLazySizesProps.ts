import { styles, screenSizes } from '../../../templates/helpers/imageDefinitions';

type TImgProps = {
  srcSet: string;
  sizes: string;
  mobile?: {
    srcSet: string;
    sizes: string;
  }
};
const imageUrlsToLazySizesProps = (imageUrls: string[], style: string): TImgProps => {
  if (!imageUrls || imageUrls.length === 0) {
    return { srcSet: '', sizes: 'auto' };
  }

  const styleInfo = styles[style];
  if (!styleInfo) {
    console.error(`Image style ${style} is unknown.\nImageUrls: ${imageUrls}.\nAvailable styles: ${JSON.stringify(styles)}`);
    return { srcSet: '', sizes: 'auto' };
  }

  if (styleInfo.type === 'dynamic') {
    const widths = Object.keys(screenSizes).map((viewport) => {
      const screenSize = screenSizes[viewport];
      const sizesIndex = (viewport === 'mobile' || styleInfo.sizes.length === 1) ? 0 : 1;
      const percentageSize = styleInfo.sizes[sizesIndex];
      const size = [
        Math.round(screenSize[0] * percentageSize[0]),
        Math.round(screenSize[1] * percentageSize[1])
      ];
      return size[0];
    });

    console.log('test');

    return {
      mobile: {
        srcSet: imageUrls.slice(0, 1).map((imageUrl, index) => `${imageUrl} ${widths[index]}w`).join(', '),
        sizes: 'auto'
      },
      srcSet: imageUrls.slice(1).map((imageUrl, index) => `${imageUrl} ${widths[index + 1]}w`).join(', '),
      sizes: 'auto'
    };
  } else if (styleInfo.type === 'static') {
    const widths = [styleInfo.size[0], styleInfo.size[0] * 2];
    console.log('test');
    return {
      srcSet: `${imageUrls[0]} ${widths[0]}w, ${imageUrls[1]} ${widths[1]}w`,
      sizes: 'auto'
    };
  } else if (styleInfo.type === 'default') {
    const widths = [styleInfo.size[0]];
    console.log('test');
    return {
      srcSet: `${imageUrls[0]} ${widths[0]}w`,
      sizes: 'auto'
    };
  } else {
    console.error(`Image style "${style}" type "${styleInfo.type}" is unknown`);
    console.log('test');
    return { srcSet: '', sizes: 'auto' };
  }
};

export default imageUrlsToLazySizesProps;