"use client";
import { PortableText } from "@/lib/sanity/plugins/portabletext";

interface SynopsisBodyProps {
  value: any;
}

export default function SynopsisBody({ value }: SynopsisBodyProps) {
  if (!value) return null;

  return (
    <article className="prose md:mt-6 mt-4 w-full break-words dark:prose-invert prose-a:text-blue-600">
      <PortableText value={value} />
    </article>
  );
}
