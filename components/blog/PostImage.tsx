"use client";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface PostImageProps {
  image: any;
  alt?: string;
}

export default function PostImage({ image, alt }: PostImageProps) {
  const imageProps = image ? urlForImage(image) : null;

  if (!imageProps) return null;

  return (
    <div className="rounded-lg relative z-0 aspect-video w-full overflow-hidden lg:rounded-lg">
      <Image
        src={imageProps.src}
        alt={alt || "Thumbnail"}
        loading="eager"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
