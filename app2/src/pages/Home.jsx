import { Link } from "react-router-dom";
import Navbar from "../component/NavBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar Full Width */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to the Issue Management Dashboard
          </h1>
          <p className="text-gray-600">
            Quick access to all sections of the application.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Link to="/create-issue" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Post Issues</h2>
              <p className="text-gray-500 text-sm">Create new issues and manage them efficiently.</p>
            </div>
            <div className="mt-4 text-blue-500 font-medium hover:underline">
              Go to Post Issues →
            </div>
          </Link>

          <Link to="/issues/open" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">Pending Issues</h2>
              <p className="text-gray-500 text-sm">View all pending issues and manage tasks efficiently.</p>
            </div>
            <div className="mt-4 text-red-500 font-medium hover:underline">
              Go to Pending Issues →
            </div>
          </Link>

          <Link to="/issues/inprogress" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">In-Progress Issues</h2>
              <p className="text-gray-500 text-sm">Track issues currently being worked on.</p>
            </div>
            <div className="mt-4 text-yellow-600 font-medium hover:underline">
              Go to In-Progress →
            </div>
          </Link>

          <Link to="/issues/resolved" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-green-600 mb-2">Resolved Issues</h2>
              <p className="text-gray-500 text-sm">Check all resolved issues and their details.</p>
            </div>
            <div className="mt-4 text-green-600 font-medium hover:underline">
              Go to Resolved →
            </div>
          </Link>

          <Link to="/UserAnnouncement" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-purple-600 mb-2">Announcements</h2>
              <p className="text-gray-500 text-sm">Read and post global announcements for everyone.</p>
            </div>
            <div className="mt-4 text-purple-600 font-medium hover:underline">
              Go to Announcements →
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
