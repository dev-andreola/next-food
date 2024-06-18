"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  name: string;
  imageUrl: string;
}

const ProductImage = ({ imageUrl, name }: ProductImageProps) => {
  const router = useRouter();
  return (
    <>
      {/* MOBILE */}
      <div className="relative h-[360px] w-full lg:hidden">
        <Image
          src={imageUrl}
          fill
          alt={name}
          sizes="100%"
          className="object-cover"
        />

        <Button
          onClick={() => router.back()}
          size={"icon"}
          className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden h-[400px] w-full lg:flex">
        <Image
          src={imageUrl}
          fill
          alt={name}
          sizes="100%"
          className="rounded-md object-cover"
        />
      </div>
    </>
  );
};

export default ProductImage;
