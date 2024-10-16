import React from "react";

const MainContent = () => {
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register
      </button>

      <button className="text-blue">forget password?</button>
    </div>
  );
};

export default MainContent;
