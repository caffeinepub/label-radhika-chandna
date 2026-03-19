import { Instagram } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const images = [
  "/assets/generated/instagram-1.dim_600x600.jpg",
  "/assets/generated/instagram-2.dim_600x600.jpg",
  "/assets/generated/instagram-3.dim_600x600.jpg",
  "/assets/generated/instagram-4.dim_600x600.jpg",
  "/assets/generated/instagram-5.dim_600x600.jpg",
  "/assets/generated/instagram-6.dim_600x600.jpg",
];

export default function InstagramSection() {
  const headerRef = useReveal();
  const gridRef = useReveal();
  const ctaRef = useReveal();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headerRef} className="reveal text-center mb-14">
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-3 font-sans">
            Follow Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black">
            On Instagram
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
        >
          {images.map((src, i) => (
            <a
              key={src}
              href="https://www.instagram.com/labelradhikachandna"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`instagram.item.${i + 1}`}
              className="group relative aspect-square overflow-hidden block"
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center gap-2 text-white">
                  <Instagram size={22} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest font-sans">
                    View Post
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="reveal text-center mt-12 flex flex-col items-center gap-5"
        >
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray font-sans">
            @labelradhikachandna
          </p>
          <a
            data-ocid="instagram.primary_button"
            href="https://www.instagram.com/labelradhikachandna"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center gap-2 border border-off-black text-off-black text-xs uppercase tracking-widest-xl px-8 py-3.5 hover:bg-off-black hover:text-white font-sans transition-all duration-400"
          >
            <Instagram size={13} />
            Follow for daily style inspiration
          </a>
        </div>
      </div>
    </section>
  );
}
