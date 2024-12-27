
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import MobileNavigation from "./MobileNavigation";
import FloatingCartButton from "./FloatingCartButton";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <FloatingCartButton/>
      {/* common footer */}
      <ShoppingFooter />
      <MobileNavigation /> {/* Added Mobile Navigation */}
    </div>
  );
}

export default ShoppingLayout;