import { ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useClearCart,
  useGetCart,
  useRemoveFromCart,
} from "../hooks/useQueries";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

function formatPrice(price: bigint) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const { data: cartItems } = useGetCart();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const total =
    cartItems?.reduce(
      (acc, item) =>
        acc + Number(item.product.priceINR) * Number(item.quantity),
      0,
    ) ?? 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-warm-border">
              <h2 className="font-display text-2xl font-light uppercase tracking-wide-lg text-off-black">
                Your Bag
              </h2>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="text-off-black hover:text-taupe transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {!cartItems || cartItems.length === 0 ? (
                <div data-ocid="cart.empty_state" className="text-center py-16">
                  <ShoppingBag
                    size={40}
                    className="text-warm-border mx-auto mb-4"
                  />
                  <p className="font-display text-xl font-light text-off-black mb-2">
                    Your bag is empty
                  </p>
                  <p className="text-warm-gray text-sm font-sans">
                    Add pieces you love to continue
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, i) => (
                    <div
                      key={String(item.product.id)}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-24 bg-muted flex-shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-sm uppercase tracking-wide text-off-black">
                          {item.product.name}
                        </p>
                        <p className="text-warm-gray text-xs font-sans mt-1">
                          {formatPrice(item.product.priceINR)}
                        </p>
                        <p className="text-warm-gray text-xs font-sans">
                          Qty: {String(item.quantity)}
                        </p>
                      </div>
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${i + 1}`}
                        onClick={() => removeFromCart.mutate(item.product.id)}
                        className="text-warm-gray hover:text-off-black transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems && cartItems.length > 0 && (
              <div className="px-8 py-6 border-t border-warm-border space-y-4">
                <div className="flex justify-between">
                  <span className="text-xs uppercase tracking-widest-xl text-off-black font-sans">
                    Total
                  </span>
                  <span className="font-display text-xl font-light text-off-black">
                    {`₹${total.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.confirm_button"
                  onClick={onCheckout}
                  className="w-full bg-off-black text-white text-xs uppercase tracking-widest-xl py-4 hover:bg-taupe transition-colors duration-400 font-sans"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  data-ocid="cart.cancel_button"
                  onClick={onClose}
                  className="w-full border border-off-black text-off-black text-xs uppercase tracking-widest-xl py-3 hover:bg-off-black hover:text-white transition-colors duration-400 font-sans"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  data-ocid="cart.delete_button"
                  onClick={() => clearCart.mutate()}
                  className="w-full text-xs uppercase tracking-widest-xl text-warm-gray hover:text-off-black transition-colors font-sans"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
