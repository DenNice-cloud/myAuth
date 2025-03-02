import { useNavigate } from "react-router-dom";

const ProfileContent = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        {/* Back */}
        <button
          onClick={handleClickBack}
          className="px-4 py-2 rounded-lg bg-gray-100 font-semibold
          hover:bg-gray-200 
          transition mb-4 cursor-pointer"
        >
          Back
        </button>
        Empty Page
      </div>
    </div>
  );
};

export default ProfileContent;
