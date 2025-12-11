import { ChatLayout } from "@/components/layout";
import { FC } from "react";

type TProps = Readonly<IChildren>;
const Layout: FC<TProps> = ({ children }) => {
  return <ChatLayout>{children}</ChatLayout>;
};

export default Layout;
