import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import { useAppSelector } from "../../redux/hook";
type Props = {};

const Home = (props: Props) => {
  // const { currentUser } = useAppSelector((state) => state.authReducer);
  return (
    <>
      <Link to={config.routes.signup}>SIGN Up</Link>
      <Link to={config.routes.signin}> SIGN IN </Link>
 
    </>
  );
};

export default Home;
