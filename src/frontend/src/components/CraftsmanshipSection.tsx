import { useEffect, useRef } from "react";

const panels = [
  {
    countTo: 500,
    suffix: "+",
    label: "Pieces Crafted",
    headline: "Our Craftsmanship",
    body: "Every stitch is an act of devotion. We obsess over detail so you never have to.",
    bg: "/assets/generated/lookbook-1.dim_800x1000.jpg",
  },
  {
    countTo: 12,
    suffix: "",
    label: "Years of Artisanship",
    headline: "Made by Artisans",
    body: "Passed-down techniques meet modern silhouettes, bridging generations of craft.",
    bg: "/assets/generated/lookbook-2.dim_800x1000.jpg",
  },
  {
    countTo: 100,
    suffix: "%",
    label: "Handfinished",
    headline: "Luxury Fabrics",
    body: "Italian crepe, hand-dyed georgette, and embroidered silk — sourced with intention.",
    bg: "/assets/generated/lookbook-3.dim_800x1000.jpg",
  },
  {
    countTo: 20,
    suffix: "+",
    label: "Artisans",
    headline: "Custom Tailoring",
    body: "Your measurements, your fit. A garment made only for you, never repeated.",
    bg: "/assets/generated/lookbook-4.dim_800x1000.jpg",
  },
];

function CounterPanel({
  panel,
  delay,
}: {
  panel: (typeof panels)[0];
  delay: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            el.style.transitionDelay = `${delay}s`;
            el.classList.add("visible");

            const counter = counterRef.current;
            if (!counter) return;
            const target = panel.countTo;
            const duration = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - (1 - progress) ** 3;
              counter.textContent = Math.round(eased * target) + panel.suffix;
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, panel.countTo, panel.suffix]);

  return (
    <div
      ref={panelRef}
      className="craft-panel reveal h-[300px] md:h-[400px] rounded-sm overflow-hidden cursor-default"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${panel.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <div className="mb-3">
          <span
            ref={counterRef}
            className="font-display text-5xl md:text-7xl font-light text-white/90"
          >
            0{panel.suffix}
          </span>
          <p className="text-xs uppercase tracking-widest text-white/50 font-sans mt-1">
            {panel.label}
          </p>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-light text-white uppercase tracking-wide-lg mb-2">
          {panel.headline}
        </h3>
        <p className="text-xs text-white/70 font-sans leading-relaxed max-w-xs">
          {panel.body}
        </p>
      </div>
    </div>
  );
}

export default function CraftsmanshipSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) el.classList.add("visible");
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="craftsmanship" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headingRef} className="reveal text-center mb-16">
          <p className="text-xs uppercase tracking-widest-xl text-gray-400 mb-3 font-sans">
            Where Art Meets Fabric
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-gray-900">
            The Art of Making
          </h2>
          <p className="text-sm text-gray-500 font-sans mt-4">
            Crafted with intention, worn with pride
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {panels.map((panel, i) => (
            <CounterPanel key={panel.headline} panel={panel} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
