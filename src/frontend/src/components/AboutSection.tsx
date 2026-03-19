import { useReveal } from "../hooks/useReveal";

export default function AboutSection() {
  const leftRef = useReveal();
  const rightRef = useReveal();

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F5F0EA]">
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

          {/* Right — brand values */}
          <div ref={rightRef} className="reveal">
            <div className="grid grid-cols-2 gap-6">
              {[
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
              ].map((val) => (
                <div key={val.title} className="p-6 bg-white">
                  <h3 className="font-display text-lg uppercase tracking-wide text-off-black mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-warm-gray font-sans leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
