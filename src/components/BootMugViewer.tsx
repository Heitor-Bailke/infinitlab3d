import { PhotoAsset } from "./PhotoAsset";

type Props = {
  image: string;
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
};

export function BootMugViewer({ image, alt, className, loading = "lazy" }: Props) {
  return (
    <div className={`boot-mug-viewer ${className}`.trim()}>
      <PhotoAsset
        src={image}
        alt={alt}
        className="boot-mug-viewer__photo"
        loading={loading}
        fallbackLabel="[FOTO: caneca bota personalizada]"
      />
    </div>
  );
}
