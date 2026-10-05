interface UnsplashLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom image loader: generates responsive srcsets directly against
 * images.unsplash.com (imgix params), bypassing the Next.js optimizer
 * upstream fetch. `remotePatterns` in next.config.ts still documents
 * the allowed host.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: UnsplashLoaderProps): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality ?? 75),
  });
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}${params.toString()}`;
}
