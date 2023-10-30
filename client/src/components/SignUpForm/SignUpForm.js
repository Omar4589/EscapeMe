//-----------------IMPORTS-----------------------//
import { useState } from "react";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

//-----------------------START OF COMPONENT-----------------------//
const SignUpForm = ({ handleComponentChange, LoginForm }) => {
  //-----------------STATE---------------//
  // State to store user input data for registration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //used to confirm the new password, shows snackbar is password dont match
  const [passwordMatch, setPasswordMatch] = useState(false);
  //used to confirm email is valid
  const [validEmail, setValidEmail] = useState(true);
  //used to check the length of the username
  const [nameLengthCheck, setNameLengthCheck] = useState(true);

  //used to check the length of the new password
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);

  //-----------------MUTATIONS------------//
  // Use the CREATE_USER mutation for user registration
  const [createUser, { error, data }] = useMutation(CREATE_USER);

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

    let newValue = value;

    if (name === "email") {
      newValue = value.toLowerCase();
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  //function with regex to check if email is in valid format
  const isValidEmail = (email) => {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email));
  };

  // This function handles the sign up form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //check if the username is greater than 23 characters
      if (formData.firstName.length || formData.lastName.length > 23) {
        setNameLengthCheck(false);
        return;
      }
      //check if new passwords match
      if (formData.confirmpassword !== formData.password) {
        setPasswordMatch(true);
        return;
      }
      //check if email is in a valid format
      if (!isValidEmail(formData.email)) {
        setValidEmail(false);
        return;
      }

      // Use the createUser mutation to create the user
      const { data } = await createUser({
        variables: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      });

      // Log the user in with the generated token
      // Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }

    // Clear the form data after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center font-roboto text-slate-950">
      <div className="mx-5 bg-white w-full max-w-md p-8 rounded-md shadow-lg">
        <div>
          <h1 class="font-bold text-4xl mb-2 text-center">Escape Me</h1>
        </div>

        <h1 className="font-semibold text-2xl mb-6">Sign Up</h1>

        <div id="signup-form" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="text"
              id="firstname-signup"
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="text"
              id="lastname-signup"
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="email"
              id="email-signup"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="password"
              id="password-signup"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              type="password"
              id="confirmpassword-signup"
              name="confirmpassword"
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-2 mt-5 rounded hover:bg-blue-800"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
