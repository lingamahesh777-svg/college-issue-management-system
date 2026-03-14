import { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000";

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/announcement`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const submitAnnouncement = async () => {
    if (!message) {
      alert("Please enter announcement message ❗");
      return;
    }

    const formData = new FormData();
    formData.append("message", message);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.post(`${API}/api/announcement`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("");
      setImage(null);
      fetchPosts();
    } catch (err) {
      alert("Failed to post ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (postId) => {
    if (!user || !comment) {
      alert("Enter name and greeting ❗");
      return;
    }

    try {
      await axios.post(`${API}/api/announcement/comment/${postId}`, {
        user,
        comment,
      });
      setUser("");
      setComment("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-8 py-4 flex gap-3 items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
          A
        </div>
        <h1 className="text-xl font-semibold text-blue-600 tracking-wide">
          Global Announcement Board
        </h1>
      </div>

      <div className="flex justify-center py-10">
        <div className="w-full max-w-3xl space-y-8">

          {/* Create Announcement Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">

            <textarea
              placeholder="Write announcement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-sm text-gray-500"
            />

            <button
              onClick={submitAnnouncement}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>

          {/* Show Posts */}
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4"
            >
              <p className="text-lg font-semibold text-blue-600">
                {post.message}
              </p>

              {post.image && (
                <img
                  src={`${API}/uploads/${post.image}`}
                  alt="announcement"
                  className="rounded-lg max-h-64 object-cover"
                />
              )}

              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              {/* Comments */}
              <div className="space-y-2">
                {post.comments.map((c, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-blue-600 font-semibold">{c.user}:</span>{" "}
                    {c.comment}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-1/4 focus:outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="Write greeting..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:border-blue-500"
                />

                <button
                  onClick={() => handleComment(post._id)}
                  className="bg-green-600 px-4 rounded-lg text-white hover:bg-green-700"
                >
                  Send
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
