"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section className="container text-center py-24">
      <div>개인적으로 공부합니다</div>
      <CusLink href={"/todoList"}>todoList 링크</CusLink>
      <CusLink href={"/board"}>게시판 링크</CusLink>
    </section>
  );
}

const CusLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <div className="p-2">
      <Link
        className="font-bold hover:text-blue-600 hover:underline"
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};
