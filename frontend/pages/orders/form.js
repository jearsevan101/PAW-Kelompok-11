import { useEffect, useState } from "react";
import React from "react";

import { useRouter } from "next/router";

import axios from "axios";
import useAxios from "@/utils/hooks/useAxios";

import Navbar from "@/components/navbar";
import Form from "@/components/Form";
import Footer from "@/components/footer";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";

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
  const [jumlahHari, setJumlahHari] = useState(0);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const submitRentCar = (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to our terms and conditions and privacy policy");
      return;
    }

    const data = {
      customer_id: jwtDecode(Cookies.get("auth_info")).id,
      kendaraan_id: id,
      tanggal_sewa: tanggalSewa,
      tanggal_kembali: tanggalKembali,
      total_harga: carDetails.harga * jumlahHari,
    };

    const bearerToken = Cookies.get("auth_info");

    try {
      const response = axios.post(
        "https://paw-kelompok-11-server.vercel.app/api/sewa",
        data,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        alert("Rental Success");
        router.push("/my-order");
      } else {
        alert("Rental Failed");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
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
                <div className="w-full md:w-1/3 bg-white rounded-xl p-8">
                  <h2 className="text-lg font-bold mb-4">Rental Summary</h2>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div
                      className={`box-border w-full h-32 flex items-center py-4 bg-c-primary pattern rounded-lg`}
                    >
                      <div className="w-full h-[50px] relative">
                        <Image
                          src={carDetails.img_url[0]}
                          alt="Car"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                    <div className="py-8">
                      <h3 className="text-md font-bold mb-4">
                        {carDetails.nama}
                      </h3>
                      <span>{jumlahHari} Hari</span>
                    </div>
                  </div>
                  <div className="">
                    <h2 className="text-lg font-bold mb-4">Rental Price</h2>
                    <div className="flex flex-row justify-between">
                      <span className="text-md font-medium">Total</span>
                      <span className="text-md font-medium">
                        Rp. {carDetails.harga * jumlahHari}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:w-2/3 gap-8 md:order-first">
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
                            const startDate = new Date(data);
                            const endDate = new Date(tanggalKembali);
                            const timeDiff = endDate - startDate;
                            const daysDiff = Math.ceil(
                              timeDiff / (1000 * 3600 * 24)
                            );
                            if (daysDiff < 0) {
                              alert(
                                "Tanggal kembali tidak boleh kurang dari tanggal sewa"
                              );
                              return;
                            }
                            if (startDate < new Date()) {
                              alert(
                                "Tanggal sewa tidak boleh kurang dari tanggal hari ini"
                              );
                              return;
                            }

                            setTanggalSewa(data);
                            setJumlahHari(daysDiff);
                          }}
                        />
                        <Form
                          label="Drop-off Date"
                          name="Drop-off Date"
                          value={tanggalKembali}
                          type="date"
                          placeholder="Drop-off Date"
                          setValue={(data) => {
                            const startDate = new Date(tanggalSewa);
                            const endDate = new Date(data);

                            const timeDiff = endDate - startDate;
                            const daysDiff = Math.ceil(
                              timeDiff / (1000 * 3600 * 24)
                            );

                            if (daysDiff < 0) {
                              alert(
                                "Tanggal kembali tidak boleh kurang dari tanggal sewa"
                              );
                              return;
                            }
                            if (endDate < new Date()) {
                              alert(
                                "Tanggal kembali tidak boleh kurang dari tanggal hari ini"
                              );
                              return;
                            }

                            setTanggalKembali(data);
                            setJumlahHari(daysDiff);
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
                        <Button onClick={submitRentCar}>Rent Now</Button>
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
