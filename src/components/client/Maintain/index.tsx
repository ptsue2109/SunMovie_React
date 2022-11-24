
import { Link } from "react-router-dom";
import "./maintain.scss"
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from 'react-icons/io'
import { useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
  isMaintain: number;
};

const Maintain = ({ children, isMaintain }: PrivateRouteProps) => {
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const social = webConfigs[0]?.social;
  useEffect(() => {
    document.title = "Website đang bảo trì"
  }, [])
  const renderSocial = () => {
    return (
      <div className="pp-social-icons pp-social-icons-center pp-responsive-center">
        {social && social?.map((item: any) => (
          <div key={item?._id}>
            <span className="pp-social-icon">
              <a itemProp="sameAs" href={item?.text} target="_blank" title={item?.name} aria-label={item?.name} role="button">
                {item?.name === "Facebook" ? <FaFacebookF /> : <IoLogoInstagram />}
              </a>
            </span>
          </div>
        ))}
      </div>
    )
  }

  const mainTainPage = () => {
    return (
      <>
        <div className="maintenance">
          <div className="maintenance_contain">
            <img src="https://demo.wpbeaveraddons.com/wp-content/uploads/2018/02/main-vector.png" alt="maintenance" />
            <span className="pp-infobox-title-prefix">WE ARE COMING SOON</span>
            <div className="pp-infobox-title-wrapper">
              <h3 className="pp-infobox-title">The website under maintenance!</h3>
            </div>
            <div className="pp-infobox-description">
              <p>Someone has kidnapped our site. We are negotiation ransom and<br />will resolve this issue in 24/7 hours</p>			</div>
            <span className="title-text pp-primary-title">We are social</span>
            {renderSocial()}
          </div>
        </div>
      </>
    );
  };
  if (isMaintain) {
    return <>{mainTainPage()}</>;
  } else {
    return children;
  }
};

export default Maintain;
