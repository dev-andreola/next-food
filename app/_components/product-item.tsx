"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`} className="w-[150px] min-w-[150px]">
      <div className="w-full space-y-2">
        {/* IMAGE CONTAINER */}

        <div className="relative h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage && (
            <DiscountBadge discountPercentage={product.discountPercentage} />
          )}
        </div>

        {/* INFO CONTAINER */}

        <div>
          {/* PRODUCT NAME */}

          <h2 className="truncate text-sm">{product.name}</h2>

          {/* PRODUCT PRICE */}

          <div className="flex items-center gap-2">
            <h3 className="font-semibold ">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <span className="block truncate text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
