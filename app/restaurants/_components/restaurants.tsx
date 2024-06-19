"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <div className="lg:border-b-[1px] lg:border-neutral-200 lg:pb-6">
        <Header />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Resultados para &quot;{searchFor}&quot;
        </h2>
        {!restaurants.length && (
          <p className="mt-6 text-muted-foreground">
            Nenhum restaurante encontrado!
          </p>
        )}
        <div className="flex w-full flex-col gap-6 lg:grid lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
