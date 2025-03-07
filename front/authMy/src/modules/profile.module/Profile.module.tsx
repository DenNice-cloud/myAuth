import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChangePassModule from "./ChangePass.module";
import { User } from "./profile.type/profile.type";

const ProfileContent = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [changePassword, setChangePassword] = useState({
    clicked: false,
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const { data } = await axios.get(import.meta.env.VITE_API_PROFILE, {
          headers: { Authorization: `Bearer: ${token}` },
        });

        console.log("🚀 ~ fetchProfile ~ data:", data);
        setCurrentUser(data.user);
      }
    };
    fetchProfile();
  }, []);

  const handleClickBack = () => {
    navigate("/");
  };

  const handleClickPassword = () => {
    setChangePassword((prevValue) => ({
      ...prevValue,
      clicked: !prevValue.clicked,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        {/* Back */}
        <button
          onClick={handleClickBack}
          className="px-4 py-2 rounded-lg bg-gray-200 font-semibold
  hover:bg-gray-300 transition duration-200 shadow-md cursor-pointer"
        >
          Back
        </button>

        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border">
          {currentUser ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                User Profile
              </h2>

              <p className="text-gray-600">
                <span className="font-semibold">Name:</span>{" "}
                {currentUser.username}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Email:</span>{" "}
                {currentUser.email}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">ID:</span> {currentUser.id}
              </p>

              <div className="text-gray-600">
                <span className="font-semibold">Password: </span>

                {changePassword.clicked ? (
                  <ChangePassModule
                    changePassword={changePassword}
                    setChangePassword={setChangePassword}
                    currentUser={currentUser}
                  />
                ) : (
                  <button
                    className="px-2 py-1 rounded-lg bg-gray-200 font-semibold
                      hover:bg-gray-300 transition duration-200 cursor-pointer"
                    onClick={handleClickPassword}
                  >
                    Change Password
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
