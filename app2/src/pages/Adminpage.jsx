import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getIssues } from "../api/issueApi";
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await getIssues();
      setIssues(res.data.issues);
    } catch (err) {
      console.error("Error fetching issues", err);
    } finally {
      setLoading(false);
    }
  };

   const navigate = useNavigate();   // 👈 ADD THIS

const handleAdminLogout = () => {
  localStorage.removeItem("admin");

  navigate("/home", { replace: true });
};

  // Prevent browser Back from leaving the admin dashboard
  useEffect(() => {
    // push a fresh state so back will stay here
    window.history.pushState(null, '', window.location.href);

    const onPop = () => {
      // Re-push the same state to effectively disable back
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  
  // ✅ Real Counts
  const totalIssues = issues.length;
  const openIssues = issues.filter(i => i.status === "OPEN").length;
  const inProgressIssues = issues.filter(i => i.status === "IN_PROGRESS").length;
  const resolvedIssues = issues.filter(i => i.status === "RESOLVED").length;

  if (loading) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage issues, announcements and system operations.
          </p>

          <button
  onClick={handleAdminLogout}
  className="bg-red-500 text-white px-4 py-2 rounded-lg"
>
  Logout
</button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Total Issues</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {totalIssues}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Open Issues</h3>
            <p className="text-2xl font-bold text-red-500 mt-2">
              {openIssues}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">In Progress</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">
              {inProgressIssues}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Resolved</h3>
            <p className="text-2xl font-bold text-green-500 mt-2">
              {resolvedIssues}
            </p>
          </div>

        </div>

        {/* ACTION SECTION */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage System
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <Link to="/issues/open" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Open Issues
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              View and manage all open issues.
            </p>
            <div className="text-red-500 font-medium hover:underline">
              Manage →
            </div>
          </Link>

          <Link to="/issues/inprogress" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">
              In-Progress Issues
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Track and update ongoing issues.
            </p>
            <div className="text-yellow-600 font-medium hover:underline">
              Manage →
            </div>
          </Link>

          <Link to="/issues/resolved" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Resolved Issues
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Review completed issues.
            </p>
            <div className="text-green-600 font-medium hover:underline">
              View →
            </div>
          </Link>

            <Link to="/update-issue" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h2 className="text-xl font-semibold text-purple-600 mb-2">
                Change Issue Status
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                Update issue progress and status.
                </p>
                <div className="text-purple-600 font-medium hover:underline">
                Update →
                </div>
            </Link>

            <Link to="/solver" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                Resolver Panel
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                Assign and manage issue resolvers.
                </p>
                <div className="text-indigo-600 font-medium hover:underline">
                Open →
                </div>
            </Link>

            <Link to="/announcements" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h2 className="text-xl font-semibold text-pink-600 mb-2">
                Create Announcements
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                Publish system-wide announcements.
                </p>
                <div className="text-pink-600 font-medium hover:underline">
                Create →
                </div>
            </Link>

        </div>

      </div>
    </div>
  );
};

export default Adminpage;
