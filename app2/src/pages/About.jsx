const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Issue Management System
        </h1>
        <p className="text-gray-500 mt-2">
          A smart and simple platform for students to report and track college-related issues.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-10">

        {/* Project Introduction */}
        <section className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📌 Website Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The College Issue Management System is a web-based application designed
            to help students easily report issues within the college campus such as
            infrastructure problems, classroom maintenance, hostel complaints,
            technical issues, or other concerns. The system ensures transparency
            and provides a structured way to track issue resolution.
          </p>
        </section>

        {/* Key Features */}
        <section className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              👨‍🎓 Student Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Student Registration and Login</li>
              <li>• Submit issues with description and image</li>
              <li>• View all submitted issues</li>
              <li>• Track issue status (Open, In Progress, Resolved)</li>
              <li>• Transparent update system</li>
            </ul>
          </div>

         

        </section>

        {/* Objectives */}
        <section className="bg-white p-8 rounded-xl shadow-sm grid md:grid-cols">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🎯 Website Objectives
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• To provide an easy way for students to report problems.</li>
            <li>• To reduce communication gaps between students and administration.</li>
            <li>• To maintain transparency in issue handling.</li>
            <li>• To improve campus facilities through proper tracking.</li>
          </ul>
        </section>

        {/* Benefits */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            🌟 Benefits of the System
          </h2>
          <ul className="space-y-2">
            <li>• Faster issue reporting and response</li>
            <li>• Organized issue tracking</li>
            <li>• Reduced manual paperwork</li>
            <li>• Better communication between students and college administration</li>
            <li>• Easy access from anywhere via web browser</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default About;
