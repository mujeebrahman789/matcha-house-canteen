
import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cart, cartCount, cartTotal } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)

  const today = new Date()
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setError('')

    if (cart.length === 0) {
      setError('Your cart is empty. Please return to the menu.')
      return
    }

    if (!name.trim() || !phone.trim() || !pickupDate || !pickupTime) {
      setError('Please fill in all the details.')
      return
    }

    if (!/^\d{10,15}$/.test(phone.trim())) {
      setError('Enter a valid phone number using 10–15 digits.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: name.trim(),
          phone: phone.trim(),
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to save your order.')
      }

      setOrder(data)
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot reach the server. Make sure Flask is running.'
          : err.message || 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Temporary order-saved confirmation.
  // Payment has NOT been made at this stage.
  if (order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3e9] px-6 py-12">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">✓</div>

          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[#557a62]">
            Matcha House
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#183b2b]">
            Order Saved!
          </h1>

          <p className="mt-4 text-[#66756b]">
            Your order has been saved, but payment is still pending.
            Your order is not confirmed yet.
          </p>

          <div className="mt-7 rounded-xl bg-[#f7f3e9] p-5 text-left">
            <p className="text-sm text-[#66756b]">Order number</p>
            <p className="mt-1 text-xl font-semibold text-[#183b2b]">
              {order.order_number}
            </p>

            <div className="mt-4 flex justify-between gap-4">
              <span className="text-[#66756b]">Total</span>
              <span className="font-semibold text-[#183b2b]">
                ₹{Number(order.total_amount).toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex justify-between gap-4">
              <span className="text-[#66756b]">Payment</span>
              <span className="font-medium text-amber-700">
                Pending
              </span>
            </div>
          </div>

          <p className="mt-5 text-sm text-[#66756b]">
            Next, we'll connect the payment gateway.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f3e9]">
      <header className="border-b border-[#183b2b]/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm text-[#557a62] hover:text-[#183b2b]"
          >
            ← Back to Menu
          </button>

          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#557a62]">
              Matcha House
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#183b2b]">
              CHECKOUT
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <h2 className="font-serif text-3xl text-[#183b2b]">
                Pickup Details
              </h2>

              <p className="mt-2 text-sm text-[#66756b]">
                Tell us when you'll collect your order.
              </p>

              <form onSubmit={handlePlaceOrder} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#183b2b]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-[#183b2b]/15 px-4 py-3 outline-none focus:border-[#183b2b]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#183b2b]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10–15 digit phone number"
                    maxLength={15}
                    className="w-full rounded-lg border border-[#183b2b]/15 px-4 py-3 outline-none focus:border-[#183b2b]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#183b2b]">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      required
                      min={localToday}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full rounded-lg border border-[#183b2b]/15 px-4 py-3 outline-none focus:border-[#183b2b]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#183b2b]">
                      Pickup Time
                    </label>
                    <select
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full rounded-lg border border-[#183b2b]/15 bg-white px-4 py-3 outline-none focus:border-[#183b2b]"
                    >
                      <option value="">Select time</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="2:30 PM">2:30 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg bg-[#f7f3e9] p-4">
                  <p className="text-sm text-[#557a62]">
                    🍵 Your order will be prepared around your selected pickup time.
                  </p>
                </div>

                {error && (
                  <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full rounded-lg bg-[#183b2b] px-6 py-4 font-medium text-white transition hover:bg-[#28543e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'SAVING ORDER...' : 'PLACE ORDER →'}
                </button>
              </form>
            </div>
          </div>

          <aside>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-[#557a62]">
                Your Order
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#183b2b]">
                SUMMARY
              </h2>

              <div className="mt-6 divide-y divide-[#183b2b]/10">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 py-4">
                    <div>
                      <p className="font-medium text-[#183b2b]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-[#66756b]">
                        × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-[#183b2b]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-[#183b2b]/10 pt-5">
                <div className="flex justify-between text-sm text-[#66756b]">
                  <span>Items</span>
                  <span>{cartCount}</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span className="text-lg font-medium text-[#183b2b]">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-[#183b2b]">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Checkout
