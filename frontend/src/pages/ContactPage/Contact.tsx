import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Message Sent!"); // You can connect this to an email service later
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-10">
          We'd love to hear your thoughts, questions, or feedback!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left - Developer Info */}
        <div className="bg-primary/5 p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold text-primary mb-2">Developer Info</h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> Pranav Mahajan
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:your.email@example.com"
              className="text-primary hover:underline"
            >
              your.email@example.com
            </a>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">GitHub:</span>{" "}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/yourusername
            </a>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">LinkedIn:</span>{" "}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              linkedin.com/in/yourusername
            </a>
          </p>
        </div>

        {/* Right - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 p-6 rounded-xl shadow-sm"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
