import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductLists from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 px-5 pt-6">
        <Search />
        <CategoryList />
        <Image
          src={"/banner_pizza.png"}
          alt="Banner promocional, pizzas com até 30% de desconto"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="10ovw"
        />
      </div>
      <div className="pt-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="p-0 text-primary hover:bg-transparent h-fit"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductLists />
      </div>
    </>
  );
}
