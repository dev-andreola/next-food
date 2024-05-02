"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import { Button } from "../_components/ui/button";

const Restaurants = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  const searchFor = searchParams.get("search");

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-xl font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6 ">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <p className="text-muted-foreground">Restaurante não encontrado</p>
          )}
        </div>
        <Button className="mt-5 w-full" onClick={router.back}>
          Voltar
        </Button>
      </div>
    </>
  );
};

export default Restaurants;
