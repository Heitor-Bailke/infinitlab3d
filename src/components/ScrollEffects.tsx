import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Scroll motion is opt-in by media query; reduced-motion users get the full static layout. */
export function ScrollEffects() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 833px)",
      },
      ({ conditions }) => {
        if (conditions?.reduceMotion) return;

        const scope = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((target) => {
            gsap.fromTo(
              target,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: target,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-scroll-reveal-group]").forEach((group) => {
            const items = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal-item]", group);
            if (!items.length) return;

            gsap.fromTo(
              items,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.08,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: group,
                  start: "top 86%",
                  once: true,
                },
              },
            );
          });

          const manifesto = document.querySelector<HTMLElement>("#manifesto-title");
          const manifestoWords = manifesto?.querySelectorAll<HTMLElement>(".manifesto-word");
          if (manifesto && manifestoWords?.length) {
            gsap.fromTo(
              manifestoWords,
              { autoAlpha: 0.16, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.07,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: manifesto,
                  start: "top 82%",
                  end: "bottom 48%",
                  scrub: true,
                },
              },
            );
          }

          if (conditions?.desktop) {
            const hero = document.querySelector<HTMLElement>(".hero");
            const heroLayers = gsap.utils.toArray<HTMLElement>("[data-hero-parallax]");
            if (hero && heroLayers.length) {
              heroLayers.forEach((layer) => {
                const depth = Number(layer.dataset.heroParallax ?? 0);
                gsap.to(layer, {
                  y: () => -window.innerHeight * depth * 0.16,
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                });
              });
            }

          }
        });

        let lenis: Lenis | null = null;
        let updateLenis: ((time: number) => void) | null = null;
        if (conditions?.desktop) {
          lenis = new Lenis({ autoRaf: false });
          lenis.on("scroll", ScrollTrigger.update);
          updateLenis = (time) => lenis?.raf(time * 1000);
          gsap.ticker.add(updateLenis);
          gsap.ticker.lagSmoothing(0);
        }

        return () => {
          scope.revert();
          if (lenis) {
            lenis.off("scroll", ScrollTrigger.update);
            lenis.destroy();
          }
          if (updateLenis) gsap.ticker.remove(updateLenis);
        };
      },
    );

    return () => media.revert();
  }, []);

  return null;
}
