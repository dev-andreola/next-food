import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 6,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />

      <div className="hidden lg:block lg:border-b-[1px] lg:border-neutral-200 lg:pb-6">
        <Header />
      </div>

      {/* MOBILE IMAGE */}
      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 lg:hidden">
        {/* TITULO */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="mx-auto mt-6 hidden h-[380px] max-w-6xl px-5 lg:flex">
        <div className="relative h-[380px] flex-[3]">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="100%"
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-[2] flex-col pl-4">
          <div className="flex w-full items-center">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                sizes="100%"
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="ml-2 text-xl font-semibold">{restaurant.name}</h2>
            <div className="ml-auto flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">5.0</span>
            </div>
          </div>
          <DeliveryInfo restaurant={restaurant} />
          <div className="mt-3 flex gap-1">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="flex-grow-[1] rounded-lg bg-[#F4F4F4] text-center"
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <h3 className="my-3 text-lg font-semibold">Sobre</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
              officiis ullam hic obcaecati, id assumenda, sequi ut culpa
              doloremque debitis perferendis. Earum vel ratione cumque,
              provident quas placeat nemo mollitia fuga voluptates quisquam
              exercitationem. Architecto deleniti obcaecati delectus ea
              temporibus.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 lg:hidden">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] flex-grow-[1] rounded-lg bg-[#F4F4F4] text-center md:w-auto"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-6xl space-y-4">
        {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
        <h2 className="px-5  font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mx-auto mt-6 max-w-6xl space-y-4" key={category.id}>
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="px-5  font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <div className="mb-8"></div>

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
