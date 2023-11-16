import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  function handleRegister(event) {
    event.preventDefault();
    router.replace("/auth/login");
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundColor: "#F6F7F9" }}
    >
      {/* Buat Riwayat Order */}
      <h1 className="text-6xl mb-1">Register</h1>
      <section className="mt-1 p-10 px-12 w-[571px] bg-white rounded-[12px] flex flex-col gap-4 justify-center items-center">
        <form className="flex flex-col gap-2" onSubmit={handleRegister}>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Username
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Username"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Email
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Email"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Name
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Name"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Age
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Age"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Password
            <input
              type="password"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Password"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Confirm Password
            <input
              type="password"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Enter your Password"
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
