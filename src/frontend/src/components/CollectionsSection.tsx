import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const collections = [
  {
    name: "Evening Gowns",
    image: "/assets/generated/collection-evening-gowns.dim_800x1000.jpg",
    slug: "evening-gowns",
    bg: "bg-stone-200",
  },
  {
    name: "Indian Wear",
    image: "/assets/generated/collection-indian-wear.dim_800x1000.jpg",
    slug: "indian-wear",
    bg: "bg-stone-300",
  },
  {
    name: "Western Wear",
    image: "/assets/generated/collection-western-wear.dim_800x1000.jpg",
    slug: "western-wear",
    bg: "bg-neutral-200",
  },
  {
    name: "Summer Wear",
    image: "/assets/generated/collection-summer-wear.dim_800x1000.jpg",
    slug: "summer-wear",
    bg: "bg-amber-50",
  },
];

function CollectionCard({
  col,
  index,
}: { col: (typeof collections)[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      key={col.slug}
      data-ocid={`collections.item.${index + 1}`}
      className="group cursor-pointer"
    >
      <div className="img-zoom-wrap aspect-[4/5] overflow-hidden mb-4 relative">
        {!imgError ? (
          <img
            src={col.image}
            alt={col.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full ${col.bg} flex items-end justify-center pb-6 transition-transform duration-700 group-hover:scale-105`}
          >
            <span className="text-xs uppercase tracking-widest-xl text-stone-600 font-sans">
              {col.name}
            </span>
          </div>
        )}
      </div>
      <p className="text-xs uppercase tracking-widest-xl text-off-black group-hover:text-taupe transition-colors font-sans text-center border-b border-transparent group-hover:border-taupe pb-1 inline-block w-full">
        {col.name}
      </p>
    </div>
  );
}

export default function CollectionsSection() {
  const ref = useReveal();

  return (
    <section id="collections" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-3 font-sans">
            Curated for You
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black">
            Featured Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <CollectionCard key={col.slug} col={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
