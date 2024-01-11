import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME_QUERY } from "../../utils/queries";
import { UPDATE_EMAIL } from "../../utils/mutations";
import { Link } from "react-router-dom";
import SnackBar from "../../components/SnackBarComponent/SnackBar";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const MyAccountPage = () => {
  //STATES
  //holds logged in user's data
  const [user, setUser] = useState({});
  //tracks if the email in the input field has changed from it's initial value
  const [emailChanged, setEmailChanged] = useState(false);
  //tracks email in email input
  const [formData, setFormData] = useState({
    email: "",
  });
  // Snackbar state that includes both visibility and message
  const [snackbar, setSnackbar] = useState({ show: false, message: "" });

  //queries logged in user's info
  const { data: userInfo } = useQuery(ME_QUERY);
  //Mutation to update email
  const [updateEmail] = useMutation(UPDATE_EMAIL);

  //this hook set's the initial value of user state
  //uses query data
  useEffect(() => {
    const u = userInfo?.me || {};

    if (u) {
      setUser(u);
      setFormData({ email: u.email });
    }
  }, [userInfo]);

  //hook that listens for a change in email values
  //sets emailChanged state based on expression
  useEffect(() => {
    setEmailChanged(formData.email !== user.email);
  }, [formData.email, user.email]);

  // Function to show snackbar with a message
  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });

    // Set a timeout to hide the snackbar after 3000ms
    setTimeout(() => {
      setSnackbar({ show: false, message: "" });
    }, 3000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateEmail({
        variables: { email: formData.email },
      });
      //if email updates successfully
      if (data.updateEmail) {
        setUser(data.updateEmail);
        setEmailChanged(false);
        showSnackbar("Email updated successfully!");
      }
    } catch (err) {
      console.error(err);
      //if we catch an error, we reset the state to the intial value
      setFormData({ email: user.email });
      //we check for the error message from graphql, if it matches
      //we show snackbar with message
      if (err.message === "Email is already in use.") {
        showSnackbar("This email is already in use. Please try another one.");
      } else {
        showSnackbar("Something went wrong. Please try again.");
      }
      return;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 py-10 px-5">
      <div className=" max-w-md p-8 mt-6 mx-auto w-full">
        <h1 className="text-3xl underline decoration-orange-600 font-bold">
          My Account
        </h1>
        <div id="myaccount-details" className="">
          <form
            id="myaccount-form"
            className="mt-8"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-10">
              <h2 className="block text-xl font-semibold lg:text-lg">Name</h2>
              <p id="name" name="name" className="text-xl my-3 ">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="mb-10">
              <label className="block text-xl font-semibold lg:text-lg" htmlFor="email">
                Email
              </label>
              <input
                autoComplete="email"
                className="w-full bg-zinc-950 text-xl border-b-2 text-slate-100 px-3 py-2 my-3  rounded focus:outline-none focus:border-orange-600"
                type="email"
                id="email"
                name="email"
                required
                onChange={handleInputChange}
                value={formData.email || ""}
              />
            </div>
            <Link
              to="/changepassword"
              className="px-6 py-2 bg-orange-600 rounded-xl"
            >
              Change Password
            </Link>

            <button
              type="submit"
              disabled={!emailChanged}
              className={`w-full text-lg ${
                !emailChanged
                  ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-slate-100 font-semibold py-2 mt-10 rounded`}
            >
              Update Email
            </button>
          </form>
        </div>
      </div>
      {snackbar.show && <SnackBar message={snackbar.message} />}
    </div>
  );
};

export default ScrollToTop(MyAccountPage);
