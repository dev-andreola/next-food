import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";

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
      <ProductImage name={product.name} imageUrl={product.imageUrl} />

      <ProductInfo product={product} extraProducts={drinks} />
    </div>
  );
};

export default ProductPage;
