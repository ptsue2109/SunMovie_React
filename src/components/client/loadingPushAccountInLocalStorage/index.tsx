import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { getCurrentUser } from "../../../redux/slice/AuthSlice";
import { AuthApi } from "../../../service/authApi";

type Props = {};

const LoadingPushAccountInLocalStorage = (props: Props) => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getCurrentUser({}));
   }, []);

   return <div></div>;
};

export default LoadingPushAccountInLocalStorage;
