// IMPORTANT: Always keep this file in sync with the backend images in \TrueLime.Kentico.Mvc.Models\Models\Images\ImageType.cs & ImageTypeInfos.cs

const mobile  = [1080, 1920];
const desktop = [1920, 1080];
const tablet  = [2732, 1536];

const screenSizes = {
  mobile: mobile,
  desktop: desktop,
  tablet: tablet
};

const styles = {
  'Header':         { type: 'static', size: [1170, 270] },
  'HeaderFallback': { type: 'static', size: [1170, 170] },
  'TopNavigationAccount': { type: 'static', size:  [26, 26] },
  'Anchor':         { type: 'dynamic', sizes: [ [1, .95], [1, .93] ] },
  'LinkBlock':      { type: 'dynamic', sizes: [ [1, .5], [.3, 1] ] },
  'Block':          { type: 'static',  size:  [348, 348] },
  'Card':           { type: 'static',  size:  [333, 170] },
  'CTA':            { type: 'dynamic', sizes: [ [1, .5], [.33, .5] ] },
  'CTALarge':       { type: 'dynamic', sizes: [ [1, .5], [.67, 1] ] },
  'CTAButton':      { type: 'static',  size:  [312, 312] },
  'TimelineSlide':  { type: 'dynamic', sizes: [ [500 / mobile[0], 200 / mobile[1]], [321 / desktop[0], 600 / desktop[1]] ] },
  'Exposition':     { type: 'dynamic', sizes: [ [1, .5], [.67, .75] ] },
  'SearchResult':   { type: 'static',  size:  [93, 83] },
  'Media':          { type: 'static',  size:  [940, 940] },
  'MediaSlide':     { type: 'static',  size:  [1248, 702] },
  'MediaSlideFull': { type: 'static',  size:  [1920, 1920] },
};

module.exports = {
  screenSizes: screenSizes,
  styles: styles
};