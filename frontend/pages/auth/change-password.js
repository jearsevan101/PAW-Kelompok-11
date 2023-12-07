// ChangePassword.js
import { useState } from "react";
import AuthOrnament from "@/components/AuthOrnament";
import ReusableForm from "@/components/Form";
import useNotification from "@/utils/hooks/useNotification";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function ChangePassword() {
  const { onError, onSuccess } = useNotification();
  const bearerToken = Cookies.get("auth_info");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      const decodedToken = jwtDecode(bearerToken);
      const userId = decodedToken.id;

      const response = await axios.put(
        `https://paw-kelompok-11-server.vercel.app/api/auth/change-password/${userId}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response) {
        onSuccess("Password changed successfully");
      } else {
        onError("Failed to change password");
      }
    } catch (error) {
      onError(`Failed to change password\n\nerror: ${error.message}`);
    }
  };

  return (
    <>
      <AuthOrnament />
      <div
        className="flex flex-col px-6 justify-center items-center min-h-screen"
        style={{ backgroundColor: "#F6F7F9" }}>
        <h1 className="text-4xl mb-4 font-bold">Change Password</h1>
        <section className="mt-1 z-10 p-10 px-12 w-full lg:w-1/3 bg-white rounded-[12px] flex flex-col gap-2 justify-center items-center">
          <form
            className="flex flex-col w-full"
            onSubmit={handleChangePassword}>
            <ReusableForm
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              name="currentPassword"
              setValue={(value) =>
                setPasswordData({ ...passwordData, currentPassword: value })
              }
              value={passwordData.currentPassword}
            />
            <ReusableForm
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              setValue={(value) =>
                setPasswordData({ ...passwordData, newPassword: value })
              }
              value={passwordData.newPassword}
            />
            <ReusableForm
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              name="confirmPassword"
              setValue={(value) =>
                setPasswordData({ ...passwordData, confirmPassword: value })
              }
              value={passwordData.confirmPassword}
            />
            <button
              type="submit"
              className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring">
              Change Password
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
