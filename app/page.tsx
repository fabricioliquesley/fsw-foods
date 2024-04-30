import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductLists from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 px-5 pt-6">
        <Search />
        <CategoryList />
        <PromoBanner
          src={"/banner_pizza.png"}
          alt="Banner promocional, pizzas com até 30% de desconto"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductLists products={products} />
      </div>
      <div className="px-6 pt-6">
        <PromoBanner
          src={"/banner_hamburguer.png"}
          alt="Lanches a partir de R$17,90"
        />
      </div>
    </>
  );
};

export default Home;
