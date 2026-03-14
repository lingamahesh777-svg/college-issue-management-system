import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/issueApi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData);

      // ✅ Only allow specific admin email
      if (formData.email !== "lingamahesh777@gmail.com") {
        alert("Access Denied ❌ Not an Admin");
        setLoading(false);
        return;
      }

      // Store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful ✅");
    navigate("/admin", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl w-96 shadow-md space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-red-600 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-red-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-red-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
