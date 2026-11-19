import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

const AnimatedIcon = lazy(() =>
  import("./ProcessLottieIcon").then(({ ProcessLottieIcon }) => ({ default: ProcessLottieIcon })),
);

type Props = { index: number; fallback: LucideIcon };

export function LazyProcessLottieIcon({ index, fallback: FallbackIcon }: Props) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const [loadAnimation, setLoadAnimation] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = iconRef.current;
    if (!element) return;
    const Observer = (window as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
    if (!Observer) {
      setLoadAnimation(true);
      setActive(true);
      return;
    }
    const observer = new Observer(([entry]) => {
      setActive(entry.isIntersecting);
      if (entry.isIntersecting) setLoadAnimation(true);
    }, { rootMargin: "80px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={iconRef} className="process-step__icon" aria-hidden="true">
      {!loadAnimation ? (
        <FallbackIcon size={22} strokeWidth={1.5} />
      ) : (
        <Suspense fallback={<FallbackIcon size={22} strokeWidth={1.5} />}>
          <AnimatedIcon index={index} active={active} />
        </Suspense>
      )}
    </span>
  );
}
