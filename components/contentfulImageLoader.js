function contentfulUrl(src, width, quality, extraParameters = "") {
  const separator = src.includes("?") ? "&" : "?";

  return `${src}${separator}w=${width}&q=${
    quality || 72
  }&fm=webp${extraParameters}`;
}

export default function contentfulImageLoader({ src, width, quality }) {
  return contentfulUrl(src, width, quality);
}

export function contentfulPillImageLoader({ src, width, quality }) {
  const height = Math.round(width * 0.55);

  return contentfulUrl(
    src,
    width,
    quality,
    `&h=${height}&fit=fill&f=faces`
  );
}

export function contentfulSquareImageLoader({ src, width, quality }) {
  return contentfulUrl(src, width, quality, `&h=${width}&fit=fill&f=faces`);
}
