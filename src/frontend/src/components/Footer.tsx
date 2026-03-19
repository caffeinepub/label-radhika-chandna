import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#F2F2F2] py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Brand name */}
        <div className="text-center mb-12">
          <p className="text-[9px] uppercase tracking-widest-xl text-[#888] mb-1 font-sans">
            Label
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light uppercase tracking-widest-xl text-[#F2F2F2]">
            Radhika Chandna
          </h2>
          <p className="text-xs text-[#888] mt-3 tracking-widest-xl uppercase font-sans">
            Sophisticated Femininity Meets Sartorial Savvy
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { label: "Collections", id: "collections" },
            { label: "Bestsellers", id: "bestsellers" },
            { label: "Lookbook", id: "lookbook" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map((link) => (
            <button
              key={link.id}
              type="button"
              data-ocid={`footer.${link.id}.link`}
              onClick={() => scrollTo(link.id)}
              className="text-xs uppercase tracking-widest-xl text-[#888] hover:text-[#F2F2F2] transition-colors font-sans"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#888] hover:text-[#F2F2F2] transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#888] hover:text-[#F2F2F2] transition-colors"
          >
            <Facebook size={18} />
          </a>
        </div>

        <div className="border-t border-[#222] pt-8 text-center">
          <p className="text-xs text-[#555] font-sans">
            {`© ${year} Label Radhika Chandna. Built with ♥ using `}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#888] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
