"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_utils/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotal: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantity: number;
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: CartProduct;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseCartProductQuantity: (productId: string) => void;
  increaseCartProductQuantity: (productId: string) => void;
  removerProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotal: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseCartProductQuantity: () => {},
  increaseCartProductQuantity: () => {},
  removerProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice =
    useMemo(() => {
      return products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0);
    }, [products]) + Number(products?.[0]?.restaurant?.deliveryFee);

  const totalDiscounts =
    subtotal - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const decreaseCartProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity == 1) {
            return cartProduct;
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const increaseCartProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const addProductToCart = ({
    product,
    quantity,
  }: {
    product: CartProduct;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      setProducts([]);
    }

    const isProductsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductsAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  const removerProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotal,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        addProductToCart,
        decreaseCartProductQuantity,
        increaseCartProductQuantity,
        removerProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
