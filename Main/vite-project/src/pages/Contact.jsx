import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="container-fluid p-0">

      {/* HERO */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Contact Bajrang Krupa Electricals</h1>
          <p className="lead">We are here to help you</p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="container py-5">
        <div className="row g-4">

          {/* Contact Info */}
          <div className="col-lg-5">
            <div className="shadow-sm p-4 rounded bg-light h-100">
              <h4 className="fw-bold mb-3">Contact Information</h4>

              <p className="mb-2">
                📍 <strong>Address:</strong><br />
                Main Market Road, Your City
              </p>

              <p className="mb-2">
                📞 <strong>Phone:</strong><br />
                +91 98765 43210
              </p>

              <p className="mb-2">
                📧 <strong>Email:</strong><br />
                info@bajrangkrupa.com
              </p>

              <p className="mb-0">
                🕒 <strong>Working Hours:</strong><br />
                Mon - Sat: 9:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="shadow-sm p-4 rounded bg-white">
              <h4 className="fw-bold mb-3">Send Us a Message</h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}