import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // You can import social media icons from a library like react-icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
        <p style={{color:"black"}}>&copy; {new Date().getFullYear()} <span style = {{color:"black"}}>LetsGo</span></p>
      </div>
      <div className="middle">
        <a href="#"><span style = {{color:"black"}}>Contact</span></a>
        <a href="#"><span style = {{color:"black"}}>About</span></a>
      </div>
      <div className="right">
        <a href="https://www.facebook.com" >
          <FontAwesomeIcon icon="fa-brands fa-facebook" style={{color:"black"}}/>
        </a>
        <a href="https://www.twitter.com">
          <FontAwesomeIcon icon="fa-brands fa-twitter" style={{color:"black"}}/>
        </a>
        <a href="https://www.instagram.com">
          <FontAwesomeIcon icon="fa-brands fa-instagram" style={{color:"black"}}/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
