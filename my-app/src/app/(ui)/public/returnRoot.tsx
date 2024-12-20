import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ReturnRoot = ({ children }: { children: string }) => {
  return (
    <div className="flex justify-center py-5">
      <Link href={"/"} className="flex hover:underline hover:text-blue-700">
        <strong>{children}</strong>
        <ArrowUturnLeftIcon height={"1.5rem"} className="p-1" />
      </Link>
    </div>
  );
};
