  import { useEffect, useState } from "react";
  import { getInProgressIssues } from "../api/issueApi";

  const InProgressIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchInProgress = async () => {
        try {
          const res = await getInProgressIssues();
          setIssues(res.data.issues);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchInProgress();
    }, []);

    if (loading) {
      return <p className="text-center mt-10 text-gray-700">Loading in-progress issues...</p>;
    }

    return (
      <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <div className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            In-Progress Issues
          </h1>
        </div>

        <div className="max-w-6xl mx-auto p-8">

          {issues.length === 0 ? (
            <p className="text-center text-gray-500">
              No in-progress issues yet 🙂
            </p>
          ) : (
            <div className="space-y-6">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex gap-6 items-start">

                    {/* Issue Image */}
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
  {issue.name}  {/* User Name */}
</p>



                          <p className="text-sm text-gray-500">
                            {new Date(issue.updatedAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>

                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-600">
                          IN PROGRESS
                        </span>
                      </div>
             
                        <h3 className="text-base font-semibold text-gray-700">
  {issue.issue}  {/* Issue Title */}
</h3>

                      {/* Place & Address */}
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

  export default InProgressIssues;
