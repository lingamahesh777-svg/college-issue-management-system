import { useEffect, useState } from "react";
import { getIssues } from "../api/issueApi";

const GetAllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await getIssues();
        setIssues(res.data.issues);
      } catch (err) {
        setError("Backend server is not running ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

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
    <div className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">
       Pending Issues
      </h1>
    </div>

    <div className="max-w-6xl mx-auto p-8">

      <h2 className="text-xl font-semibold text-gray-700 mb-6">
       
      </h2>

      {issues.filter((issue) => issue.status === "OPEN").length === 0 ? (
        <p className="text-center text-gray-500">
          No pending issues 🎉
        </p>
      ) : (
        <div className="space-y-6">
          {issues
            .filter((issue) => issue.status === "OPEN")
            .map((issue) => (
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
                          {new Date(issue.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>

                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                        PENDING
                      </span>
                    </div>

                    {/* Issue Title */}
                    <h2 className="text-base font-semibold text-gray-700">
                     {issue.issue}
                    </h2>

                    {/* Location & Address */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <p><strong>Location:</strong> {issue.issuePlace}</p>
                      <p><strong>Address:</strong> {issue.address}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700">
                      {issue.description}
                    </p>

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

export default GetAllIssues;
