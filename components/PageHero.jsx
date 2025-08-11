export default function PageHero({ 
  title, 
  subtitle, 
  showCTA = false, 
  ctaText = "Get Started", 
  ctaLink = "/contact",
  ctaIcon = null,
  backgroundClass = "hero-gradient"
}) {
  return (
    <section className={`flex flex-col items-center justify-center min-h-[60vh] px-6 py-16 ${backgroundClass} text-center`}>
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-primary-900 drop-shadow-lg mb-4 hero-title">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="max-w-2xl text-lg md:text-xl text-primary-700 leading-relaxed mb-6 hero-subtitle">
          {subtitle}
        </p>
      )}

      {/* Optional CTA */}
      {showCTA && (
        <div className="hero-cta">
          <a 
            href={ctaLink}
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all"
          >
            {ctaText}
            {ctaIcon && <ctaIcon className="w-5 h-5 ml-2" />}
          </a>
        </div>
      )}
    </section>
  );
}
