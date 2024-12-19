import { Metadata } from "next";

export const metadata: Metadata = {
  title: "게시판",
  description: "아카라이브 게시판 따라했습니다(2번째)",
  //   openGraph: { images: "그런건없다" },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
