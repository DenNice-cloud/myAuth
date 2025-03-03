import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const RegisterContent = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/");
  };

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "userName":
        setUserName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "repeat-password":
        setRepeatPass(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!repeatPass) {
        toast.error(`"Repeat password" is empty, fill the field`);
        return;
      }

      if (password !== repeatPass) {
        toast.error(`"Repeat password" & "Password" do not match`);
        return;
      }

      const { data } = await axios.post(import.meta.env.VITE_API_REGISTRATION, {
        username: userName,
        email,
        password,
      });

      toast.success("Registration successful!");
      console.log("Server answer:", data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.errors[0] || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="h-screen flex items-center justify-center w-full">
        <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
          <button
            onClick={handleClickBack}
            className="px-4 py-2 rounded-lg bg-gray-100 font-semibold
          hover:bg-gray-200 
          transition mb-4 cursor-pointer"
          >
            Back
          </button>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            <label
              htmlFor="userName"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Name
            </label>

            <input
              id="userName"
              type="userName"
              autoComplete="userName"
              name="userName"
              placeholder="Enter your Name"
              value={userName}
              onChange={changeValue}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            <label
              htmlFor="email"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={changeValue}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            <label
              htmlFor="password"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              name="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={changeValue}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            <label
              htmlFor="repeat-password"
              className="mb-2 text-sm font-semibold text-gray-700"
            >
              Repeat Password
            </label>

            <input
              id="repeat-password"
              type="password"
              autoComplete="new-password"
              name="repeat-password"
              placeholder="Repeat your password"
              value={repeatPass}
              required
              onChange={changeValue}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            {/* Registration button */}
            <button
              type="submit"
              className="w-full bg-gray-100 font-semibold py-3 rounded-lg transition
        hover:bg-gray-200 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterContent;
