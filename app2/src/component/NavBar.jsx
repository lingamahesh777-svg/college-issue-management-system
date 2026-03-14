import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

 const token = localStorage.getItem("token");
 const isAdmin = localStorage.getItem("admin");

const handleLogout = () => {
  localStorage.clear();

  navigate("/", { replace: true });

  window.location.reload();
};
  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-6">
            <button
              className="text-2xl"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>

            <div className="text-xl font-bold text-red-600">
              MyWebsite
            </div>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            <Link to="/home" className=" hover:text-blue-600">Home</Link>
            <Link to="/about" className=" hover:text-blue-600">About</Link>
            <Link to="/contact" className=" hover:text-blue-600">Contact</Link>

            {token && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* SIDEBAR OVERLAY */}
      {isOpen && (
        <>
          {/* Background Blur */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 flex flex-col justify-between p-6">

            {/* TOP LINKS */}
            <div className="space-y-6">
              <button
                className="text-xl mb-4"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>

              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-600"
              >
                Contact
              </Link>
            </div>

            {/* BOTTOM SECTION */}
            <div className="space-y-4">
              <Link
                to={isAdmin ? "/admin" : "/admin-login"}
                onClick={() => setIsOpen(false)}
                className="block bg-red-500 text-white text-center py-2 rounded-lg hover:bg-blue-500"
              >
                Admin Panel
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-blue-500"
              >
                Logout
              </button>
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
