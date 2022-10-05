import React from "react";
import { Link } from "react-router-dom";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Trang chủ</Link>
          </li>
          <li>
            <Link to={`#`}>Phim</Link>
          </li>
          <li>
            <Link to={`#`}>Mua vé</Link>
          </li>
          <li>
            <Link to={`/tickit-price`}>Giá vé</Link>
          </li>
          <li>
            <Link to={`#`}>Tin tức</Link>
          </li>
          <li>
            <Link to={`#`}>Hỗ trợ</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
