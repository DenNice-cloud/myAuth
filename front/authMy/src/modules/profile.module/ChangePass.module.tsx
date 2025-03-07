import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { User } from "./profile.type/profile.type";

interface ChangePassProps {
  changePassword: {
    clicked: boolean;
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
  };
  setChangePassword: React.Dispatch<
    React.SetStateAction<{
      clicked: boolean;
      oldPassword: string;
      newPassword: string;
      repeatPassword: string;
    }>
  >;
  currentUser: User;
}

const ChangePassModule: React.FC<ChangePassProps> = ({
  changePassword,
  currentUser,
  setChangePassword,
}) => {
  const handleSubmitPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (changePassword.newPassword !== changePassword.repeatPassword) {
        toast.error(`"Repeat password" & "New Password" do not match`);
        return;
      }

      await axios.post(import.meta.env.VITE_API_CHANGE_PASS, {
        id: currentUser.id,
        newPassword: changePassword.newPassword,
        oldPassword: changePassword.oldPassword,
      });

      toast.success("Password successfully changed!");

      setTimeout(() => {
        setChangePassword((prevValue) => ({
          ...prevValue,
          oldPassword: "",
          newPassword: "",
          repeatPassword: "",
          clicked: !prevValue.clicked,
        }));
      }, 2000); // костыль для того чтобы успел отработать  toast.success
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Change password failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target;

    switch (currentTarget.id) {
      case "oldPassword":
        setChangePassword((prevValue) => ({
          ...prevValue,
          oldPassword: currentTarget.value,
        }));
        break;
      case "newPassword":
        setChangePassword((prevValue) => ({
          ...prevValue,
          newPassword: currentTarget.value,
        }));
        break;
      case "repeatPassword":
        setChangePassword((prevValue) => ({
          ...prevValue,
          repeatPassword: currentTarget.value,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmitPassword}>
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            id="oldPassword"
            type="password"
            name="oldPassword"
            placeholder="Enter your current password"
            value={changePassword.oldPassword}
            onChange={handleChangePassword}
            autoComplete="current-password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            name="newPassword"
            placeholder="Enter your new password"
            value={changePassword.newPassword}
            onChange={handleChangePassword}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            autoComplete="new-password"
            name="repeatPassword"
            placeholder="Re-enter your new password"
            value={changePassword.repeatPassword}
            onChange={handleChangePassword}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1 mb-3"
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Change Password
        </button>
      </form>
    </>
  );
};

export default ChangePassModule;
