import { CreditCard, MessageCircle, Smartphone, Truck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CartItemShape {
  product: { id: bigint; name: string; priceINR: bigint };
  quantity: bigint;
}

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItemShape[];
}

function formatPrice(price: bigint) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function CheckoutModal({
  open,
  onClose,
  cartItems,
}: CheckoutModalProps) {
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.product.priceINR) * Number(item.quantity),
    0,
  );

  const handleWhatsApp = () => {
    const itemNames = cartItems
      .map((i) => `${i.product.name} (x${Number(i.quantity)})`)
      .join(", ");
    const message = encodeURIComponent(
      `Hi, I am interested in - ${itemNames}. Total: ₹${total.toLocaleString("en-IN")}`,
    );
    window.open(`https://wa.me/919368045151?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            data-ocid="checkout.modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="bg-white w-full max-w-md p-8 shadow-2xl relative"
              style={{ pointerEvents: "auto" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-light uppercase tracking-wide-lg text-off-black">
                  Complete Your Order
                </h2>
                <button
                  type="button"
                  data-ocid="checkout.close_button"
                  onClick={onClose}
                  className="text-off-black hover:text-taupe transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-4 font-sans">
                  Order Summary
                </p>
                {cartItems.length === 0 ? (
                  <p className="text-warm-gray text-sm font-sans italic">
                    Your bag is empty.
                  </p>
                ) : (
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item, i) => (
                      <div
                        key={String(item.product.id)}
                        data-ocid={`checkout.item.${i + 1}`}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <p className="text-sm font-display text-off-black">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-warm-gray font-sans">
                            Qty: {String(item.quantity)}
                          </p>
                        </div>
                        <p className="text-sm font-sans text-off-black">
                          {formatPrice(
                            BigInt(
                              Number(item.product.priceINR) *
                                Number(item.quantity),
                            ),
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-warm-border pt-4 flex justify-between">
                  <span className="text-xs uppercase tracking-widest-xl text-off-black font-sans">
                    Total
                  </span>
                  <span className="font-display text-xl font-light text-off-black">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                type="button"
                data-ocid="checkout.primary_button"
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white text-sm uppercase tracking-widest-xl py-4 hover:bg-[#1ebe5b] transition-colors duration-300 font-sans mb-6"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>

              {/* Payment Options */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest-xl text-warm-gray mb-4 font-sans">
                  Payment Options
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-warm-border bg-[#FAF8F5]">
                    <Smartphone
                      size={18}
                      className="text-taupe flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-sans text-off-black font-medium">
                        UPI — Google Pay / PhonePe
                      </p>
                      <p className="text-xs text-warm-gray font-sans">
                        Pay via UPI on WhatsApp order
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-warm-border bg-[#FAF8F5]">
                    <Truck size={18} className="text-taupe flex-shrink-0" />
                    <div>
                      <p className="text-xs font-sans text-off-black font-medium">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-xs text-warm-gray font-sans">
                        Available on select orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-warm-border bg-[#FAF8F5]">
                    <CreditCard
                      size={18}
                      className="text-taupe flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-sans text-off-black font-medium">
                        Credit / Debit Card
                      </p>
                      <p className="text-xs text-warm-gray font-sans">
                        In-store at Galleria DLF IV, Gurgaon
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-warm-gray font-sans italic">
                  Our team will confirm your preferred payment method via
                  WhatsApp.
                </p>
              </div>

              {/* Continue Shopping */}
              <button
                type="button"
                data-ocid="checkout.cancel_button"
                onClick={onClose}
                className="w-full border border-off-black text-off-black text-xs uppercase tracking-widest-xl py-3 hover:bg-off-black hover:text-white transition-colors duration-400 font-sans"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
