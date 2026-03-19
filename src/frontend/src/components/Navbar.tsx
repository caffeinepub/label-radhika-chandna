import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCart } from "../hooks/useQueries";

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cartItems } = useGetCart();
  const cartCount =
    cartItems?.reduce((acc, item) => acc + Number(item.quantity), 0) ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Collections", id: "collections" },
    { label: "New Arrivals", id: "bestsellers" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  // Text/icon color based on scroll state
  const linkClass = scrolled
    ? "text-off-black hover:text-taupe"
    : "text-white/90 hover:text-white";
  const iconClass = scrolled
    ? "text-off-black"
    : "text-white/90 hover:text-white";
  const brandSubClass = scrolled ? "text-warm-gray" : "text-white/60";
  const brandMainClass = scrolled ? "text-off-black" : "text-white";

  return (
    <>
      {/* Free delivery banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-off-black/90 text-white/80 text-center py-1.5 text-[10px] tracking-widest-xl uppercase font-sans">
        Free Delivery on All Orders Across India
      </div>

      {/* Pill navbar */}
      <nav
        className={`fixed top-8 left-1/2 z-40 -translate-x-1/2 w-[90%] max-w-6xl rounded-pill px-6 py-3 navbar-pill ${
          scrolled ? "navbar-scrolled" : "navbar-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              data-ocid="nav.collections.link"
              onClick={() => scrollTo("collections")}
              className={`text-xs uppercase tracking-widest-xl transition-colors duration-300 font-sans ${linkClass}`}
            >
              Collections
            </button>
            <button
              type="button"
              data-ocid="nav.arrivals.link"
              onClick={() => scrollTo("bestsellers")}
              className={`text-xs uppercase tracking-widest-xl transition-colors duration-300 font-sans ${linkClass}`}
            >
              New Arrivals
            </button>
          </div>

          {/* Center brand */}
          <div className="flex-1 flex justify-center">
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="text-center"
            >
              <div
                className={`text-[9px] uppercase tracking-widest-xl font-sans transition-colors duration-300 ${brandSubClass}`}
              >
                Label
              </div>
              <div
                className={`text-base md:text-lg font-display font-medium tracking-wide-lg uppercase transition-colors duration-300 ${brandMainClass}`}
              >
                Radhika Chandna
              </div>
            </button>
          </div>

          {/* Right links + icons */}
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              data-ocid="nav.about.link"
              onClick={() => scrollTo("about")}
              className={`text-xs uppercase tracking-widest-xl transition-colors duration-300 font-sans ${linkClass}`}
            >
              About
            </button>
            <button
              type="button"
              data-ocid="nav.contact.link"
              onClick={() => scrollTo("contact")}
              className={`text-xs uppercase tracking-widest-xl transition-colors duration-300 font-sans ${linkClass}`}
            >
              Contact
            </button>
            <div className="flex items-center gap-3 ml-2">
              <button
                type="button"
                className={`transition-colors duration-300 ${iconClass}`}
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <button
                type="button"
                className={`transition-colors duration-300 ${iconClass}`}
                aria-label="Account"
              >
                <User size={16} />
              </button>
              <button
                type="button"
                data-ocid="cart.open_modal_button"
                onClick={onCartOpen}
                className={`relative transition-colors duration-300 ${iconClass}`}
                aria-label="Cart"
              >
                <ShoppingBag size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-off-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile: cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              data-ocid="cart.open_modal_button"
              onClick={onCartOpen}
              className={`relative transition-colors duration-300 ${iconClass}`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-off-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`transition-colors duration-300 ${iconClass}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className={`md:hidden mt-4 pt-4 border-t ${
              scrolled ? "border-warm-border" : "border-white/20"
            } flex flex-col gap-4`}
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`text-xs uppercase tracking-widest-xl text-left font-sans transition-colors duration-300 ${linkClass}`}
              >
                {label}
              </button>
            ))}
            <div
              className={`pt-3 border-t ${
                scrolled ? "border-warm-border" : "border-white/20"
              }`}
            >
              <button
                type="button"
                data-ocid="checkout.open_modal_button"
                onClick={() => {
                  setMobileOpen(false);
                  onCartOpen();
                }}
                className="flex items-center gap-2 w-full justify-center py-3 bg-off-black text-white text-xs uppercase tracking-widest-xl font-sans hover:bg-taupe transition-colors btn-premium"
              >
                <ShoppingBag size={14} />
                Checkout
                {cartCount > 0 && (
                  <span className="ml-1 bg-white text-off-black rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
