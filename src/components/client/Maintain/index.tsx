
import { Link } from "react-router-dom";
import "./maintain.scss"
import { FaFacebookF } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai"
import { IoLogoInstagram } from 'react-icons/io'

type PrivateRouteProps = {
  children: JSX.Element;
  isMaintain: number;
};

const Maintain = ({ children, isMaintain }: PrivateRouteProps) => {
  
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
            <div className="pp-social-icons pp-social-icons-center pp-responsive-center">
              <span className="pp-social-icon">
                <Link itemProp="sameAs" to="#" target="_blank" title="Facebook" aria-label="Facebook" role="button">
                  <FaFacebookF />
                </Link>
              </span>
              <span className="pp-social-icon">
                <Link itemProp="sameAs" to="#" target="_blank" title="Twitter" aria-label="Twitter" role="button">
                  <AiFillTwitterCircle />
                </Link>
              </span>
              <span className="pp-social-icon">
                <Link itemProp="sameAs" to="#" target="_blank" title="Instagram" aria-label="Instagram" role="button">
                  <IoLogoInstagram />
                </Link>
              </span>
            </div>
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
