//-----------------IMPORTS-----------------------//
import { useState } from "react";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

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
  //used to check the length of the name
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
    console.log("handleFormSubmit called");
    console.log(formData.lastName.length);

    try {
      //check if the username is greater than 23 characters
      if (formData.firstName.length > 23 || formData.lastName.length > 23) {
        console.log("names too long");
        setNameLengthCheck(false);
        return;
      }
      //check if new passwords match
      if (formData.confirmpassword !== formData.password) {
        console.log("password dont match");
        setPasswordMatch(true);
        return;
      }
      //check if email is in a valid format
      if (!isValidEmail(formData.email)) {
        console.log("email  not valid");
        setValidEmail(false);
        return;
      }

      console.log("right before the create user mutation");

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
      Auth.login(data.createUser.token);
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
    <div className="bg-zinc-950 min-h-screen flex justify-center font-roboto text-slate-100">
      <div className="mx-3 w-full max-w-md p-8 mt-6">
        <h1 className="font-semibold text-4xl mb-10 underline decoration-orange-600">
          Sign Up
        </h1>

        <form id="signup-form" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold "
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              autoComplete="given-name"
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="text"
              id="firstname"
              name="firstName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold "
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              autoComplete="family-name"
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="text"
              id="lastname"
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold " htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="email"
              id="email"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold "
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="password"
              id="password"
              name="password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold mb-0"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              required
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg bg-orange-700 text-slate-100 font-semibold py-2 mt-5 rounded hover:bg-orange-800"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <h2 className="text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:text-orange-700">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
