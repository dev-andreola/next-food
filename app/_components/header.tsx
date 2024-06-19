"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Search from "./search";

import { PiHamburger, PiPizza, PiForkKnife } from "react-icons/pi";
import { BiSushi } from "react-icons/bi";
import { BsCupStraw } from "react-icons/bs";
import { TbCandy } from "react-icons/tb";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data } = useSession();
  const pathname = usePathname();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 ">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="hidden w-[500px] lg:block">
        <Search />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant={pathname === "/my-orders" ? "default" : "ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant={
                    pathname === "/my-favorite-restaurants"
                      ? "default"
                      : "ghost"
                  }
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant={
                pathname ===
                "/categories/f448d4ab-21ee-492e-944a-b1a5b4170ef7/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/f448d4ab-21ee-492e-944a-b1a5b4170ef7/products">
                <PiHamburger size={16} />
                <span className="block">Hambúrgueres</span>
              </Link>
            </Button>

            <Button
              variant={
                pathname ===
                "/categories/cf9ae18b-8dda-41ad-ad40-a1c1c8f8f6c5/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/cf9ae18b-8dda-41ad-ad40-a1c1c8f8f6c5/products">
                <PiPizza size={16} />

                <span className="block">Pizzas</span>
              </Link>
            </Button>

            <Button
              variant={
                pathname ===
                "/categories/4cbbb29c-e97a-4734-ac6d-b2dbf1cf67e2/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/4cbbb29c-e97a-4734-ac6d-b2dbf1cf67e2/products">
                <BiSushi size={16} />

                <span className="block">Japonesa</span>
              </Link>
            </Button>

            <Button
              variant={
                pathname ===
                "/categories/11e44389-b9f0-4df4-a500-ec3fa939f166/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/11e44389-b9f0-4df4-a500-ec3fa939f166/products">
                <PiForkKnife size={16} />

                <span className="block">Brasileira</span>
              </Link>
            </Button>

            <Button
              variant={
                pathname ===
                "/categories/69b9043c-3915-49fa-9e7d-8ee4aeb088f7/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/69b9043c-3915-49fa-9e7d-8ee4aeb088f7/products">
                <BsCupStraw size={16} />

                <span className="block">Sucos</span>
              </Link>
            </Button>

            <Button
              variant={
                pathname ===
                "/categories/b8cef5ab-f313-4c3f-a2d0-77da94394087/products"
                  ? "default"
                  : "ghost"
              }
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/categories/b8cef5ab-f313-4c3f-a2d0-77da94394087/products">
                <TbCandy size={16} />

                <span className="block">Sobremesas</span>
              </Link>
            </Button>
          </div>

          <div className="py-3">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
