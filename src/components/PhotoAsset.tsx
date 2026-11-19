import { useState } from "react";

type PhotoAssetProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fallbackLabel?: string;
};

export function PhotoAsset({
  src,
  alt,
  className = "",
  loading = "lazy",
  fallbackLabel,
}: PhotoAssetProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const placeholderLabel = src.startsWith("[FOTO:") ? src : fallbackLabel ?? `[FOTO: ${alt}]`;
  const imageSource = src.startsWith("/") ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;

  if (src.startsWith("[FOTO:") || failedSource === src) {
    return (
      <div
        className={`photo-placeholder ${className}`.trim()}
        role="img"
        aria-label={placeholderLabel}
      >
        <span className="photo-placeholder__mark" aria-hidden="true">
          <span />
          <span />
        </span>
        <span className="photo-placeholder__copy">{placeholderLabel}</span>
      </div>
    );
  }

  return (
    <div className={`photo-frame ${className}`.trim()}>
      <img src={imageSource} alt={alt} loading={loading} decoding="async" onError={() => setFailedSource(src)} />
    </div>
  );
}
