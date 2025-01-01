import { ArcaLogo } from "@/app/public/arcaLogo";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex h-20 bg-header justify-between p-5">
      <Link href={"/board"}>
        <ArcaLogo className="text-white w-full h-full" />
      </Link>
      <Link href={"/board/login"}>
        <UserIcon className="w-full h-full text-white" />
      </Link>
    </header>
  );
};
