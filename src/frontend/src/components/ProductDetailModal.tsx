import { ChevronDown, MoveHorizontal, User, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: bigint;
  name: string;
  priceINR: bigint;
  description?: string;
  colors?: string[];
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

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

const fallbackProducts = [
  { id: BigInt(1), name: "Blair White Dress", priceINR: BigInt(8900) },
  { id: BigInt(2), name: "Harper Ivory Dress", priceINR: BigInt(8400) },
  { id: BigInt(3), name: "Serenade Navy Dress", priceINR: BigInt(9400) },
  { id: BigInt(4), name: "Quinn Plum Set", priceINR: BigInt(8400) },
  { id: BigInt(5), name: "Daisy Pink Dress", priceINR: BigInt(7900) },
  { id: BigInt(6), name: "Dahlia Fuchsia Dress", priceINR: BigInt(7900) },
];

const fabricDetails: Record<string, string> = {
  "Blair White Dress": "Italian Crepe",
  "Harper Ivory Dress": "Premium Georgette",
  "Serenade Navy Dress": "Italian Crepe",
  "Quinn Plum Set": "Premium Georgette",
  "Daisy Pink Dress": "Italian Crepe",
  "Dahlia Fuchsia Dress": "Premium Georgette",
};

const angleFilters = [
  { id: "a1", filter: "grayscale(0.1) brightness(1.0)" },
  { id: "a2", filter: "hue-rotate(5deg) brightness(1.05)" },
  { id: "a3", filter: "saturate(1.15) brightness(0.97)" },
  { id: "a4", filter: "hue-rotate(-5deg) saturate(0.9) brightness(1.08)" },
];

const dotIds = ["d1", "d2", "d3", "d4", "d5"];
const sizes = ["XS", "S", "M", "L", "XL"];

function formatPrice(price: bigint) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState("S");
  const [fabricOpen, setFabricOpen] = useState(false);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const imgSrc =
    productImages[product.name] ??
    "/assets/generated/product-blair-white.dim_600x800.jpg";
  const waLink = `https://wa.me/919368045151?text=Hi%2C+I+am+interested+in+${encodeURIComponent(product.name)}+in+size+${selectedSize}`;
  const consultLink = `https://wa.me/919368045151?text=Hi%2C+I+would+like+to+book+a+custom+fit+for+${encodeURIComponent(product.name)}`;

  // Recommendations: 3 other products
  const recommendations = fallbackProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const fabric = fabricDetails[product.name] ?? "Italian Crepe";

  return (
    <dialog
      data-ocid="product.modal"
      open
      className="fixed inset-0 z-[200] w-full h-full flex items-end md:items-center justify-center m-0 max-w-none max-h-none p-0 border-0"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="modal-slide-up bg-white w-full md:max-w-5xl md:rounded-sm mx-0 md:mx-6 max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          data-ocid="product.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Image panel */}
          <div className="md:w-1/2 bg-[#FAF8F5] p-6 flex flex-col gap-4">
            <div
              className="aspect-[3/4] overflow-hidden rounded-sm"
              style={{ cursor: "zoom-in" }}
            >
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.6s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                }}
              />
            </div>

            <div className="flex gap-2">
              {angleFilters.map(({ id, filter }) => (
                <div
                  key={id}
                  className="flex-1 aspect-square overflow-hidden rounded-sm cursor-pointer border-2 border-transparent hover:border-gray-400 transition-colors"
                >
                  <img
                    src={imgSrc}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover"
                    style={{ filter }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-sans py-2 border-t border-gray-100">
              <MoveHorizontal size={14} />
              <span>Drag to rotate</span>
              <span className="flex gap-1">
                {dotIds.map((id) => (
                  <span
                    key={id}
                    className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block"
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Right: Details panel */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col gap-6 overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 pulse-green inline-block" />
                <span className="text-xs text-gray-500 font-sans">
                  3 people are viewing this right now
                </span>
              </div>

              <div className="mb-4">
                <span
                  data-ocid="product.card"
                  className="text-xs uppercase tracking-widest font-sans px-3 py-1 border"
                  style={{ color: "#9B6A3D", borderColor: "#C8A77A" }}
                >
                  ✦ Limited Pieces Available
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-light text-gray-900 uppercase tracking-wide-lg mb-2">
                {product.name}
              </h2>
              <p className="font-display text-2xl text-gray-700 mb-4">
                {formatPrice(product.priceINR)}
              </p>

              {product.colors && product.colors.length > 0 && (
                <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-4">
                  Available in: {product.colors.join(", ")}
                </p>
              )}

              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                {product.description ||
                  "Crafted with the finest Italian crepe, this piece embodies effortless luxury. Designed for the modern Indian woman who commands attention — whether at an intimate gathering or a grand celebration."}
              </p>
            </div>

            {/* Size selector */}
            <div>
              <p className="text-xs uppercase tracking-widest font-sans text-gray-500 mb-3">
                Select Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    data-ocid="product.toggle"
                    onClick={() => setSelectedSize(size)}
                    className="w-11 h-11 text-xs font-sans uppercase tracking-widest border transition-all duration-200 rounded-sm"
                    style={{
                      background:
                        selectedSize === size ? "#1a1a1a" : "transparent",
                      color: selectedSize === size ? "#ffffff" : "#1a1a1a",
                      borderColor:
                        selectedSize === size ? "#1a1a1a" : "#d1d1d1",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-warm-gray font-sans mt-2">
                Custom size? We'll tailor it for you.
              </p>
            </div>

            {/* Fabric & Care collapsible */}
            <div className="border-t border-gray-100 pt-4">
              <button
                type="button"
                data-ocid="product.toggle"
                onClick={() => setFabricOpen((o) => !o)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-sans text-gray-700 py-1 hover:text-gray-900 transition-colors"
              >
                <span>Fabric &amp; Care</span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-300"
                  style={{
                    transform: fabricOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {fabricOpen && (
                <div className="mt-3 flex flex-col gap-1.5 text-xs text-gray-500 font-sans">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px]">
                      Fabric
                    </span>
                    <span>{fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px]">
                      Origin
                    </span>
                    <span>Handcrafted in India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px]">
                      Care
                    </span>
                    <span>Dry clean only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px]">
                      Lining
                    </span>
                    <span>Fully lined</span>
                  </div>
                </div>
              )}
            </div>

            {/* Custom fit note */}
            <div className="bg-[#FAF8F5] rounded-sm p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-sans mb-1">
                Custom Fitting Available
              </p>
              <p className="text-xs text-gray-500 font-sans">
                All pieces can be tailored to your exact measurements. WhatsApp
                us to begin.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                data-ocid="product.primary_button"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs uppercase tracking-widest font-sans px-6 py-4 hover:bg-[#1ebe5a] transition-colors duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp — Size {selectedSize}
              </a>
              <a
                data-ocid="product.secondary_button"
                href={consultLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gray-900 text-gray-900 text-xs uppercase tracking-widest font-sans px-6 py-4 hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                <User size={14} />
                Book Custom Fit
              </a>
            </div>

            {/* Recommendations */}
            <div className="border-t border-gray-100 pt-6">
              <p className="text-[10px] uppercase tracking-widest font-sans text-gray-400 mb-4">
                You May Also Like
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendations.map((rec) => {
                  const recImg =
                    productImages[rec.name] ??
                    "/assets/generated/product-blair-white.dim_600x800.jpg";
                  return (
                    <div
                      key={String(rec.id)}
                      className="flex-shrink-0 w-20 group cursor-pointer"
                    >
                      <div className="w-20 h-28 overflow-hidden rounded-sm mb-1.5">
                        <img
                          src={recImg}
                          alt={rec.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-[10px] font-sans text-gray-700 leading-tight mb-0.5 truncate">
                        {rec.name}
                      </p>
                      <p className="text-[10px] font-sans text-gray-400">
                        {formatPrice(rec.priceINR)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
