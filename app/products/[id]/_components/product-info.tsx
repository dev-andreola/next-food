"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>;
  extraProducts: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
}

const ProductInfo = ({ product, extraProducts }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const HandleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);

  const HandleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white pb-5">
      <div className="p-5">
        {/* RESTAURANT */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        {/* PRODUCT NAME */}
        <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

        {/* PRODUCT PRICE AND QUANTITY */}
        <div className="flex items-center justify-between">
          {/* PRICE */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {product.discountPercentage > 0
                  ? formatCurrency(Number(calculateProductTotalPrice(product)))
                  : formatCurrency(Number(product.price))}
              </h2>
              {product.discountPercentage && (
                <DiscountBadge
                  discountPercentage={product.discountPercentage}
                />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <p className=" text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={HandleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size={"icon"} onClick={HandleIncreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* DELIVERY INFO */}
        <Card className="mt-6 flex justify-around py-2">
          {/* FEE */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
          {/* TIME */}
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <TimerIcon size={14} />
              </div>

              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes}min
              </p>
            </div>
          </div>
        </Card>

        {/* ABOUT */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>
      {/* DRINKS */}
      <div className="mt-6 space-y-3">
        <h3 className="ml-5 font-semibold">Bebidas</h3>
        <ProductList products={extraProducts} />
      </div>
    </div>
  );
};

export default ProductInfo;
