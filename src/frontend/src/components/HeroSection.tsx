import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth parallax scroll
  useEffect(() => {
    let rafId: number;
    let currentY = 0;
    let targetY = 0;

    const onScroll = () => {
      targetY = window.scrollY;
    };

    const tick = () => {
      currentY += (targetY - currentY) * 0.08;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1) translateY(${currentY * 0.25}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Three.js particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    const particleCount = 80;
    const positions: number[] = [];
    const velocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      );
      velocities.push(
        (Math.random() - 0.5) * 0.003,
        Math.random() * 0.005 + 0.002,
        (Math.random() - 0.5) * 0.002,
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const material = new THREE.PointsMaterial({
      color: 0xf5efe6,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pos[idx] += velocities[i * 3];
        pos[idx + 1] += velocities[i * 3 + 1];
        pos[idx + 2] += velocities[i * 3 + 2];
        if (pos[idx + 1] > 4.5) pos[idx + 1] = -4.5;
        if (pos[idx] > 6.5) pos[idx] = -6.5;
        if (pos[idx] < -6.5) pos[idx] = 6.5;
      }
      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToCollections = () => {
    document
      .getElementById("collections")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Cinematic letterbox bars — retract on load */}
      <div className="hero-letterbox-top" />
      <div className="hero-letterbox-bottom" />

      {/* Three.js particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background: cinematic hero zoom */}
      <div
        ref={imgRef}
        className="absolute inset-0 hero-zoom"
        style={{
          willChange: "transform",
          zIndex: 0,
          animation: "heroZoom 16s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/generated/hero-main.dim_1920x1080.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        >
          <source src="/assets/VID_20260319_163741_254.mp4" type="video/mp4" />
          <source
            src="/assets/VID_20260319_163741_254-1.mp4"
            type="video/mp4"
          />
        </video>
        <img
          src="/assets/generated/hero-main.dim_1920x1080.jpg"
          alt="Label Radhika Chandna hero"
          className="w-full h-full object-cover object-top"
          style={{ position: "relative", zIndex: 0 }}
        />
      </div>

      {/* Cinematic gradient overlay — left-heavy for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 hero-vignette pointer-events-none"
        style={{ zIndex: 3 }}
      />

      {/* Bottom fade for smooth section blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06))",
          zIndex: 3,
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 4 }}>
        <div className="container mx-auto px-8 md:px-16">
          <div className="max-w-2xl">
            {/* Overline */}
            <p
              className="word-reveal text-[10px] uppercase tracking-widest-xl text-white/60 mb-8 font-sans"
              style={{ animationDelay: "0.3s" }}
            >
              The New Collection · 2026
            </p>

            {/* Main headline — cinematic stagger */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-wide-lg uppercase mb-4">
              <span
                className="word-reveal block"
                style={{ animationDelay: "0.6s" }}
              >
                Designed
              </span>
              <span
                className="word-reveal block"
                style={{ animationDelay: "0.9s" }}
              >
                to be
              </span>
              <span
                className="word-reveal block font-display italic font-light"
                style={{ animationDelay: "1.2s" }}
              >
                Remembered
              </span>
            </h1>

            {/* Thin divider */}
            <div
              className="word-reveal w-12 h-px bg-white/40 my-8"
              style={{ animationDelay: "1.4s" }}
            />

            {/* Subline */}
            <p
              className="word-reveal text-[11px] uppercase tracking-widest-xl text-white/70 mb-12 font-sans"
              style={{ animationDelay: "1.5s" }}
            >
              Label Radhika Chandna · Gurgaon
            </p>

            {/* CTA */}
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={scrollToCollections}
              className="word-reveal btn-premium inline-block border border-white/60 text-white text-[10px] uppercase tracking-widest-xl px-10 py-4 rounded-pill hover:bg-white hover:text-off-black font-sans"
              style={{ animationDelay: "1.8s" }}
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="word-reveal absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 4, animationDelay: "2.2s" }}
      >
        <span className="text-[9px] uppercase tracking-widest-xl text-white/40 font-sans">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/20" />
      </div>
    </section>
  );
}
