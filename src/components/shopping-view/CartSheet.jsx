/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Sheet } from "../ui/sheet";
import UserCartWrapper from "../shopping-view/cart-wrapper";
import {  ShoppingCart } from "lucide-react";

const CartSheet = ({openCartSheet, setOpenCartSheet, cartItems}) => {
  return (
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
  )
}

export default CartSheet