import Button from "@/components/Button";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  function handleLogin(event) {
    event.preventDefault();
    router.replace("/");
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundColor: "#F6F7F9" }}
    >
      {/* Buat Riwayat Order */}
      <h1 className="text-6xl mb-1">Login</h1>
      <section className="mt-1 p-10 px-12 w-[571px] h-[402px] bg-white rounded-[12px] flex flex-col gap-4 justify-center items-center">
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Username
            <input
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Masukkan Username"
            />
          </label>
          <label className="flex flex-col gap-2 w-[456px] font-medium text-xl">
            Password
            <input
              type="password"
              className="w-[456px] h-[56px]"
              style={{ backgroundColor: "#F6F7F9" }}
              placeholder="Masukkan Password"
            />
          </label>
          <button
            type="submit"
            className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring"
          >
            Login
          </button>
          <Link href="/auth/register">
            <p className="text-c-primary font-semibold text-xl">Register</p>
          </Link>
        </form>
      </section>
    </div>
  );
}
