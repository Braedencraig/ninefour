export default function contentfulImageLoader({ src, width, quality }) {
  const separator = src.includes("?") ? "&" : "?";

  return `${src}${separator}w=${width}&q=${quality || 75}&fm=webp`;
}
