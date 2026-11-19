import { useLayoutEffect } from "react";
import { gsap } from "gsap";

/** Pointer-only UI effects are not created on touch devices or for reduced-motion users. */
export function UiEffects() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 833px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
      const cleanups: Array<() => void> = [];

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((target) => {
        const moveX = gsap.quickTo(target, "x", { duration: 0.24, ease: "power2.out" });
        const moveY = gsap.quickTo(target, "y", { duration: 0.24, ease: "power2.out" });
        const onMove = (event: PointerEvent) => {
          const bounds = target.getBoundingClientRect();
          moveX((event.clientX - bounds.left - bounds.width / 2) * 0.14);
          moveY((event.clientY - bounds.top - bounds.height / 2) * 0.14);
          target.classList.add("is-magnetic");
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
          target.classList.remove("is-magnetic");
        };

        target.addEventListener("pointermove", onMove);
        target.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          target.removeEventListener("pointermove", onMove);
          target.removeEventListener("pointerleave", onLeave);
          gsap.killTweensOf(target, "x,y");
          target.classList.remove("is-magnetic");
          gsap.set(target, { x: 0, y: 0 });
        });
      });

      document.querySelectorAll<HTMLElement>("[data-tilt-card]").forEach((card) => {
        const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.22, ease: "power2.out" });
        const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.22, ease: "power2.out" });
        gsap.set(card, { transformPerspective: 900 });

        const onMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          tiltX(y * -2.4);
          tiltY(x * 2.4);
          card.classList.add("is-tilting");
        };
        const onLeave = () => {
          tiltX(0);
          tiltY(0);
          card.classList.remove("is-tilting");
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
          gsap.killTweensOf(card, "rotationX,rotationY");
          card.classList.remove("is-tilting");
          gsap.set(card, { rotationX: 0, rotationY: 0 });
        });
      });

      document.querySelectorAll<HTMLElement>("[data-product-rail]").forEach((rail) => {
        let pointerId: number | null = null;
        let startX = 0;
        let startScrollLeft = 0;
        let dragged = false;

        const onPointerDown = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          if ((event.target as HTMLElement).closest("a, button")) return;
          pointerId = event.pointerId;
          startX = event.clientX;
          startScrollLeft = rail.scrollLeft;
          dragged = false;
          rail.setPointerCapture(event.pointerId);
        };
        const onPointerMove = (event: PointerEvent) => {
          if (event.pointerId !== pointerId) return;
          const distance = event.clientX - startX;
          if (Math.abs(distance) > 4) {
            dragged = true;
            rail.classList.add("is-dragging");
            event.preventDefault();
          }
          rail.scrollLeft = startScrollLeft - distance;
        };
        const onPointerUp = (event: PointerEvent) => {
          if (event.pointerId !== pointerId) return;
          pointerId = null;
          rail.classList.remove("is-dragging");
          if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
          if (dragged) {
            window.setTimeout(() => { dragged = false; }, 250);
          }
        };
        const onClickCapture = (event: MouseEvent) => {
          if (!dragged) return;
          event.preventDefault();
          event.stopPropagation();
          dragged = false;
        };

        rail.addEventListener("pointerdown", onPointerDown);
        rail.addEventListener("pointermove", onPointerMove);
        rail.addEventListener("pointerup", onPointerUp);
        rail.addEventListener("pointercancel", onPointerUp);
        rail.addEventListener("click", onClickCapture, true);
        cleanups.push(() => {
          rail.removeEventListener("pointerdown", onPointerDown);
          rail.removeEventListener("pointermove", onPointerMove);
          rail.removeEventListener("pointerup", onPointerUp);
          rail.removeEventListener("pointercancel", onPointerUp);
          rail.removeEventListener("click", onClickCapture, true);
          rail.classList.remove("is-dragging");
        });
      });

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    return () => media.revert();
  }, []);

  return null;
}
