import { MessageCircle } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

export default function ConsultationBannerSection() {
  const ref = useReveal();

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-y border-warm-border">
      <div
        ref={ref}
        className="reveal container mx-auto px-6 md:px-12 text-center"
      >
        <p className="text-[10px] uppercase tracking-widest-xl text-warm-gray font-sans mb-4">
          Personal Styling
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-light uppercase tracking-wide-lg text-off-black mb-6">
          Book a Styling Consultation
        </h2>
        <p className="text-sm text-warm-gray font-sans tracking-wide max-w-md mx-auto mb-10">
          Speak directly with our designer. Get personalised outfit advice,
          custom fit guidance, and exclusive styling tips — all on WhatsApp.
        </p>
        <a
          data-ocid="consultation.whatsapp_button"
          href="https://wa.me/919368045151?text=Hi%2C+I+would+like+to+book+a+styling+consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-off-black text-white text-xs uppercase tracking-widest-xl font-sans px-10 py-4 hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <MessageCircle size={15} />
          Book on WhatsApp
        </a>
      </div>
    </section>
  );
}
