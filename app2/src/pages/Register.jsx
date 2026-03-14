import { useState } from "react";
import { registerUser } from "../api/issueApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl w-96 shadow-md space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-green-600 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-green-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-green-600 cursor-pointer ml-1 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
