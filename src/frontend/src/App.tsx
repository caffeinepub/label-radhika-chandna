import { Toaster } from "@/components/ui/sonner";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import BestsellersSection from "./components/BestsellersSection";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import CollectionsSection from "./components/CollectionsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LookbookSection from "./components/LookbookSection";
import Navbar from "./components/Navbar";
import TestimonialsSection from "./components/TestimonialsSection";
import { useGetCart } from "./hooks/useQueries";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { data: cartItems } = useGetCart();

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />

      <Navbar onCartOpen={() => setCartOpen(true)} />

      <main>
        <HeroSection />
        <CollectionsSection />
        <BestsellersSection />
        <LookbookSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems ?? []}
      />

      {/* Floating WhatsApp button */}
      <a
        data-ocid="whatsapp.button"
        href="https://wa.me/919368045151?text=Hi%2C%20I%20am%20interested%20in%20your%20collection"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-luxury hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
