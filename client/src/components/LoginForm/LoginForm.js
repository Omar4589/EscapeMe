//-----------------IMPORTS-----------------------//
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import SnackBar from "../SnackBarComponent/SnackBar";

//-----------------------START OF COMPONENT-----------------------//
const LoginForm = () => {
  //-----------------STATE---------------//
  // State to store user input data for registration
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showSnackBar, setShowSnackBar] = useState(false);

  //-----------------MUTATIONS------------//
  //A mutation to login the user
  const [login, { error }] = useMutation(LOGIN_USER);

  //----------HANDLERS ---------\\
  //Closes snackbar
  const openSnackBar = () => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 3000);
  };

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

      if (data.login === null) {
        openSnackBar();
        return;
      }
      // Log the user in with the generated token
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      openSnackBar();
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className=" w-full max-w-md p-8 mt-16">
      <h1 className="font-semibold text-4xl mb-10 underline decoration-orange-600">
        Login
      </h1>

      <form id="signup-form" onSubmit={handleFormSubmit}>
        <div className="mb-8">
          <label
            className="block text-lg font-semibold mb-2 lg:text-base"
            htmlFor="email-login"
          >
            Email
          </label>
          <input
            className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
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
            className="block text-lg font-semibold mb-2 lg:text-base"
            htmlFor="password-login"
          >
            Password
          </label>
          <input
            className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
            type="password"
            id="password-login"
            name="password"
            required
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-xl text-slate-100 font-semibold py-2 mt-5 rounded hover:bg-orange-700 lg:text-lg"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <h2 className="text-lg lg:text-base">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-orange-600 hover:text-orange-700">
            Sign Up
          </Link>
        </h2>
      </div>

      {showSnackBar ? (
        <SnackBar message="Wrong email or password. Please try again." />
      ) : null}
    </div>
  );
};

export default LoginForm;
