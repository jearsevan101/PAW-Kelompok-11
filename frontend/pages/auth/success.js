import AuthOrnament from "@/components/AuthOrnament";
import Button from "@/components/Button";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <AuthOrnament />
      <div className="min-h-screen flex justify-center items-center flex-col px-6">
        <h1 className="text-4xl mb-4 font-bold">Success!</h1>
        <section className="mt-4 z-10 py-16 px-12 w-full lg:w-1/3 bg-white rounded-[12px] flex flex-col gap-6 justify-center items-center">
          <p className="text-xl text-center font-medium">
            You've successfully registered your account with us. Welcome to{" "}
            <span className="font-bold">Rentalin!</span> 🌟
          </p>
          <Link href="/auth/login">
            <Button className="w-full">Login Now!</Button>
          </Link>
        </section>
      </div>
    </>
  );
}
