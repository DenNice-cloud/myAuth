import { useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";

const LoginContent = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    switch (id) {
      case "email":
        setLogin((prevState) => ({
          ...prevState,
          email: value,
        }));
        break;
      case "password":
        setLogin((prevState) => ({
          ...prevState,
          password: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Proccesing");

    try {
      const response = await fetch(import.meta.env.VITE_API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });

      const data = await response.json();
      console.log("Server answer:", data); // pause here, need to save data  somewhere
      
      if (data) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error login:", error); // need to realise toast logic/method
    }
  };

  const handleClickBack = () => {
    navigate("/");
  };

  return (
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

        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            autoComplete="new-password"
            name="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            name="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />

          <button
            className="w-full bg-gray-100 font-semibold py-3 rounded-lg transition
        hover:bg-gray-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <button className="w-full text-blue-500 mt-3 hover:underline bg-transparent cursor-pointer">
          Forget password?
        </button>
      </div>
    </div>
  );
};

export default LoginContent;
