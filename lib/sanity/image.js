import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/lib/sanity/config";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = source => {
  if (!source || !source.asset) return null;

  // Caso 1: Esquema con `_ref`
  if (source.asset._ref) {
    const dimensions = source.asset._ref.split("-")[2];
    if (!dimensions) return null;

    const [width, height] = dimensions
      .split("x")
      .map(num => parseInt(num, 10));
    const url = imageBuilder
      .image(source)
      .auto("format")
      .width(Math.min(width, 2000))
      .url();

    return {
      src: url,
      width,
      height
    };
  }

  // Caso 2: Esquema con `asset.url`
  if (source.asset.url) {
    // Asumimos que ya contiene la URL completa de la imagen
    return {
      src: source.asset.url,
      width: null, // Opcional: si no tienes dimensiones exactas
      height: null // Opcional: si no tienes dimensiones exactas
    };
  }

  return null; // En caso de que no se cumpla ninguno de los dos esquemas
};
