import CarCard from "@/components/CarCard";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListCar() {
  const [kendaraanList, setKendaraanList] = useState([]);
  useEffect(() => {
    const apiUrl = "https://paw-kelompok-11-server.vercel.app/api/kendaraan";

    axios
      .get(apiUrl)
      .then((response) => {
        setKendaraanList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-[#F6F7F9] flex flex-col md:flex-row justify-between">
      <div className="md:w-64 w-full">
          <SideBar />
        </div>
        <div className="flex-grow rounded-lg m-8 bg-white p-8">
          <h2 className="text-lg font-medium mb-4 text-c-text-grey">
            List Car
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {kendaraanList.map((kendaraan, index) => (
              <CarCard isAdmin={true} key={index} data={kendaraan} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
