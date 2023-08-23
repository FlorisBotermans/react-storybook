const { styles, screenSizes} = require('./imageDefinitions');

const adjustColor = (color, amount) => color.replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));

const colorSchemes = [
  '5f6f93',
  '4f5a88',
  '40467d',
  '303172',
]
.map(color => [
  color, 
  adjustColor(color, -25)
]);

const getImageUrl = (size, colorScheme = 0) => {
  const background = colorSchemes[colorScheme][0];
  const color = colorSchemes[colorScheme][1];
  const width = size[0];
  const height = size[1];
  const text = `${width}x${height}`;
  return `https://via.placeholder.com/${width}x${height}/${background}/${color}?text=${text}`;
};

const getDynamicImage = (percentageSizes, colorScheme) => {
  return Object.keys(screenSizes).map(viewport => {
    const screenSize = screenSizes[viewport];
    const sizesIndex = (viewport === 'mobile' || percentageSizes.length === 1) ? 0 : 1;
    const percentageSize = percentageSizes[sizesIndex];
    const size = [
      Math.round(screenSize[0] * percentageSize[0]),
      Math.round(screenSize[1] * percentageSize[1])
    ];
    return getImageUrl(size, colorScheme);
  });
};

const getStaticImage = (size, colorScheme) => {
  const width = size[0] || 1;
  const height = size[1] || 1;
  return [
    getImageUrl([width, height], colorScheme),
    getImageUrl([width * 2, height * 2], colorScheme)
  ];
};

const getDefaultImage = (size, colorScheme) => {
  const width = size[0] || 1;
  const height = size[1] || 1;
  return [
    getImageUrl([width, height], colorScheme)
  ];
};

const Image = (style, colorScheme) => {
  const styleInfo = styles[style];
  if(!styleInfo) {
    throw new Error(`Image style "${style}" is unknown`);
  }

  if(styleInfo.type === 'dynamic') {
    return getDynamicImage(styleInfo.sizes, colorScheme);
  } else if(styleInfo.type === 'static') {
    return getStaticImage(styleInfo.size, colorScheme);
  } else if(styleInfo.type === 'default') {
    return getDefaultImage(styleInfo.size, colorScheme);
  } else {
    throw new Error(`Image style "${style}" type "${styleInfo.type}" is unknown`);
  }
};

module.exports = {
  Image
}