import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
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
      <Button
        size="icon"
        variant="secondary"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
