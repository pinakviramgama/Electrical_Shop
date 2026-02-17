import axios from "axios"; // ✅ import axios
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/admin/login`, { email, password }); // ✅ use axios

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Invalid Credentials ❌");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">🔐 Admin Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
