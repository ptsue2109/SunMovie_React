import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "./Header";

type ClientLayoutProps = {
  children: any
};

const ClientLayout = ({children}: ClientLayoutProps) => {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setOffsetTop(window.scrollY);
    });
  }, []);
  return (
    <div className="">
      <ClientHeader offsetTop={offsetTop} />
      <main>
      {children}
        </main>
    </div>
  );
};

export default ClientLayout;
