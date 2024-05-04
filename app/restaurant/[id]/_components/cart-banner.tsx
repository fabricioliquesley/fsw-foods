"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_utils/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpenClick = () => setIsCartOpen(true);

  const restaurantHasProductsOnCart = products.some((product) => {
    return product.restaurantId === restaurant.id;
  });

  if (!restaurantHasProductsOnCart) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full border-t border-solid border-muted-foreground bg-white p-5 pt-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">
              Total sem entrega
            </span>
            <h3 className="font-semibold">
              {formatCurrency(totalPrice)}
              <span className="text-xs text-muted-foreground">
                {" "}
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </h3>
          </div>
          <Button onClick={handleCartOpenClick}>Ver sacola</Button>
        </div>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen}/>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartBanner;
