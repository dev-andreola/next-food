"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";
import { cn } from "../_lib/utils";

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
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "w-[150px] min-w-[150px] rounded-lg duration-100 hover:bg-gray-100",
        className,
      )}
    >
      <div className="w-full space-y-2">
        {/* IMAGE CONTAINER */}

        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="100%"
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
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
