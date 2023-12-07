import useNotification from "@/utils/hooks/useNotification";
import { useState, useEffect } from "react";
import AuthOrnament from "@/components/AuthOrnament";
import ReusableForm from "@/components/Form";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditProfile() {
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const bearerToken = Cookies.get("auth_info");

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    nama: "",
    umur: "",
    password: "",
  });

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(bearerToken);
      const userId = decodedToken.id;

      axios
        .get(
          `https://paw-kelompok-11-server.vercel.app/api/customer/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        )
        .then((response) => {
          setProfileData({
            id: response.data._id,
            username: response.data.username,
            email: response.data.email,
            nama: response.data.nama,
            umur: response.data.umur,
            password: response.data.password,
          });
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    } catch (err) {
      console.log("Error decoding JWT: ", err.message);
    }
  }, [bearerToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://paw-kelompok-11-server.vercel.app/api/customer/${profileData.id}`,
        profileData
      );

      if (response) {
        alert("Profile updated successfully");
      } else {
        alert("Profile update failed");
      }
    } catch (error) {
      alert(`Profile update failed\n\nerror: ${error.message}`);
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const isValidPassword = validatePassword(password, profileData.password);

      if (!isValidPassword) {
        alert("Incorrect password. Please try again.");
        return;
      }

      await axios.delete(
        `https://paw-kelompok-11-server.vercel.app/api/customer/${profileData.id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      Cookies.remove("auth_info");
      handleCloseDeleteModal();
      alert("Account deleted successfully");
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  const validatePassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword;
  };

  return (
    <>
      <AuthOrnament />
      <div
        className="flex flex-col px-6 justify-center items-center min-h-screen"
        style={{ backgroundColor: "#F6F7F9" }}>
        <h1 className="text-4xl mb-4 font-bold">Edit Profile</h1>
        <section className="mt-1 p-10 px-12 w-full lg:w-1/3 bg-white rounded-[12px] flex flex-col gap-2 justify-center items-center">
          <form
            className="flex flex-col z-10 w-full"
            onSubmit={handleUpdateProfile}>
            <ReusableForm
              label="Username"
              type="text"
              placeholder="Enter your Username"
              name="username"
              setValue={(value) =>
                setProfileData({ ...profileData, username: value })
              }
              value={profileData.username}
            />
            <ReusableForm
              label="Email"
              type="text"
              placeholder="Enter your Email"
              name="email"
              setValue={(value) =>
                setProfileData({ ...profileData, email: value })
              }
              value={profileData.email}
            />
            <ReusableForm
              label="Name"
              type="text"
              placeholder="Enter your Name"
              name="nama"
              setValue={(value) =>
                setProfileData({ ...profileData, nama: value })
              }
              value={profileData.nama}
            />
            <ReusableForm
              label="Age"
              type="number"
              placeholder="Enter your Age"
              name="umur"
              setValue={(value) =>
                setProfileData({ ...profileData, umur: value })
              }
              value={profileData.umur}
            />
            <button
              type="submit"
              className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring">
              Update Profile
            </button>
          </form>
          <div className="mt-2">
            <button
              onClick={handleOpenDeleteModal}
              className="text-red-500 hover:underline cursor-pointer">
              Delete Account
            </button>
          </div>
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <ReusableForm
                  label="Password"
                  type="password"
                  placeholder="Enter your password to confirm"
                  name="password"
                  setValue={(value) => setPassword(value)}
                  value={password}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="mr-4 text-gray-600 hover:underline">
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
