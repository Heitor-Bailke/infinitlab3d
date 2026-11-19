import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappUrl } from "../content";

type WhatsAppPosition = "hero" | "meio" | "final" | "natal" | "produto" | "flutuante";

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  position: WhatsAppPosition;
  message?: string;
  href?: string;
};

function trackWhatsAppClick(position: WhatsAppPosition) {
  const detail = { event: "whatsapp_click", position };
  window.dispatchEvent(new CustomEvent("infinitylab:whatsapp-click", { detail }));

  const browserWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  browserWindow.dataLayer?.push(detail);
}

export function WhatsAppLink({
  children,
  position,
  message,
  href,
  onClick,
  className = "",
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      {...props}
      href={href ?? whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(event) => {
        trackWhatsAppClick(position);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
