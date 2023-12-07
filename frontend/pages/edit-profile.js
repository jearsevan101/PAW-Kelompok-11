import useNotification from "@/utils/hooks/useNotification";
import { useState, useEffect } from "react";
import AuthOrnament from "@/components/AuthOrnament";
import ReusableForm from "@/components/Form";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export default function EditProfile() {
  const { onError, onSuccess } = useNotification();
  const bearerToken = Cookies.get("auth_info");

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    nama: "",
    umur: "",
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
        onSuccess("Profile updated successfully");
      } else {
        onError("Profile update failed");
      }
    } catch (error) {
      onError(`Profile update failed\n\nerror: ${error.message}`);
    }
  };

  return (
    <>
      <AuthOrnament />
      <div
        className="flex flex-col px-6 justify-center items-center min-h-screen"
        style={{ backgroundColor: "#F6F7F9" }}>
        <h1 className="text-4xl mb-4 font-bold">Edit Profile</h1>
        <section className="mt-1 p-10 px-12 w-full lg:w-1/3 bg-white rounded-[12px] flex flex-col gap-2 justify-center items-center">
          <form className="flex flex-col z-10 w-full" onSubmit={handleUpdateProfile}>
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
        </section>
      </div>
    </>
  );
}
