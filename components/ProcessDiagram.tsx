/**
 * "Many into one" — the patient's journey drawn with one repeated shape:
 * loose scattered squares (documents at home) → a tight ribbon (we organise)
 * → even ordered rows in the accent colour (treatment, done).
 * Deterministic positions so server and client renders match.
 */

function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Sq = { x: number; y: number; fill: string; o?: number };

const S = 12; // square size

/* desktop: 4.5:1 — scatter left, ribbon middle, order right */
function buildWide() {
  const rand = makeRandom(1192483189);
  const scatter: Sq[] = [];
  for (let i = 0; i < 46; i++) {
    scatter.push({
      x: 18 + rand() * 350,
      y: 14 + rand() * 226,
      fill: i % 2 === 0 ? "#0a6ebd" : "#8fc0e8",
      o: 0.5,
    });
  }
  const ribbon: Sq[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 16; c++) {
      ribbon.push({ x: 460 + c * 18, y: 112 + r * 18, fill: "#0a6ebd" });
    }
  }
  const order: Sq[] = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      order.push({ x: 862 + c * 26, y: 52 + r * 26, fill: "#ff6b35" });
    }
  }
  return [...scatter, ...ribbon, ...order];
}

/* phone: 3:4 — scatter top, vertical ribbon, ordered rows bottom */
function buildTall() {
  const rand = makeRandom(1192483189);
  const scatter: Sq[] = [];
  for (let i = 0; i < 24; i++) {
    scatter.push({
      x: 16 + rand() * 260,
      y: 14 + rand() * 92,
      fill: i % 2 === 0 ? "#0a6ebd" : "#8fc0e8",
      o: 0.5,
    });
  }
  const ribbon: Sq[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 3; c++) {
      ribbon.push({ x: 132 + c * 18, y: 148 + r * 14, fill: "#0a6ebd" });
    }
  }
  const order: Sq[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      order.push({ x: 76 + c * 26, y: 300 + r * 20, fill: "#ff6b35" });
    }
  }
  return [...scatter, ...ribbon, ...order];
}

const WIDE = buildWide();
const TALL = buildTall();

export default function ProcessDiagram({ vertical = false }: { vertical?: boolean }) {
  const squares = vertical ? TALL : WIDE;
  return (
    <svg
      viewBox={vertical ? "0 0 300 400" : "0 0 1200 267"}
      className={vertical ? "mx-auto block h-auto w-full max-w-[280px]" : "block h-auto w-full"}
      role="img"
      aria-label=""
    >
      {squares.map((sq, i) => (
        <rect
          key={i}
          x={sq.x}
          y={sq.y}
          width={S}
          height={S}
          fill={sq.fill}
          fillOpacity={sq.o ?? 1}
        />
      ))}
    </svg>
  );
}
