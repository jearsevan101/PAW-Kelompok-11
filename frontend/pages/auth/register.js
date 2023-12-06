import { useRouter } from "next/router";
import { AuthContext } from "@/utils/context/AuthContext";
import useNotification from "@/utils/hooks/useNotification";
import { useContext, useState } from "react";
import AuthOrnament from "@/components/AuthOrnament";
import ReusableForm from "@/components/Form";

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
        router.push("/auth/success");
      } else {
        onError("Register Failed");
      }
    } catch (error) {
      onError(`Register Failed\n\nerror: ${error.message}`);
    }
  };

  return (
    <>
      <AuthOrnament />
      <div
        className="flex flex-col px-6 justify-center items-center min-h-screen"
        style={{ backgroundColor: "#F6F7F9" }}>
        <h1 className="text-4xl mb-4 font-bold">Register</h1>
        <section className="mt-1 p-10 px-12 w-full lg:w-1/3 bg-white rounded-[12px] flex flex-col gap-2 justify-center items-center">
          <form className="flex flex-col w-full" onSubmit={handleRegister}>
            <ReusableForm
              label="Username"
              type="text"
              placeholder="Enter your Username"
              name="username"
              setValue={(value) =>
                setRegisterData({ ...registerData, username: value })
              }
              value={registerData.username}
            />
            <ReusableForm
              label="Email"
              type="text"
              placeholder="Enter your Email"
              name="email"
              setValue={(value) =>
                setRegisterData({ ...registerData, email: value })
              }
              value={registerData.email}
            />

            <ReusableForm
              label="Name"
              type="text"
              placeholder="Enter your Name"
              name="nama"
              setValue={(value) =>
                setRegisterData({ ...registerData, nama: value })
              }
              value={registerData.nama}
            />

            <ReusableForm
              label="Age"
              type="number"
              placeholder="Enter your Age"
              name="umur"
              setValue={(value) =>
                setRegisterData({ ...registerData, umur: value })
              }
              value={registerData.umur}
            />

            <ReusableForm
              label="Password"
              type="password"
              placeholder="Enter your Password"
              name="password"
              setValue={(value) =>
                setRegisterData({ ...registerData, password: value })
              }
              value={registerData.password}
            />

            <ReusableForm
              label="Confirm Password"
              type="password"
              placeholder="Enter your Password"
              name="passwordConfirmation"
              setValue={(value) =>
                setRegisterData({
                  ...registerData,
                  passwordConfirmation: value,
                })
              }
              value={registerData.passwordConfirmation}
            />
            <button
              type="submit"
              className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring">
              Register
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
