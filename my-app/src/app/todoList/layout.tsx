import { Metadata } from "next";

export const metadata: Metadata = {
  title: "todo list입니다.",
  description: "todo list입니다",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
