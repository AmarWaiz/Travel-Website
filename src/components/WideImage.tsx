import { ClipImage } from "@/components/ClipImage";

interface WideImageProps {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Full-bleed 16:9 image band with a mono caption.
 * Every page carries one; journal articles carry two.
 */
export function WideImage({ src, alt, caption }: WideImageProps) {
  return (
    <figure>
      <ClipImage
        src={src}
        alt={alt}
        sizes="100vw"
        className="relative aspect-video w-full"
      />
      <figcaption className="container-x mono-label mt-3 text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
