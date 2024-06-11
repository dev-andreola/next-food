import Image from "next/image";
import Search from "./search";

const HeroDesktop = () => {
  return (
    <div className="relative mx-auto h-auto max-w-6xl">
      <div className="absolute h-full px-8">
        <div className="flex h-full flex-col justify-center text-white">
          <h2 className="text-5xl font-bold">Está com fome?</h2>
          <p>
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>
          <div className="mt-4 rounded-lg bg-white p-4 text-black">
            <Search />
          </div>
        </div>
      </div>
      <Image
        src={"/hero.jpg"}
        className=""
        alt="Banner"
        height={500}
        width={1152}
      ></Image>
    </div>
  );
};

export default HeroDesktop;
