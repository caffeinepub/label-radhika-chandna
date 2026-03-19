import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax scroll
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `scale(1) translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

    // Particles
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

        // Loop particles when they drift out of bounds
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
      {/* Three.js particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background image with zoom + parallax */}
      <div
        ref={imgRef}
        className="absolute inset-0 hero-zoom"
        style={{ willChange: "transform", zIndex: 0 }}
      >
        <img
          src="/assets/generated/hero-main.dim_1920x1080.jpg"
          alt="Label Radhika Chandna hero"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Dark gradient overlay on left */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 3 }}>
        <div className="container mx-auto px-8 md:px-16">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-widest-xl text-white/70 mb-4 font-sans">
              The New Collection
            </p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-wide-lg uppercase mb-6">
              Radhika
              <br />
              Chandna
            </h1>
            <p className="text-xs uppercase tracking-widest-xl text-white/80 mb-10 font-sans">
              Elevated Indian Luxury
            </p>
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={scrollToCollections}
              className="inline-block border border-white/70 text-white text-xs uppercase tracking-widest-xl px-8 py-4 rounded-pill hover:bg-white hover:text-off-black transition-all duration-500 font-sans"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
