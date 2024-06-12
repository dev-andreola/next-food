import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import Banner from "./_components/banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import HeroDesktop from "./_components/hero-desktop";

const fetch = async () => {
  const getProducts = db.product.findMany({
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

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />

      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>

      <div className="mt-6 hidden bg-primary lg:block">
        <HeroDesktop />
      </div>

      <div className="pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <Banner
            src="/promo-banner.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="mx-auto max-w-[1170px] space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <Banner
            src="/burguer-banner.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="mx-auto hidden max-w-6xl px-8 py-6 lg:flex lg:justify-center lg:gap-4 xl:px-0">
        <div className="w-2/4">
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <Banner
              src="/promo-banner.png"
              alt="Até 30% de desconto em pizzas!"
            />
          </Link>
        </div>
        <div className="w-2/4">
          <Link href={`/categories/${burguersCategory?.id}/products`}>
            <Banner
              src="/burguer-banner.png"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1140px] space-y-4 py-6 lg:mb-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
