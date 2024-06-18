"use client";

import Image from "next/image";
import Header from "../../_components/header";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignIn = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <div>
      <div className="mb-6 border-b-[1px] border-neutral-200 pb-6">
        <Header />
      </div>
      <div className="mx-5">
        <div className="mx-auto flex h-[500px] max-w-3xl flex-col rounded-md border-[1px] border-neutral-200">
          <h1 className="mt-6 text-center font-semibold">Login</h1>
          <p className="mx-auto mb-6 mt-1 w-[200px] text-center text-xs text-muted-foreground">
            Conecte-se usando sua conta do Google ou Github.
          </p>
          <div className="mx-auto flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              onClick={() => handleSignIn("google")}
            >
              <FcGoogle />
              Entrar com o Google
            </button>
            <button
              className=" mb-4 flex items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300 px-3 py-1 hover:bg-neutral-100"
              onClick={() => handleSignIn("github")}
            >
              <FaGithub />
              Entrar com o GitHub
            </button>
          </div>

          <div className="relative mt-auto h-[380px] w-full">
            <Image
              src="https://miro.medium.com/v2/resize:fit:1200/1*ppozTZz2SgLTUN6wA1c4sw.png"
              alt="UaiFood Layout"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
