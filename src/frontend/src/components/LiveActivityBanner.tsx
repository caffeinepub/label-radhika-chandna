import { User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const notifications = [
  "Priya from Delhi just ordered Daffodil Yellow Dress 🛍️",
  "Meera from Mumbai is viewing Evening Gowns",
  "Anika from Bengaluru just placed a custom fit order",
  "3 people are browsing right now",
  "Shreya from Gurgaon just added Blair White Dress to cart",
];

export default function LiveActivityBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (dismissed) return;
    const initial = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(initial);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || !visible) return;
    timerRef.current = setTimeout(() => {
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 2000);
    }, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {visible && (
        <div className="slide-up-notif bg-white rounded-sm shadow-xl border border-gray-100 flex items-start gap-3 p-4 max-w-[280px]">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={14} className="text-gray-500" />
          </div>
          <p
            className="text-xs text-gray-700 font-sans leading-relaxed flex-1"
            style={{ fontSize: "11px" }}
          >
            {notifications[index]}
          </p>
          <button
            type="button"
            data-ocid="live_banner.close_button"
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 text-gray-300 hover:text-gray-600 transition-colors mt-0.5"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
