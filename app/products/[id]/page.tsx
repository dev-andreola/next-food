import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const drinks = await db.product.findMany({
    where: {
      category: { name: "Sucos" },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="mb-6 hidden lg:block lg:border-b-[1px] lg:border-neutral-200 lg:pb-6">
        <Header />
      </div>

      <div className="lg:hidden">
        <ProductImage name={product.name} imageUrl={product.imageUrl} />
      </div>

      <ProductDetails product={product} complementaryProducts={drinks} />
    </div>
  );
};

export default ProductPage;
