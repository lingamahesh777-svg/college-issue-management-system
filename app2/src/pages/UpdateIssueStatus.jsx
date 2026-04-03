import { useEffect, useState } from "react";
import { getIssues, updateIssueStatus , deleteIssue } from "../api/issueApi";

const UpdateIssueStatus = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await getIssues();

      // 🔥 Hide RESOLVED issues when loading
      const filteredIssues = res.data.issues.filter(
        (issue) => issue.status !== "RESOLVED"
      );

      setIssues(filteredIssues);
    } catch (err) {
      alert("Error fetching issues ❌");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      await updateIssueStatus(id, status);

      setIssues((prev) =>
        prev
          .map((issue) =>
            issue._id === id ? { ...issue, status } : issue
          )
          .filter((issue) => issue.status !== "RESOLVED") // 🔥 remove if resolved
      );

      alert("Status updated ✅");
    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this issue?");

  if (!confirmDelete) return;

  try {
    await deleteIssue(id);

    setIssues((prev) => prev.filter((issue) => issue._id !== id));

    alert("Issue deleted successfully 🗑️");
  } catch (err) {
    alert("Delete failed ❌");
  }
};

return (
  <div className="min-h-screen bg-gray-100">

    {/* Header */}
    <div className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        Issue Management
      </h1>
    </div>

    <div className="max-w-6xl mx-auto p-8 space-y-6">

      {issues.length === 0 && (
        <p className="text-center text-gray-500">
          No pending issues 🎉
        </p>
      )}

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
                className="w-28 h-28 object-cover rounded-lg border"
              />
            )}

            <div className="flex-1 space-y-4">

              {/* Top Section */}
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {issue.issue}
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
                        : issue.status === "IN_PROCESS"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {issue.status.replace("_", " ")}
                </span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p><strong>Name:</strong> {issue.name}</p>
                <p><strong>Location:</strong> {issue.issuePlace}</p>
              </div>

              <p className="text-sm text-gray-700">
                {issue.description}
              </p>

              {/* Status Dropdown */}
              <div>
                <select
                  value={issue.status}
                  onChange={(e) =>
                    handleStatusChange(issue._id, e.target.value)
                  }
                  disabled={loading}
                  className="mt-3 px-4 py-2 bg-white border border-gray-300
                             rounded-lg focus:outline-none
                             focus:ring-2 focus:ring-blue-500"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>

                   <button
    onClick={() => handleDelete(issue._id)}
    className="px-4 py-2 mx-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Delete
  </button>
              </div>

            </div>
          </div>
        </div>
      ))}

    </div>
  </div>
);
};

export default UpdateIssueStatus;
