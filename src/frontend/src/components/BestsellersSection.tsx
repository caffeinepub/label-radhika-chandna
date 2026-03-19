import { Eye, ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { useAddToCart, useGetBestsellers } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

const fallbackProducts = [
  {
    id: BigInt(1),
    name: "Blair White Dress",
    priceINR: BigInt(8900),
    colors: ["White"],
  },
  {
    id: BigInt(2),
    name: "Harper Ivory Dress",
    priceINR: BigInt(8400),
    colors: ["Ivory"],
  },
  {
    id: BigInt(3),
    name: "Serenade Navy Dress",
    priceINR: BigInt(9400),
    colors: ["Navy"],
  },
  {
    id: BigInt(4),
    name: "Quinn Plum Set",
    priceINR: BigInt(8400),
    colors: ["Plum"],
  },
  {
    id: BigInt(5),
    name: "Daisy Pink Dress",
    priceINR: BigInt(7900),
    colors: ["Pink"],
  },
  {
    id: BigInt(6),
    name: "Dahlia Fuchsia Dress",
    priceINR: BigInt(7900),
    colors: ["Fuchsia"],
  },
];

const productImages: Record<string, string> = {
  "Blair White Dress": "/assets/generated/product-blair-white.dim_600x800.jpg",
  "Harper Ivory Dress":
    "/assets/generated/product-harper-ivory.dim_600x800.jpg",
  "Serenade Navy Dress":
    "/assets/generated/product-serenade-navy.dim_600x800.jpg",
  "Quinn Plum Set": "/assets/generated/product-quinn-plum.dim_600x800.jpg",
  "Daisy Pink Dress": "/assets/generated/product-daisy-pink.dim_600x800.jpg",
  "Dahlia Fuchsia Dress":
    "/assets/generated/product-dahlia-fuchsia.dim_600x800.jpg",
};

// Urgency stock counts per index (0–5)
const urgencyCounts = [3, 2, 3, 1, 2, 3];

function formatPrice(price: bigint) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

interface Product {
  id: bigint;
  name: string;
  priceINR: bigint;
  colors?: string[];
  description?: string;
  category?: string;
  collection?: string;
  isBestseller?: boolean;
}

// Stagger delays for up to 6 cards
const staggerDelays = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];

function TiltCard({
  children,
  ocid,
  onClick,
  revealDelay,
}: {
  children: React.ReactNode;
  ocid: string;
  onClick: () => void;
  revealDelay: string;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const revealRef = useReveal();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rotateY = (dx / (rect.width / 2)) * 6;
    const rotateX = -(dy / (rect.height / 2)) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)";
  };

  return (
    <div
      ref={revealRef}
      className="reveal flex-shrink-0 w-[260px] md:w-[280px] snap-start"
      style={{ transitionDelay: revealDelay }}
    >
      <button
        ref={cardRef}
        type="button"
        data-ocid={ocid}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group w-full bg-white rounded-sm overflow-hidden shadow-xs cursor-pointer text-left"
        style={{
          transition:
            "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      >
        {children}
      </button>
    </div>
  );
}

export default function BestsellersSection({
  onProductClick,
}: {
  onProductClick?: (product: Product) => void;
}) {
  const { data: products } = useGetBestsellers();
  const addToCart = useAddToCart();
  const ref = useReveal();

  const displayProducts =
    products && products.length > 0
      ? products
      : fallbackProducts.map((p) => ({
          id: p.id,
          name: p.name,
          priceINR: p.priceINR,
          category: "Dress",
          collection: "Bestsellers",
          description: "",
          isBestseller: true,
          colors: p.colors,
        }));

  const getImage = (name: string) =>
    productImages[name] ??
    "/assets/generated/product-blair-white.dim_600x800.jpg";

  return (
    <section
      id="bestsellers"
      className="py-24 md:py-32 bg-[#FAF8F5] relative overflow-hidden"
    >
      {/* Top section blend */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #ffffff, #FAF8F5)" }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-3 font-sans">
            Most Loved
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black">
            Bestsellers
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory">
          {displayProducts.map((product, i) => (
            <TiltCard
              key={String(product.id)}
              ocid={`bestsellers.item.${i + 1}`}
              onClick={() => onProductClick?.(product)}
              revealDelay={staggerDelays[i] ?? "0s"}
            >
              {/* Image container with overlay */}
              <div className="img-zoom-wrap aspect-[3/4] overflow-hidden relative">
                <img
                  src={getImage(product.name)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Urgency badge */}
                <div className="absolute top-3 left-3 z-10 bg-[#8B1A1A] text-white text-[9px] font-sans uppercase tracking-widest px-2 py-1 rounded-full">
                  Only {urgencyCounts[i] ?? 3} left
                </div>
                {/* Live viewers badge */}
                <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-[10px] font-sans px-2 py-1 rounded-full flex items-center gap-1 z-10">
                  <Eye size={10} />
                  <span>{2 + i} viewing</span>
                </div>
                {/* Elegant hover overlay */}
                <div className="product-card-overlay">
                  <span className="product-card-overlay-text">
                    View Product
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="font-display text-lg font-light text-off-black mb-1 uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-warm-gray text-sm mb-4 font-sans">
                  {formatPrice(product.priceINR)}
                </p>
                <button
                  type="button"
                  data-ocid={`bestsellers.item.${i + 1}.button`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart.mutate(product.id);
                    toast.success(`${product.name} added to bag`);
                  }}
                  disabled={addToCart.isPending}
                  className="btn-premium w-full flex items-center justify-center gap-2 border border-off-black text-off-black text-xs uppercase tracking-widest-xl py-3 hover:bg-off-black hover:text-white font-sans"
                >
                  <ShoppingBag size={12} />
                  Add to Bag
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
