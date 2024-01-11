import React, { useState } from "react";
import emailjs, { send } from "@emailjs/browser"; //For more info visit : https://www.emailjs.com/docs/
import SnackBar from "../../components/SnackBarComponent/SnackBar";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const ContactUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  //renders snackbar after sendEmail() is called
  const [emailWasSent, setEmailWasSent] = useState(false);

  //--------------HANDLERES-----------//
  // Event handler for input field changes, updates state as field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding form data field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //This function is responsible for submitting the contact us form and invoking the sendEmail function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendEmail();
      setEmailWasSent(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setTimeout(() => {
        setEmailWasSent(false);
        navigate("/home");
      }, 3200);
    } catch (err) {
      console.error(err);
    }
  };

  //When using EMAILJS, we must first initiate the service using init() which takes a PUBLIC_KEY as a parameter
  //The public key is provided by EMAILJS when you sign up .
  // https://dashboard.emailjs.com/admin/account
  emailjs.init(process.env.REACT_APP_EMAILJS_KEY);

  //This function uses emailjs's sendForm method to send the actual email
  const sendEmail = (event) => {
    try {
      //sendForm() takes in 3 parameters,
      //1: the service ID of your email service; this is provided when you 'create a service' in the EMAILJS dashboard;
      //I.E. if youre using a gmail email, you 'create a service' for GMAIL and enter your gmail details. EMAILJS will the provide you with an ID
      //2. the Template ID of the email template you want to use. You can create email templates, visit https://www.emailjs.com/docs/tutorial/creating-email-template/
      //3. The HTML form element; above we get a handle on it using getElementById method
      emailjs
        .sendForm(process.env.REACT_APP_EMAILJS_SERVICE, "escape_me", formData)
        .then((response) => {
          console.log("Email successfully sent!", response);
        })
        .catch((err) => {
          console.log("Failed to send email.", err);
        });

      setFormData({
        user_name: "",
        user_email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto px-6 py-12 bg-zinc-950 text-slate-100 min-h-screen md:px-36">
      <h2 className="font-semibold text-4xl mb-4">Contact Us</h2>
      <p className="mx-1 mb-4 text-xl md:mb-10">
        We'd love to hear from you! If you have any questions, suggestions, or
        concerns, feel free to reach out to our team using the contact form
        below:
      </p>

      <form
        id="contact-form"
        className="w-full  mx-auto lg:w-3/4 xl:w-1/2"
        onSubmit={handleFormSubmit}
      >

        
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="text-slate-950 w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:border-orange-600 "
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="text-slate-950 w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:border-orange-600 "
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="text-slate-950 w-full px-3 py-2 border border-orange-300 rounded focus:outline-none focus:border-orange-600"
            rows="5"
            required
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-3 rounded hover:bg-orange-700 text-xl lg:w-1/2 block mx-auto"
        >
          Send
        </button>
      </form>
      {emailWasSent ? (
        <SnackBar message=" Email sent successfully! We will respond shortly." />
      ) : null}
    </div>
  );
};

export default ScrollToTop(ContactUs);
