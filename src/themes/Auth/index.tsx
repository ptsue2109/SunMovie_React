import React, { useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
// import { StyledFirebaseAuth } from "react-firebaseui";
// import "firebase/compat/auth";
import "./index.scss";
import configRoute from "../../config";

// const config = {
//   apiKey: "AIzaSyCUdof8BHr8LfDIZIYDCvDv1e8mjmIpgGY",
//   authDomain: "my-app-7bb3f.firebaseapp.com",
// };
// firebase.initializeApp(config);

type Props = {
  children: JSX.Element;
};
// const uiConfig = {
//   signInFlow: "redirect",
//   signInSuccessUrl: configRoute.routes.home,
//   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
// };

const AuthCore = ({ children }: Props) => {
  // const [isSignedIn, setIsSignedIn] = useState(false);

  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       setIsSignedIn(!!user);
  //       if (user) {
  //         console.log("LOgin success", user);
  //       }
  //     });
  //   return () => unregisterAuthObserver();
  // }, []);

  return (
    <div className="wrapper">
      <div className="auth_content">
        <div className="auth-left">
          <div className="auth-left__title">
            <h3>Cuộc sống hàng ngày dễ chịu, niềm vui hàng ngày</h3>
          </div>
          <div className="auth-left__desc">
            <p>
              Sử dụng các hàng hóa và dịch vụ nhân vật khác nhau của SunMovie
              với tài khoản SumMovie Friends của bạn!
            </p>
          </div>
          <div className="auth-left__image">
            <img src="https://theme.hstatic.net/200000300614/1000924855/14/page_login_content_image.png?v=132" />
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-right__main">{children}</div>
          <div className="auth-right__footer">
            <div className="divider text-center font-bold">OR</div>
            <div className="">
              <div className="">
                {/* <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCore;
