import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    // Skapar en FormData-objekt
    const data = new FormData(e.target);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch (err) {
      console.log("Error submitting form:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-lg text-gray-300 mb-8 text-left">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label htmlFor="yourname">Your Name:</label> <br />
          <input
            type="text"
            name="name"
            id="yourname"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </p>
        <p>
          <label htmlFor="youremail">Your Email:</label> <br />
          <input
            type="email"
            name="email"
            id="youremail"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </p>
        <p>
          <label htmlFor="yourmessage">Message:</label> <br />
          <textarea
            name="message"
            id="yourmessage"
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          ></textarea>
        </p>
        <p className="text-right p-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-right inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </p>
        {success && (
          <p className="text-green-600">Thank you! Your message was sent.</p>
        )}
        {error && (
          <p className="text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
