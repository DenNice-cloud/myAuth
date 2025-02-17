import React from "react";
import { useNavigate } from "react-router-dom";

const LoginContent = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <button onClick={handleClickBack}>Back</button>
      </div>

      <div>
        <input
          type="email"
          autoComplete="new-password"
          name="email"
          placeholder="Enter your email"
        ></input>

        <input
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="Enter your password"
        ></input>
      </div>

      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>

      <div>
        <button className="text-blue">forget password?</button>
      </div>
    </div>
  );
};

export default LoginContent;
