import slugify from 'slugify';

export default function(value: string = null): string {
  if (!value) return '';
  return slugify(value, {
    lower: true
  });
}
