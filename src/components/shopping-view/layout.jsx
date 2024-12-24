
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      {/* common footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;