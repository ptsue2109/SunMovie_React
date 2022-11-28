import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import styles from "./auth.module.scss";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from 'firebase/auth'
type Props = {};

const SignUpSocial = (props: Props) => {
   const handleClick = () => {
      signInWithPopup(auth, provider).then(({ user }: any) => {
         console.log('data', user);
         const output = {
            token: user?.accessToken,
            username: user?.providerData[0].displayName,
            email: user?.providerData[0].email,
            phone: user?.providerData[0].phoneNumber,
            avatar: user?.providerData[0].photoURL,
            providerId: user?.providerData[0].providerId,
            _id: user?.uid,
            status: user?.emailVerified === true ? 1 : 0
         }
         localStorage.setItem('login with google', JSON.stringify(output))
      })
   };

   const loginFb = () => {
      notification.info({message: 'Chức năng này chưa được hoàn thiện'})
   }

   return (
      <div className="flex justify-between">
         <button type="button" className={styles.loginGG} onClick={handleClick} >
            Sign in with Google
         </button>
         <button type="button" className={styles.loginFb} onClick={loginFb} >
            Sign in with Facebook
         </button>
      </div>
   );
};

export default SignUpSocial;
