import { Lottie } from "lottie-react";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const drawings = [
  [[[-18, -12], [18, -12]], [[-14, 0], [14, 0]], [[-10, 12], [10, 12]]],
  [[[-16, 14], [12, -14], [19, -7], [-9, 20], [-18, 22], [-16, 14]], [[8, -18], [16, -10]]],
  [[[-18, -16], [18, -16], [18, 11], [-18, 11], [-18, -16]], [[-10, 18], [10, 18]], [[0, 11], [0, 18]]],
  [[[-17, -17], [17, -17], [17, 17], [-17, 17], [-17, -17]], [[-8, 0], [-2, 6], [9, -7]]],
  [[[-18, -12], [8, -12], [8, -19], [18, -7], [8, 3], [8, -4], [-18, -4], [-18, -12]], [[-12, 5], [12, 5], [18, 13], [-18, 13], [-12, 5]]],
];

function pathShape(points: number[][], index: number) {
  return {
    ty: "sh",
    ks: { a: 0, k: { i: points.map(() => [0, 0]), o: points.map(() => [0, 0]), v: points, c: false } },
    nm: `Traço ${index + 1}`,
    hd: false,
  };
}

function animationData(index: number) {
  const paths = drawings[index] ?? drawings[0];
  return {
    v: "5.7.4", fr: 30, ip: 0, op: 48, w: 64, h: 64, nm: `Etapa ${index + 1}`, ddd: 0, assets: [],
    layers: [{
      ddd: 0, ind: 1, ty: 4, nm: "Ícone linear", sr: 1,
      ks: {
        o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [
          { t: 0, s: [94, 94, 100], e: [100, 100, 100], o: { x: 0.33, y: 0 }, i: { x: 0.67, y: 1 } },
          { t: 24, s: [100, 100, 100], e: [94, 94, 100], o: { x: 0.33, y: 0 }, i: { x: 0.67, y: 1 } },
          { t: 48, s: [94, 94, 100] },
        ] },
      }, ao: 0,
      shapes: [{ ty: "gr", it: [
        ...paths.map(pathShape),
        { ty: "st", c: { a: 0, k: [0.298, 0.553, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 2.2 }, lc: 2, lj: 2, ml: 4, nm: "Traço azul", hd: false },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, nm: "Transform" },
      ], nm: "Desenho", np: paths.length + 1, cix: 2, bm: 0, ix: 1, hd: false }],
      ip: 0, op: 48, st: 0, bm: 0,
    }],
  };
}

type Props = { index: number; active: boolean };

export function ProcessLottieIcon({ index, active }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const data = useMemo(() => animationData(index), [index]);

  return (
    <span className="process-step__lottie" aria-hidden="true">
      <Lottie
        src={data}
        autoplay={!reducedMotion && active}
        loop={!reducedMotion && active}
        renderer="svg"
        className="process-step__lottie"
      />
    </span>
  );
}
