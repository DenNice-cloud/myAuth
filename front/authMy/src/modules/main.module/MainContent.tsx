import { useNavigate } from "react-router-dom";
// import "./style.css";

const MainContent = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full">
      <button
        onClick={handleClickLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 cursor-pointer"
      >
        Login
      </button>

      <button
        onClick={handleClickRegister}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Register
      </button>
    </div>
  );
};

export default MainContent;
