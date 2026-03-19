import { useReveal } from "../hooks/useReveal";

const testimonials = [
  {
    id: "priya",
    quote:
      "The Blair White Dress was absolutely breathtaking. I wore it to my best friend's reception and felt like royalty.",
    name: "Priya M.",
    city: "Delhi",
    image: "/assets/generated/client-priya.dim_200x200.jpg",
  },
  {
    id: "anika",
    quote:
      "Radhika Chandna's designs are unmatched. The quality of Italian crepe and embroidery is truly world-class.",
    name: "Anika S.",
    city: "Mumbai",
    image: "/assets/generated/client-anika.dim_200x200.jpg",
  },
  {
    id: "meera",
    quote:
      "My Nayra Garara Set was custom fitted perfectly. The team was wonderful and the piece is heirloom quality.",
    name: "Meera K.",
    city: "Bangalore",
    image: "/assets/generated/client-meera.dim_200x200.jpg",
  },
];

export default function TestimonialsSection() {
  const ref = useReveal();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-3 font-sans">
            Voices
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              data-ocid={`testimonials.item.${i + 1}`}
              className="p-8 border border-warm-border bg-[#FAF8F5] flex flex-col"
            >
              <p className="font-display text-lg font-light italic text-off-black leading-relaxed mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-warm-border"
                />
                <div>
                  <p className="text-xs uppercase tracking-widest-xl text-off-black font-sans">
                    {t.name}
                  </p>
                  <p className="text-xs text-warm-gray font-sans">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
