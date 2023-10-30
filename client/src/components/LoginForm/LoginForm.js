//-----------------IMPORTS-----------------------//
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

//-----------------------START OF COMPONENT-----------------------//
const LoginForm = () => {
  //-----------------STATE---------------//
  // State to store user input data for registration
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //tracks the snackbar
  //const [showSnackBar, setShowSnackBar] = useState(false);

  //-----------------MUTATIONS------------//
  //A mutation to login the user
  const [login, { error }] = useMutation(LOGIN_USER);

  //----------SIGNUP FORM HANDLERS ---------\\
  //Closes snackbar
  // const handleCloseSnackbar = () => {
  //   setPasswordMatch(false);
  //   setValidEmail(true);
  //   setUsernameLengthCheck(true);
  // };

  // Handler for input field changes in the signup form
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle login form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //make email lowercase
      const updatedUserFormData = {
        email: formData.email.toLowerCase(),
        password: formData.password,
      };
      // Use the 'login' mutation to receive a token
      const { data } = await login({
        variables: updatedUserFormData,
      });

      // Log the user in with the generated token
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // Clear the form data after submission
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center font-roboto text-slate-950">
      <div className="mx-5 bg-white w-full max-w-md p-8 rounded-md shadow-lg">
        <div>
          <h1 className="font-bold text-4xl mb-6 text-center">Escape Me</h1>
        </div>

        <h1 className="font-semibold text-2xl mb-6">Login</h1>

        <form id="signup-form" onSubmit={handleFormSubmit}>
          <div className="mb-8">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="email-login"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              autoComplete="email"
              type="email"
              id="email-login"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="password-login"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="password"
              id="password-login"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-2 mt-5 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <h2 className="text-sm">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700">
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
