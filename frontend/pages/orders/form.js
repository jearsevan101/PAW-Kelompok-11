import { useEffect, useState } from "react";
import React from "react";

import { useRouter } from "next/router";

import axios from "axios";

import Navbar from "@/components/navbar";
import Form from "@/components/Form";
import Footer from "@/components/footer";
import Button from "@/components/Button";
import Link from "next/link";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function OrdersForm() {
  const router = useRouter();
  const { id } = router.query;

  const initialDate = new Date().toISOString().split("T")[0];

  const [carDetails, setCarDetails] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tanggalSewa, setTanggalSewa] = useState(initialDate);
  const [tanggalKembali, setTanggalKembali] = useState(initialDate);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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

  useEffect(() => {
    try {
      const id = jwtDecode(Cookies.get("auth_info")).id;
      const apiUrl = `https://paw-kelompok-11-server.vercel.app/api/customer/${id}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setName(response.data.nama);
          setUsername(response.data.username);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
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
            <div className="mx-4 mt-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col md:w-2/3 gap-8">
                  <div className="w-full">
                    <form>
                      <div className="bg-white rounded-xl p-8">
                        <h2 className="text-lg font-bold mb-4">
                          User Information
                        </h2>
                        <div className="grid grid-cols-2 gap-x-4">
                          <Form
                            label="Name"
                            name="name"
                            value={name}
                            type="text"
                            placeholder="name"
                            setValue={() => {}}
                            disabled={true}
                            className="w-full md:w-1/2"
                          />
                          <Form
                            label="Email"
                            name="email"
                            value={email}
                            type="text"
                            placeholder="email"
                            setValue={() => {}}
                            disabled={true}
                            className="w-full md:w-1/2"
                          />
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-8 mt-8">
                        <h2 className="text-lg font-bold mb-4">Rental Info</h2>
                        <Form
                          label="Pick-Up Date"
                          name="Pick-Up Date"
                          value={tanggalSewa}
                          type="date"
                          placeholder="Pick-Up Date"
                          setValue={(data) => {
                            setTanggalSewa(data);
                          }}
                        />
                        <Form
                          label="Drop-off Date"
                          name="Drop-off Date"
                          value={tanggalKembali}
                          type="date"
                          placeholder="Drop-off Date"
                          setValue={(data) => {
                            setTanggalKembali(data);
                          }}
                        />
                      </div>
                      <div className="bg-white rounded-xl p-8 mt-8">
                        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                        <label className="block text-black font-semibold mb-8 text-lg">
                          <input
                            className="mr-4 bg-[#F6F7F9] focus:outline-none transition duration-300 p-4"
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          ></input>
                          I agree with our terms and conditions and privacy
                          policy
                        </label>
                        <button
                          type="submit"
                          className="bg-c-primary font-semibold text-white px-5 py-3 rounded-md hover:opacity-90 focus:outline-none focus:ring"
                        >
                          Rent Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
