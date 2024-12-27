import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sheet } from "../ui/sheet";
import UserCartWrapper from "../shopping-view/cart-wrapper";



function FloatingCartButton() {
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      
      setPosition(prev => ({
        x: Math.min(Math.max(0, prev.x + dx), window.innerWidth - 80),
        y: Math.min(Math.max(0, prev.y + dy), window.innerHeight - 80)
      }));
      
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPos]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none"
      }}
      onMouseDown={handleMouseDown}
      className="p-4 bg-slate-800/20 hover:bg-gray-600 rounded-full text-white shadow-lg flex items-center justify-center"
    >
      {!isAuthenticated ? (
         <button
         onDoubleClick={() => navigate("/auth/login")}
         className="flex items-center justify-center"
         style={{
           outline: "none",
           border: "none",
           background: "none",
           cursor: "pointer",
         }}
       >
         <ShoppingCartIcon size={24} />
       </button>
   
      ) : (
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <button
          onDoubleClick={() => setOpenCartSheet(true)}
          className="flex items-center justify-center"
          style={{
            outline: "none",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
           <ShoppingCartIcon size={24} />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm  text-slate-900/75">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      )}
    </div>
  );
}

export default FloatingCartButton;
