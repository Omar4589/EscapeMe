//-----------------IMPORTS-----------------------//
import SnackBar from "../SnackBarComponent/SnackBar";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../utils/mutations";

//-----------------------START OF COMPONENT-----------------------//
const ChangePassword = () => {
  //-----------------STATE---------------//
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Snackbar state that includes both visibility and message
  const [snackbar, setSnackbar] = useState({ show: false, message: "" });

  //-----------------MUTATIONS---------------//
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  //-----------------HANDLERS---------------//
  const showSnackbar = (message) => {
    setSnackbar({ show: true, message });

    // Set a timeout to hide the snackbar after 3000ms
    setTimeout(() => {
      setSnackbar({ show: false, message: "" });
    }, 3000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        showSnackbar("Password don't match. Please try again.");
        return;
      }

      if (
        formData.newPassword.length < 8 ||
        formData.confirmPassword.length < 8
      ) {
        showSnackbar("Password must be at least 8 characters long.");
        return;
      }

      //update Password mutation should go here
      const response = await updatePassword({
        variables: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      });

      if (response.data.updatePassword) {
        showSnackbar("Password updated successfully!");
      }

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    } catch (err) {
      console.error(err);
      showSnackbar("Unable to update password. Please try again later.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 px-5 py-10">
      <div className=" w-full max-w-md p-8 mt-6 mx-auto">
        <h1 className="font-semibold text-3xl mb-10 underline decoration-orange-600 mt-8">
          Change Password
        </h1>

        <form id="changepassword-form" onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold "
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              autoComplete="email"
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="password"
              id="currentPassword"
              name="currentPassword"
              required
              onChange={handleInputChange}
              value={formData.currentPassword}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold "
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="password"
              id="newPassword"
              name="newPassword"
              required
              onChange={handleInputChange}
              value={formData.newPassword}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-lg font-semibold mb-0"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full bg-zinc-950  border-b-2 text-slate-100 px-3 py-2  rounded focus:outline-none focus:border-orange-600"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </div>
          <button
            type="submit"
            className="w-full text-lg bg-orange-700 text-slate-100 font-semibold py-2 mt-5 rounded hover:bg-orange-800"
          >
            Change Password
          </button>
        </form>
      </div>

      {snackbar.show && <SnackBar message={snackbar.message} />}
    </div>
  );
};

export default ChangePassword;
