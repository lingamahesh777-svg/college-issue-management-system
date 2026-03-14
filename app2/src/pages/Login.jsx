import { useState } from "react";
import { loginUser } from "../api/issueApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);
    localStorage.setItem("token", res.data.token);
    alert("Login Successful ✅");
 navigate("/home", { replace: true });

  } catch (err) {
    alert(err.response?.data?.message || "Login Failed ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className=  "bg-white p-8 rounded-2xl w-96 shadow-md space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-blue-600 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          
       >
          Login
        </button>

        <p className="text-sm text-gray-500 text-center">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
