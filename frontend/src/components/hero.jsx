function Hero() {
  return (
    <section
      id="home"
      className="min-h-[620px] bg-[#f7f3e9] flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="text-[#183b2b]">

          <p className="text-sm tracking-[0.3em] uppercase mb-5">
            Matcha House
          </p>

          <h2 className="text-5xl md:text-6xl font-serif leading-tight">
            PRE-ORDER.
            <br />
            SKIP THE QUEUE.
          </h2>

          <p className="mt-6 text-xl text-[#496454] max-w-md">
            Fresh food, ready when you are.
          </p>

          {/* Order Button */}
          <a
            href="#menu"
            className="mt-8 inline-block rounded-md bg-[#183b2b] px-8 py-4 text-lg text-white transition-all duration-300 hover:bg-[#28543e] hover:-translate-y-1"
            >
            ORDER NOW →
        </a>
          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-8 text-sm">

            <div className="flex items-center gap-2">
              <span className="text-xl">◷</span>
              <span>Save Time</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">♧</span>
              <span>Skip Queue</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">🍃</span>
              <span>Fresh & Tasty</span>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative">

          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554"
              alt="Fresh food at Matcha House"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Decorative text */}
          <div className="absolute bottom-6 right-6 bg-[#f7f3e9]/90 px-6 py-4 rounded-lg">
            <p className="font-serif text-xl text-[#183b2b]">
              Good Food
            </p>
            <p className="font-serif text-xl text-[#183b2b]">
              Brighter Days ✦
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero