"use client";

import Image from "next/image";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollText,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href={"/"}>
          <Image
            src={"/Logo.svg"}
            alt="Logotipo fsw food"
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="secondary"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            {data?.user ? (
              <div className="mt-6 space-y-6">
                <div className="mt-6 flex items-center gap-3">
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
                    <h3 className="font-semibold">{data.user.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data.user.email}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <Button className="w-full justify-start gap-3 rounded-full text-sm font-normal">
                    <HomeIcon size={16} />
                    <span className="text-sm font-semibold">Inicio</span>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 rounded-full text-sm font-normal"
                    asChild
                  >
                    <Link href={"/my-orders"}>
                      <ScrollText size={16} />
                      <span className="text-sm font-semibold">
                        Meus Pedidos
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3 rounded-full text-sm font-normal"
                  >
                    <HeartIcon size={16} />
                    <span className="text-sm font-semibold">
                      Restaurantes Favoritos
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-between">
                <h2 className="font-semibold">Ola, faça login</h2>
                <Button size={"icon"} onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              </div>
            )}
            <Separator />
            <div>Categories</div>
            {data?.user && (
              <>
                <Separator />
                <Button
                  variant={"ghost"}
                  className="w-full justify-start gap-3 rounded-full"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <span>Sair da conta</span>
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
