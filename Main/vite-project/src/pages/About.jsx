import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
export default function About() {

    const navigate = useNavigate();
  return (
    <div className="container-fluid p-0">

      {/* HERO SECTION */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">PowerTech Electricals</h1>
          <p className="lead">
            Delivering Reliable Electrical Solutions Since 2010
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <h2 className="fw-bold mb-3">About Us</h2>
            <p className="text-muted">
              PowerTech Electricals is a trusted electrical service provider
              offering residential, commercial, and industrial electrical
              solutions. We focus on safety, quality, and customer satisfaction.
            </p>
            <p className="text-muted">
              Our certified electricians ensure reliable installations,
              maintenance, and repair services using modern tools and best
              industry practices.
            </p>
          </div>

          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1581091012184-5c39f1a2f0f5"
              alt="Electrical Service"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Services</h2>

          <div className="row g-4">
            {[
              "Residential Wiring & Installation",
              "Commercial Electrical Setup",
              "Industrial Power Systems",
              "Solar Panel Installation",
              "Electrical Maintenance & Repair",
              "LED Lighting & Energy Solutions",
            ].map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="fw-semibold">{service}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>

        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold text-primary">10+ Years</h5>
              <p className="small text-muted">Industry Experience</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold text-primary">Certified</h5>
              <p className="small text-muted">Professional Electricians</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold text-primary">24/7</h5>
              <p className="small text-muted">Emergency Support</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 shadow-sm rounded bg-white">
              <h5 className="fw-bold text-primary">Affordable</h5>
              <p className="small text-muted">Competitive Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Our Mission & Vision</h2>
          <p className="text-light">
            Our mission is to deliver safe, efficient, and innovative
            electrical solutions while building long-term relationships
            with our customers.
          </p>
          <p className="text-light">
            We aim to become the most trusted electrical service provider
            in the region through quality work and customer satisfaction.
          </p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="container text-center py-5">
        <h3 className="fw-bold mb-3">Need Electrical Service?</h3>
        <p className="text-muted mb-4">
          Contact us today for professional and reliable electrical solutions.
        </p>
        <button onClick={()=>navigate("/contact")} className="btn btn-primary btn-lg">
          Contact Us
        </button>
      </section>

    </div>
  );
}