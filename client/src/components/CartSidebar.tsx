import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, XIcon, Trash2 } from "lucide-react";

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
        <div className="flex items-center justify-between p-5 border-b border-app-border">
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
            className="p-2 rounded-xl hover:bg-app-cream transition-colors"
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
                className="flex items-center gap-4 p-4 border-b border-app-border"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image || "/placeholder.png"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-sm">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {currency}
                    {item.product.price}/kg
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                    >
                      −
                    </button>

                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Delete */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() =>
                      removeFromCart(item.product._id)
                    }
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-semibold">
                    {currency}
                    {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-app-border bg-gray-50 p-5 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">
              {currency}
              {cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : ""}`}>
              {deliveryFee === 0 ? "Free" : `${currency}${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          <div className="border-t border-app-border pt-4 flex justify-between text-base font-bold">
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
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;