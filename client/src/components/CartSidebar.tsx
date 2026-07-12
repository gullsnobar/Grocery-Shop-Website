import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, XIcon } from "lucide-react";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-50"
      />

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-6" />

            <h2 className="text-lg font-semibold">
              Shopping Cart
            </h2>

            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between p-4 border-b"
              >
                <div>
                  <h3 className="font-medium">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {currency}
                    {item.product.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                    className="px-2 border rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeFromCart(item.product._id)
                    }
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-5 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              {currency}
              {cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>

            <span>
              {currency}
              {deliveryFee.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>

            <span>
              {currency}
              {grandTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              navigate("/checkout");
            }}
            className="w-full py-3 rounded-lg bg-black text-white hover:opacity-90"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;