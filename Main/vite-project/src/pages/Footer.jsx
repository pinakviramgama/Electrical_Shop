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
              <FaMapMarkerAlt className="me-2 text-danger" />
              Jamnagar Hapa railway Station Road Nr. Khira Furniture - 361120
            </p>

            <p className="mb-2">
              <FaPhoneAlt className="me-2 text-info" />
              +91 99743-48948
            </p>
          </div>

          {/* Social Links */}
          <div className="col-md-6 mb-4 text-md-end">
            <h5 className="fw-bold mb-3">Connect With Us</h5>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-info me-2"
            >Instagram &nbsp;
              <FaInstagram size={20} />
            </a>

            <a
              href="https://wa.me/919974348948"
              target="_blank"
              rel="noreferrer"
              className="btn btn-success"
            >WhatsApp &nbsp;
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} Bajrang Krupa Electricals. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
