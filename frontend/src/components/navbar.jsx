function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#183b2b]/10 bg-[#f7f3e9]/95 backdrop-blur">
      <div className="flex flex-col items-center py-5">

        {/* Logo */}
        <a
          href="#home"
          className="font-serif text-3xl tracking-[0.25em] text-[#183b2b]"
        >
          MATCHA HOUSE
        </a>

        {/* Navigation */}
        <nav className="mt-3 flex gap-12 text-base text-[#183b2b]">
          <a
            href="#home"
            className="border-b-2 border-[#183b2b] pb-1 transition-colors hover:text-[#557a62]"
          >
            Home
          </a>

          <a
            href="#menu"
            className="pb-1 transition-colors hover:text-[#557a62]"
          >
            Menu
          </a>
        </nav>

      </div>
    </header>
  )
}

export default Navbar