import { useEffect, useState } from "react";
import  ClientHeader  from "../../components/client/Header";

type ClientLayoutProps = {
  children: JSX.Element;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="bg-[#151f32] min-h-screen">
      <ClientHeader />
      <main>{children}</main>
    </div>
  );
};

export default ClientLayout;
