"use client";

import { useId } from "react";
import { Header } from "../(ui)/board/main/header";
import { Body } from "../(ui)/board/main/body";
import { ConvenienceIcons, Footer } from "../(ui)/board/main/footer";

const Page = () => {
  const rootId = useId();
  return (
    <div className="relative" id={rootId}>
      <Header />
      <Body />
      <Footer />
      <ConvenienceIcons rootId={rootId} />
    </div>
  );
};

export default Page;
