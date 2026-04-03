import { useEffect, useState } from "react";
import { getIssues, updateIssue } from "../api/issueApi";


const Solver = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [solverData, setSolverData] = useState({});

  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const res = await getIssues();

      // ✅ Show only OPEN and IN_PROCESS
      const filtered = res.data.issues.filter(
        (issue) =>
          issue.status === "OPEN" ||
          issue.status === "IN_PROGRESS"
      );

      setIssues(filtered);
    } catch (err) {
      setError("Backend server is not running ❌");
    } finally {
      setLoading(false);
    }
  };

  fetchIssues();
}, []);

  // Handle Input Change
  const handleChange = (id, field, value) => {
    setSolverData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Save Solver Info
 // Save Solver Info
const handleSave = async (id) => {
  try {
    const res = await updateIssue(id, {
     
      solverName: solverData[id]?.solverName,
      solverPhone: solverData[id]?.solverPhone,
    });

    setSolverData((prev) => ({
  ...prev,
  [id]: {
    solverName: "",
    solverPhone: "",
  },
}));


    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? res.data.issue : issue
      )
    );

    alert("Solver Assigned Successfully ✅");
  } catch (err) {
    console.log(err);   // 👈 VERY IMPORTANT
    alert("Update Failed ❌");
  }
};




  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </p>
    );

 return (
  <div className="min-h-screen bg-gray-100">

    {/* Header */}
    <div className="bg-white shadow-sm border-b px-8 py-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        Issue Management (Admin)
      </h1>
    </div>

    <div className="max-w-6xl mx-auto p-8">

      {issues.length === 0 ? (
        <p className="text-center text-gray-500">
          No active issues 🎉
        </p>
      ) : (
        <div className="space-y-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-6 items-start">

                {issue.image && (
                  <img
                    src={`https://college-issue-management-system.onrender.com/uploads/${issue.image}`}
                    alt="issue"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                )}

                <div className="flex-1 space-y-4">

                  {/* Top Row */}
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {issue.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(issue.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full
                        ${
                          issue.status === "OPEN"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }
                      `}
                    >
                      {issue.status.replace("_", " ")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {issue.issue}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><strong>Location:</strong> {issue.issuePlace}</p>
                    <p><strong>Address:</strong> {issue.address}</p>
                  </div>

                  <p className="text-sm text-gray-700">
                    {issue.description}
                  </p>

                  {/* Solver Section */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-3 text-gray-700">
                      Assign Solver
                    </h4>

                    <input
                      type="text"
                      placeholder="Solver Name"
                      className="w-full mb-3 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={solverData[issue._id]?.solverName || ""}
                      onChange={(e) =>
                        handleChange(issue._id, "solverName", e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Solver Phone"
                      className="w-full mb-3 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={solverData[issue._id]?.solverPhone || ""}
                      onChange={(e) =>
                        handleChange(issue._id, "solverPhone", e.target.value)
                      }
                    />

                    <button
                      onClick={() => handleSave(issue._id)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                    >
                      Save Solver
                    </button>

                    {/* Show Saved Solver */}
                    {issue.solverName && (
                      <div className="mt-3 text-sm text-gray-600">
                        <p><strong>Assigned:</strong> {issue.solverName}</p>
                        <p><strong>Phone:</strong> {issue.solverPhone}</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default Solver;
