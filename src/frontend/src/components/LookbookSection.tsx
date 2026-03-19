import { useReveal } from "../hooks/useReveal";

export default function LookbookSection() {
  const titleRef = useReveal();
  const wideRef = useReveal();
  const portrait1Ref = useReveal();
  const portrait2Ref = useReveal();
  const quoteRef = useReveal();

  return (
    <section
      id="lookbook"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Top blend from About */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #F5F0EA, #ffffff)" }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div ref={titleRef} className="reveal text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-light uppercase tracking-widest-xl text-off-black">
            The Lookbook
          </h2>
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mt-4 font-sans">
            Journey Through Elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wide landscape — first, no delay */}
          <div
            ref={wideRef}
            className="reveal md:col-span-2 img-zoom-wrap overflow-hidden"
          >
            <img
              src="/assets/generated/lookbook-1.dim_1200x800.jpg"
              alt="Lookbook 1"
              className="w-full h-[400px] md:h-[560px] object-cover"
              loading="lazy"
            />
          </div>

          {/* Portrait 1 — slight delay */}
          <div
            ref={portrait1Ref}
            className="reveal img-zoom-wrap overflow-hidden"
            style={{ transitionDelay: "0.2s" }}
          >
            <img
              src="/assets/generated/lookbook-2.dim_800x1100.jpg"
              alt="Lookbook 2"
              className="w-full h-[480px] md:h-[600px] object-cover"
              loading="lazy"
            />
          </div>

          {/* Portrait 2 — more delay */}
          <div
            ref={portrait2Ref}
            className="reveal img-zoom-wrap overflow-hidden"
            style={{ transitionDelay: "0.35s" }}
          >
            <img
              src="/assets/generated/lookbook-3.dim_800x1100.jpg"
              alt="Lookbook 3"
              className="w-full h-[480px] md:h-[600px] object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div ref={quoteRef} className="reveal text-center mt-16">
          <p className="font-display text-2xl md:text-3xl font-light italic text-warm-gray tracking-wide">
            "Where every garment tells a story of elegance"
          </p>
        </div>
      </div>
    </section>
  );
}
