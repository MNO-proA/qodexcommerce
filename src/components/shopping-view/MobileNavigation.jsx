import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartSheet from "./CartSheet";

function MobileNavigation() {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  // Scroll to the top when the location (route) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className="flex flex-col items-center">
          <Home
            className={`w-6 h-6 ${
              location.pathname === "/" ? "text-primary" : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/listing" className="flex flex-col items-center">
          <ShoppingBag
            className={`w-6 h-6 ${
              location.pathname === "/listing"
                ? "text-primary"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">Products</span>
        </Link>
        {isAuthenticated ? (
          <button className="flex flex-col items-center relative">
            {/* <ShoppingCart className={`w-6 h-6 ${location.pathname === '/shop/cart' ? 'text-primary' : 'text-gray-500'}`} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )} */}
            <CartSheet
              openCartSheet={openCartSheet}
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems}
            />
            <span className="text-xs mt-1">Cart</span>
          </button>
        ) : (
          <Link to="/auth/login" className="flex flex-col items-center">
            <ShoppingCart
              className={`w-6 h-6 ${
                location.pathname === "/shop/cart"
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            />
            <span className="text-xs mt-1">Cart</span>
          </Link>
        )}

        <Link
          to={isAuthenticated ? "/shop/account" : "/auth/login"}
          className="flex flex-col items-center"
        >
          <User
            className={`w-6 h-6 ${
              ["/account", "/auth/login"].includes(location.pathname)
                ? "text-primary"
                : "text-gray-500"
            }`}
          />
          <span className="text-xs mt-1">
            {isAuthenticated ? "Account" : "Login"}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;
