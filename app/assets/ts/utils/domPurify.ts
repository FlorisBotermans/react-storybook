import sanitizeHtml from 'sanitize-html';
import { getOptionalAnchorProps } from './anchorHelper';

const options = {
  allowedTags: ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'li', 'b', 'i', 'strong', 'em', 'strike', 'caption', 'code', 'hr', 'br', 'pre', 'iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'video'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
  allowedAttributes: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        ...getOptionalAnchorProps(attribs.href)
      }
    })
  }
};

export function purifyInnerHTML(html: string): { __html: string } {
  if (html) {
    html = html.replace(/\u0026nbsp;/g, ' ');
  }

  let clean;
  try {
    clean = sanitizeHtml(html, options);
  } catch (ex) {
    console.error('Failed to sanitize the html content. It might be unsafe:', ex);
    clean = `The html content is unsafe: ${ex.message}`;
  }
  return { __html: clean };
}

export function removeHTML(html: string): string {
  return sanitizeHtml(html, { });
}
