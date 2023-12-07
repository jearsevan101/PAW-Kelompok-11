import Button from "@/components/Button";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/utils/context/AuthContext";
// import useNotification from "@/utils/hooks/useNotification";
import Link from "next/link";
import ReusableForm from "@/components/Form";
import AuthOrnament from "@/components/AuthOrnament";

export default function Login() {
  const router = useRouter();
  // const { onError, onSuccess } = useNotification();
  const { loginCustomer } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("test");
    try {
      const response = await loginCustomer(loginData);
      if (response) {
        alert("Login Success");
        router.push("/");
      } else {
        alert("Login Failed");
      }
    } catch (err) {
      alert("Login Failed");
      console.log("error: ", err.message);
    }
  };

  return (
    <>
      <AuthOrnament />

      <div
        className="flex flex-col justify-center items-center px-6 min-h-screen"
        style={{ backgroundColor: "#F6F7F9" }}>
        <h1 className="text-4xl mb-4 font-bold">Login</h1>
        <section className="mt-4 z-20 p-10 w-full lg:w-1/3 px-12 bg-white rounded-[12px] flex flex-col gap-4 justify-center items-center">
          <form className="flex flex-col w-full gap-2" onSubmit={handleLogin}>
            <ReusableForm
              label="Username"
              type="text"
              placeholder="Masukkan Username"
              name="username"
              setValue={(value) =>
                setLoginData({ ...loginData, username: value })
              }
              value={loginData.username}
            />

            <ReusableForm
              label="Password"
              type="password"
              placeholder="Masukkan Password"
              name="password"
              setValue={(value) =>
                setLoginData({ ...loginData, password: value })
              }
              value={loginData.password}
            />
            <button
              type="submit"
              className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring">
              Login
            </button>
            <Link href="/auth/register">
              <p className="text-c-primary font-bold mt-2 text-sm">
                <span className="text-c-text-grey font-light">
                  Don't have account?{" "}
                </span>
                Register
              </p>
            </Link>
          </form>
        </section>
      </div>
    </>
  );
}
