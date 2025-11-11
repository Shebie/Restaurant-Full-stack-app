import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-24 p-6 bg-[#FFF8EF] min-h-screen text-[#2E2E2E]">
      <h2 className="text-3xl font-bold mb-6">Your Bucket</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your bucket is empty 😢</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow-md flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                  <p className="font-semibold mt-1">Rs. {item.price} x {item.quantity}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 text-black rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow-md text-lg font-semibold flex justify-between items-center">
            <span>Total:</span>
            <span>Rs. {total.toFixed(0)}</span>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};
 
export default Cart;
