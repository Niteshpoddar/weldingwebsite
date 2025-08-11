import Link from 'next/link';

export default function ProductHero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 hero-gradient">
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary-900 drop-shadow-lg hero-title">
        Explore Our Welding Solutions
      </h1>

      {/* Short Description */}
      <p className="max-w-3xl text-lg md:text-xl text-primary-700 mb-8 hero-subtitle">
        E6013 premium welding electrodes delivering smooth arcs, strong welds, 
        and consistent performance for all your industrial needs.
      </p>

      {/* Call-to-Action */}
      <Link 
        href="/contact" 
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all hero-cta"
      >
        Request Quote
      </Link>
    </section>
  );
}