import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { getCurrentUser } from "../../../redux/slice/AuthSlice";
import { AuthApi } from "../../../service/authApi";

type Props = {};

const LoadingPushAccountInLocalStorage = (props: Props) => {
   const dispatch = useAppDispatch();




   return <div>ssasxas</div>;
};

export default LoadingPushAccountInLocalStorage;
