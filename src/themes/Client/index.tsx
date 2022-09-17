import { useEffect, useState } from "react";
import  ClientHeader  from "./Header";

type ClientLayoutProps = {
  children: JSX.Element;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="font-montserrat">
      <ClientHeader />
      <main>{children}</main>
    </div>
  );
};

export default ClientLayout;
