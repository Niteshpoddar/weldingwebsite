import Link from 'next/link';

export default function AboutHero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 hero-gradient text-center">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-primary-900 drop-shadow-lg mb-4 hero-title">
        Crafting Precision Since 2004
      </h1>

      {/* Short Content */}
      <p className="max-w-2xl text-lg md:text-xl text-primary-700 leading-relaxed mb-6 hero-subtitle">
        Delivering <span className="font-semibold">specialized rubber rollers</span> and{" "}
        <span className="font-semibold">precision engineering solutions</span> for industries 
        in India and across <span className="font-semibold">20+ countries</span>. Trusted for 
        innovation, quality, and reliability.
      </p>

      {/* Optional CTA */}
      <div className="flex gap-4 hero-cta">
        <Link 
          href="/products" 
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all"
        >
          Our Products
        </Link>
        <Link 
          href="/contact" 
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all"
        >
          Get Quote
        </Link>
      </div>
    </section>
  );
}