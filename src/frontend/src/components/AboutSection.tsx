import { useReveal } from "../hooks/useReveal";

const values = [
  {
    title: "Craftsmanship",
    desc: "Each piece hand-finished with precision and care",
  },
  {
    title: "Quality Fabrics",
    desc: "Italian crepe and luxury textiles, sourced with intent",
  },
  {
    title: "Custom Fits",
    desc: "Tailored perfectly to your unique measurements",
  },
  {
    title: "Timeless Design",
    desc: "Pieces you'll wear again and again, season after season",
  },
];

const valueDelays = ["0s", "0.12s", "0.24s", "0.36s"];

function ValueBox({
  title,
  desc,
  delay,
}: { title: string; desc: string; delay: string }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal p-6 bg-white"
      style={{ transitionDelay: delay }}
    >
      <h3 className="font-display text-lg uppercase tracking-wide text-off-black mb-2">
        {title}
      </h3>
      <p className="text-xs text-warm-gray font-sans leading-relaxed">{desc}</p>
    </div>
  );
}

export default function AboutSection() {
  const leftRef = useReveal();

  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[#F5F0EA] relative overflow-hidden"
    >
      {/* Top blend */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FAF8F5, #F5F0EA)" }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left text */}
          <div ref={leftRef} className="reveal">
            <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-4 font-sans">
              Our Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light uppercase tracking-wide-lg text-off-black mb-8 leading-none">
              The Brand
            </h2>
            <p className="text-warm-gray font-sans font-light leading-relaxed mb-6">
              Label Radhika Chandna is where sophisticated femininity meets
              sartorial savvy. We craft each piece with the finest Italian crepe
              fabrics, intricate floral embroidery, and impeccable tailoring —
              transforming you for every occasion.
            </p>
            <p className="text-warm-gray font-sans font-light leading-relaxed mb-8">
              From timeless casual wear to opulent festive ensembles and custom
              bridal pieces, every creation embodies our promise of skilled
              craftsmanship and enduring elegance. We believe luxury is not just
              a price — it's the feeling of wearing something made exactly for
              you.
            </p>
            <p className="font-display text-xl italic text-off-black tracking-wide">
              "Stand out in every occasion"
            </p>
          </div>

          {/* Right — brand values with individual stagger */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {values.map((val, i) => (
                <ValueBox
                  key={val.title}
                  title={val.title}
                  desc={val.desc}
                  delay={valueDelays[i] ?? "0s"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
