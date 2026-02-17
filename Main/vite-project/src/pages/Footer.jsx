import {
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">

          {/* Shop Address */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Shop Address</h5>

            <p className="mb-2">
              <FaMapMarkerAlt className="me-2 text-warning" />
              Jay Mataji Store, Main Road, Jamnagar, Gujarat - 361001
            </p>

            <p className="mb-2">
              <FaPhoneAlt className="me-2 text-warning" />
              +91 98765 43210
            </p>

            <p className="mb-0">
              Email: support@yourshop.com
            </p>
          </div>

          {/* Social Links */}
          <div className="col-md-6 mb-4 text-md-end">
            <h5 className="fw-bold mb-3">Connect With Us</h5>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light me-2"
            >Instagram &nbsp;
              <FaInstagram size={20} />
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light"
            >WhatsApp &nbsp;
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} YourShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
