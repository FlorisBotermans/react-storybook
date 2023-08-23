export default function supportsCSS(property: string, value: string): boolean {
  const testElement = document.createElement('div');
  testElement.style.display = 'none';
  testElement.style.opacity = '0';
  testElement.style.position = 'absolute';
  testElement.style.pointerEvents = 'none';
  testElement.style[property] = value;
  document.body.appendChild(testElement);
  const supportsCSS = getComputedStyle(testElement)[property] === value;
  document.body.removeChild(testElement);
  return supportsCSS;
}
