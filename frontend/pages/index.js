import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button";
import Navbar from "@/components/navbar";
import CarCard from "@/components/CarCard";
import Loading from "@/components/Loading";

export default function Home() {
  const [kendaraanList, setKendaraanList] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const apiUrl = "https://paw-kelompok-11-server.vercel.app/api/kendaraan";

    axios
      .get(apiUrl)
      .then((response) => {
        setKendaraanList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar/>
      <div className="container min-h-screen mx-auto pt-20">
        {loading ? (
          <div className="flex items-center min-h-screen justify-center ">
            <Loading />
          </div>
        ) : (
          <main className="my-6 mx-4">
            <div className="object-cover relative w-full p-8 h-[400px] rounded-xl overflow-hidden bg-[#54A6FF]">
              <div className="flex flex-col text-white w-[270px] gap-y-4 mt-3">
                <h2 className="font-semibold text-3xl">
                  The Best Platform for Car Rental
                </h2>
                <p>
                  Ease of doing a car rental safely and reliably. Of course at a
                  low price.
                </p>
                <div className="w-1/2">
                  <Link href="#CarList">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={"/landing-page-header.png"}
                  alt="Object Cover"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="right bottom"
                />
              </div>
            </div>

            <div id="CarList" className="mt-10">
              <span className="text-c-text-grey font-semibold">Cars List</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                {kendaraanList.map((kendaraan, index) => (
                  <CarCard key={index} data={kendaraan} />
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
