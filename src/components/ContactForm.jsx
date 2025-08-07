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
    <div className="text-lg p-6 rounded-xl border border-emerald-700/70 text-gray-300 mb-8 text-left">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="my-4">
          <label htmlFor="yourname">Hur var namnet?</label> <br />
          <input
            type="text"
            name="name"
            id="yourname"
            placeholder="Vem är du vem är jag vem är vi?"
            value={formData.name}
            onChange={handleChange}
            className="bg-emerald-100 text-rose-950 text-md  rounded-lg focus:bg-amber-100 w-full p-2"
          />
        </p>
        <p className="my-4">
          <label htmlFor="youremail">Email på något sätt:</label> <br />
          <input
            type="email"
            name="email"
            id="youremail"
            placeholder="får.vara@hitte.på"
            value={formData.email}
            onChange={handleChange}
            className="bg-emerald-100 text-rose-950 text-md  rounded-lg focus:bg-amber-100 w-full p-2"
          />
        </p>
        <p className="my-4">
          <label htmlFor="yourmessage">Vad önskar ni framföra?</label> <br />
          <textarea
            name="message"
            id="yourmessage"
            placeholder="Imponerande portfolio, vilket datum kan du börja arbeta?"
            value={formData.message}
            onChange={handleChange}
            className="bg-emerald-100 text-rose-950 text-md  rounded-lg focus:bg-amber-100 w-full p-2"
          ></textarea>
        </p>
        <p className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-right inline-flex items-center justify-center cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? "Skickar..." : "Skicka"}
          </button>
        </p>
        {success && (
          <p className="text-green-600">
            Tackar tackar! Ditt meddelande har skickats.
          </p>
        )}
        {error && (
          <p className="text-red-600">
            Nånting gick snett. Var god försök igen.
          </p>
        )}
      </form>
    </div>
  );
}
