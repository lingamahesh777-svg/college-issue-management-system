import { useState } from "react";
import { createIssue } from "../api/issueApi";

const CreateIssue = () => {
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    phoneNo: "",
    issuePlace: "",
    address: "",
    issue: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitIssue = async () => {
    if (!form.name || !form.rollNo || !form.issue) {
      alert("Please fill required fields ❗");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await createIssue(formData);
      alert("Issue submitted successfully ✅");

      setForm({
        name: "",
        rollNo: "",
        phoneNo: "",
        issuePlace: "",
        address: "",
        issue: "",
        description: "",
      });
      setImage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Header */}
      <div className="bg-white shadow px-8 py-4 flex gap-3 items-center">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
          C
        </div>
        <h1 className="text-xl font-semibold text-blue-600">
          Raise New Issue
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center py-10 space-y-5">

        <div className="max-w-xl">

            <h2 className="text-red-600 font-bold">*Notice*:<span className="text-gray-700  ">Duplicate issues are strictly prohibited.</span></h2>

        </div>
        <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-md border space-y-5">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Student Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            name="rollNo"
            value={form.rollNo}
            onChange={handleChange}
            placeholder="Roll Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            name="phoneNo"
            value={form.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            name="issuePlace"
            value={form.issuePlace}
            onChange={handleChange}
            placeholder="Issue Location (Department / Place)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            name="issue"
            value={form.issue}
            onChange={handleChange}
            placeholder="Issue Name / Type"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Issue Address / Room No"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />

          <button
            onClick={submitIssue}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
                       hover:bg-blue-700 transition
                       disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateIssue;
