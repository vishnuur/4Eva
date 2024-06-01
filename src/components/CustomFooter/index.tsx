import "./index.scss";
import footerLogo from "src/assets/logo-transparent.png";

export default function CustomFooter() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <p>
            A Match
            <br /> Made In Heaven
          </p>
          <img src={footerLogo}></img>
        </div>
        <div className="footer-contact">
          <p>Get In Touch</p>
          <span>
            <h4>Phone</h4>
            <h5>+91 8113841894</h5>
            <h5>+91 9048418945</h5>
          </span>
          <span>
            <h4>Email</h4>
            <a className="email-link" href="mailto:4evamatrimony@gmail.com">
              4evamatrimony@gmail.com
            </a>
          </span>
        </div>
      </div>
      <div className="footer-bottom"></div>
    </div>
  );
}
