import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import Navbar from "@/components/navbar";
import ReusableForm from "@/components/Form";
import Footer from "@/components/footer";
import Button from "@/components/Button";
import Link from "next/link";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function OrdersForm() {
  const router = useRouter();
  const { id } = router.query;

  const [carDetails, setCarDetails] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    axios
      .get(`https://paw-kelompok-11-server.vercel.app/api/kendaraan/${id}`)
      .then((response) => {
        setCarDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  useEffect(() => {
    try {
      const jwt = jwtDecode(Cookies.get("auth_info"));

      if (jwt != null) {
        setUserLogin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container min-h-screen mx-auto pt-20">
        {userLogin ? (
          carDetails ? (
            <h1> {carDetails.nama}</h1>
          ) : (
            <h1> Loading... </h1>
          )
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <Footer />
    </>
  );
}
