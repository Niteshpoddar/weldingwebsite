import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] text-center px-6 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight">
        <span className="text-red-800 drop-shadow-sm">Bajrang</span>{" "}
        <span className="text-red-800 drop-shadow-sm">
          Industries
        </span>
      </h1>

      {/* Since */}
      <p className="text-2xl italic text-red-700 mb-6">Since 2004</p>

      {/* Tagline */}
      <p className="max-w-2xl text-lg md:text-xl text-red-700 font-medium mb-10">
        Leading manufacturer of{" "}
        <span className="font-semibold">specialized rubber rollers</span> and{" "}
        <span className="font-semibold">precision engineering products</span>.
        Trusted by industries across India and globally.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link href="/products" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all">
          Our Products
        </Link>
        <Link href="/contact" className="px-6 py-3 border border-red-600 text-red-600 hover:bg-red-50 font-semibold rounded-lg shadow-sm transform hover:scale-105 transition-all">
          Get Quote
        </Link>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 text-sm text-gray-600">
        Trusted by <span className="font-semibold">500+ clients</span> worldwide
      </div>
    </section>
  );
}