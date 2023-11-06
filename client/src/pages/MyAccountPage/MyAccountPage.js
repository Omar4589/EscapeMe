import { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { ME_QUERY } from "../../utils/queries";
import { Link } from "react-router-dom";

const MyAccountPage = () => {
  const [user, setUser] = useState({});
  const [emailChanged, setEmailChanged] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { data: userInfo } = useQuery(ME_QUERY);

  useEffect(() => {
    const u = userInfo?.me || {};

    if (u) {
      setUser(u);
      setFormData({ email: u.email });
    }
  }, [userInfo]);

  useEffect(() => {
    setEmailChanged(formData.email !== user.email);
  }, [formData.email, user.email]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 py-10 px-5">
      <h1 className="text-3xl underline decoration-orange-600 font-bold">
        My Account
      </h1>
      <div id="myaccount-details">
        <form id="myaccount-form" className="mt-8" onSubmit={handleFormSubmit}>
          <div className="mb-10">
            <label
              className="block text-2xl font-semibold "
              htmlFor="firstname"
            >
              Name
            </label>
            <p id="name" name="name" className="text-xl my-3">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="mb-10">
            <label className="block text-2xl font-semibold " htmlFor="email">
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
  );
};

export default MyAccountPage;
