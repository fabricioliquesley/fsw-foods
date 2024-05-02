import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_utils/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseCartProductQuantity,
    increaseCartProductQuantity,
    removerProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseCartProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseCartProductQuantity(cartProduct.id);

  const handleRemoveProductClick = () => 
    removerProductFromCart(cartProduct.id);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3>{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculateProductTotalPrice(cartProduct))}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>
          <div className="flex items-center text-center">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-6 text-xs">{cartProduct.quantity}</span>
            <Button
              size={"icon"}
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
