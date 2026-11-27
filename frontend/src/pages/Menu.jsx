import { useState } from 'react'
import { useCart } from '../context/CartContext'

const foodItems = [
  {
    id: 1,
    name: 'Chicken Burger',
    description: 'Juicy chicken patty with fresh lettuce and house sauce.',
    price: 120,
    category: 'Burgers',
    type: 'non-veg',
    preparationTime: '10–15 min',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    id: 2,
    name: 'Paneer Burger',
    description: 'Crispy paneer patty with lettuce, tomato and creamy sauce.',
    price: 110,
    category: 'Burgers',
    type: 'veg',
    preparationTime: '10–15 min',
    popular: false,
    image:
      'https://images.unsplash.com/photo-1550317138-10000687a72b',
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella and fresh herbs.',
    price: 150,
    category: 'Pizza',
    type: 'veg',
    preparationTime: '15–20 min',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  },
  {
    id: 4,
    name: 'Veg Hakka Noodles',
    description: 'Wok-tossed noodles with fresh vegetables and Asian sauces.',
    price: 100,
    category: 'Noodles',
    type: 'veg',
    preparationTime: '10–15 min',
    popular: false,
    image:
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841',
  },
  {
    id: 5,
    name: 'Chicken Wrap',
    description: 'Tender chicken, fresh vegetables and creamy dressing.',
    price: 130,
    category: 'Wraps',
    type: 'non-veg',
    preparationTime: '10–15 min',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1626700051175-6818013e1d4f',
  },
  {
    id: 6,
    name: 'Chicken Rice Bowl',
    description: 'Flavourful rice topped with grilled chicken and vegetables.',
    price: 140,
    category: 'Rice Bowls',
    type: 'non-veg',
    preparationTime: '15–20 min',
    popular: false,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19',
  },
  {
    id: 7,
    name: 'Matcha Latte',
    description: 'Smooth ceremonial-style matcha blended with creamy milk.',
    price: 90,
    category: 'Beverages',
    type: 'veg',
    preparationTime: '5–10 min',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002',
  },
  {
    id: 8,
    name: 'Strawberry Matcha',
    description: 'Refreshing strawberry, milk and matcha layered together.',
    price: 110,
    category: 'Beverages',
    type: 'veg',
    preparationTime: '5–10 min',
    popular: true,
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
  },
]

const categories = [
  'All',
  'Burgers',
  'Pizza',
  'Noodles',
  'Wraps',
  'Rice Bowls',
  'Beverages',
]

function Menu({ onCheckout }) {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    cartCount,
    cartTotal,
  } = useCart()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category === selectedCategory

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="menu"
      className="bg-[#f7f3e9] px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#557a62]">
            Freshly Made
          </p>

          <h2 className="mt-3 font-serif text-5xl text-[#183b2b]">
            OUR MENU
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#496454]">
            Choose your favourites, pre-order your meal and skip the queue.
          </p>
        </div>

        {/* SEARCH + CART */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* SEARCH */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#557a62]">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-[#183b2b]/15 bg-white px-11 py-3 text-[#183b2b] outline-none transition focus:border-[#183b2b]"
            />
          </div>

          {/* CART COUNT */}
          <div className="rounded-full bg-[#183b2b] px-6 py-3 text-center text-sm font-medium text-white">
            🛒 Cart: {cartCount}
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-[#183b2b] text-white'
                  : 'border border-[#183b2b]/20 bg-white text-[#183b2b] hover:bg-[#e8eee8]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FOOD GRID */}
        {filteredItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#183b2b]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* POPULAR BADGE */}
                  {item.popular && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#f7f3e9] px-3 py-1 text-xs font-semibold text-[#183b2b] shadow-sm">
                      ⭐ Popular
                    </div>
                  )}
                </div>

                {/* CARD CONTENT */}
                <div className="p-5">

                  {/* CATEGORY + VEG INDICATOR */}
                  <div className="flex items-center justify-between">

                    <span className="text-xs uppercase tracking-wider text-[#557a62]">
                      {item.category}
                    </span>

                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        item.type === 'veg'
                          ? 'text-green-700'
                          : 'text-red-600'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.type === 'veg'
                            ? 'bg-green-600'
                            : 'bg-red-600'
                        }`}
                      />

                      {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                    </span>

                  </div>

                  {/* NAME */}
                  <h3 className="mt-3 font-serif text-2xl text-[#183b2b]">
                    {item.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#66756b]">
                    {item.description}
                  </p>

                  {/* PREPARATION TIME */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#557a62]">
                    <span>⏱️</span>
                    <span>{item.preparationTime}</span>
                  </div>

                  {/* PRICE + ADD BUTTON */}
                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xl font-semibold text-[#183b2b]">
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="rounded-full bg-[#183b2b] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#28543e] hover:shadow-md"
                    >
                      + Add
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* NO RESULTS */
          <div className="mt-16 rounded-2xl border border-[#183b2b]/10 bg-white py-16 text-center">
            <div className="text-5xl">🍵</div>

            <h3 className="mt-4 font-serif text-2xl text-[#183b2b]">
              No items found
            </h3>

            <p className="mt-2 text-[#66756b]">
              Try another food name or category.
            </p>
          </div>
        )}

        {/* CART */}
        {cart.length > 0 && (
          <div className="mt-16 rounded-2xl bg-white p-6 shadow-sm md:p-8">

            <div className="flex flex-col gap-2 border-b border-[#183b2b]/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#557a62]">
                  Your Order
                </p>

                <h3 className="mt-1 font-serif text-3xl text-[#183b2b]">
                  CART
                </h3>
              </div>

              <p className="text-sm text-[#66756b]">
                {cartCount} item{cartCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* CART ITEMS */}
            <div className="divide-y divide-[#183b2b]/10">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* ITEM INFO */}
                  <div>
                    <h4 className="font-serif text-xl text-[#183b2b]">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-sm text-[#66756b]">
                      ₹{item.price} each
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4">

                    <div className="flex items-center overflow-hidden rounded-full border border-[#183b2b]/20">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-4 py-2 text-lg text-[#183b2b] hover:bg-[#f1f4ed]"
                      >
                        −
                      </button>

                      <span className="min-w-10 text-center text-sm font-medium text-[#183b2b]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-4 py-2 text-lg text-[#183b2b] hover:bg-[#f1f4ed]"
                      >
                        +
                      </button>

                    </div>

                    <span className="w-20 text-right font-semibold text-[#183b2b]">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* CART TOTAL */}
            <div className="mt-6 flex flex-col gap-5 border-t border-[#183b2b]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-[#66756b]">
                  Subtotal
                </p>

                <p className="mt-1 text-3xl font-semibold text-[#183b2b]">
                  ₹{cartTotal}
                </p>
              </div>

              <button
   onClick={onCheckout}
  className="rounded-md bg-[#183b2b] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#28543e] hover:-translate-y-0.5"
>
  PROCEED TO CHECKOUT →
</button>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Menu