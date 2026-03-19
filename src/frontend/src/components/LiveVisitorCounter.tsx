import { useEffect, useState } from "react";

export default function LiveVisitorCounter() {
  const [count, setCount] = useState(247);
  const [displayed, setDisplayed] = useState(247);

  useEffect(() => {
    const tick = () => {
      const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
      setCount((prev) => {
        const next = Math.min(280, Math.max(200, prev + delta));
        return next;
      });
      // Schedule next tick between 4-8 seconds
      const delay = 4000 + Math.random() * 4000;
      timer = setTimeout(tick, delay);
    };
    let timer = setTimeout(tick, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth number transition
  useEffect(() => {
    if (displayed === count) return;
    const step = displayed < count ? 1 : -1;
    const id = setTimeout(() => setDisplayed((d) => d + step), 60);
    return () => clearTimeout(id);
  }, [count, displayed]);

  return (
    <div
      data-ocid="visitor.counter"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-warm-gray text-[10px] font-sans uppercase tracking-widest px-3 py-2 rounded-full shadow-md border border-gray-100 pointer-events-none select-none"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
      <span>{displayed} people shopping now</span>
    </div>
  );
}
