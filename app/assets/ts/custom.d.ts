interface SVG extends React.SVGAttributes<SVGElement> {
  title?: string;
}

declare module '*.svg' {
  const content: React.FunctionComponent<SVG>;
  export default content;
}
