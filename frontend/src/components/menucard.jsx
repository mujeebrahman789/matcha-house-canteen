function MenuCard({ image, name, description }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

      {/* Food Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 text-center">
        <h3 className="font-serif text-2xl text-[#183b2b]">
          {name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      </div>

    </div>
  )
}

export default MenuCard