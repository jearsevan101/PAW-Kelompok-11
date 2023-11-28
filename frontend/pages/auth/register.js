import { useRouter } from "next/router";
import { AuthContext } from "@/utils/context/AuthContext";
import useNotification from "@/utils/hooks/useNotification";
import { useContext, useState } from "react";

export default function Register() {
  const { registerCustomer } = useContext(AuthContext);
  const { onError, onSuccess } = useNotification();

  const router = useRouter();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    nama: "",
    umur: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await registerCustomer(registerData);
      if (response) {
        onSuccess("Register Success");
        router.push("/auth/login");
      } else {
        onError("Register Failed");
      }
    } catch (error) {
      onError(`Register Failed\n\nerror: ${error.message}`);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundColor: "#F6F7F9" }}
    >
      <h1 className="text-6xl mb-1">Register</h1>
      <section className="mt-1 p-10 px-12 w-[571px] bg-white rounded-[12px] flex flex-col gap-4 justify-center items-center">
        <form className="flex flex-col gap-2" onSubmit={handleRegister}>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Username
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Username"
              name="username"
              value={registerData.username}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Email
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Name
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Name"
              name="nama"
              value={registerData.nama}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Age
            <input
              type="number"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Age"
              name="umur"
              value={registerData.umur}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Password
            <input
              type="password"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Confirm Password
            <input
              type="password"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Password"
              name="passwordConfirmation"
              value={registerData.passwordConfirmation}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring"
          >
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
