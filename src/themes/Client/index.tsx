import { useEffect, useState } from "react";
import Footer from "../../components/client/Footer/Footer";
import  ClientHeader  from "../../components/client/Header";

type ClientLayoutProps = {
  children: JSX.Element;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <div className="bg-[#151f32] min-h-screen">
      <div className="mb-[70px]">
        <ClientHeader />
      </div>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default ClientLayout;
