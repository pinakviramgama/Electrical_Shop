import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email !== "owner@gmail.com" || password !== "StrongPass123") {
    return res.status(401).json({ message: "Invalid Admin Credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Admin Login Success",
    token,
  });
};
