"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { cn } from "@/app/_lib/utils";
import { formatCurrency } from "@/app/_utils/price";
import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const background =
    order.status != "COMPLETED"
      ? "bg-green-500 text-white"
      : "bg-[#EEEEEE] text-muted-foreground";

  let orderStatus;

  switch (order.status) {
    case "CONFIRMED":
      orderStatus = "Confirmado";
      break;
    case "CANCELED":
      orderStatus = "Cancelado";
      break;
    case "PREPARING":
      orderStatus = "Preparando";
      break;
    case "DELIVERING":
      orderStatus = "Em transporte";
      break;
    case "COMPLETED":
      orderStatus = "Finalizado";
      break;
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className={cn("w-fit rounded-full px-2 py-1", background)}>
          <span className="block text-xs font-semibold">{orderStatus}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <h3 className="text-sm font-semibold">{order.restaurant.name}</h3>
          </div>
          <Button variant={"ghost"} size={"icon"} className="h-6 w-6" asChild>
            <Link href={`/restaurant/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <Separator />
        <div className="space-y-2">
          {order.products.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-[6px]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted-foreground text-white">
                <span className="block text-xs">{orderProduct.quantity}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-xs text-primary"
            disabled={order.status != "COMPLETED"}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
