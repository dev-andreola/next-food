"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  name: string;
  imageUrl: string;
}

const RestaurantImage = ({ imageUrl, name }: RestaurantImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[215px] w-full">
      <Image src={imageUrl} fill alt={name} className="object-cover" />

      <Button
        onClick={() => router.back()}
        size={"icon"}
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size={"icon"}
        className="absolute right-4 top-4 rounded-full bg-gray-400/60"
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
