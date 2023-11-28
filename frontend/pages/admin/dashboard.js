import Link from 'next/link';
import Image from 'next/image';
import SideButton from 'components/SideButton';
import SideBar from 'components/SideBar';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [sewaList, setSewaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://paw-kelompok-11-server.vercel.app/api/sewa/")
      .then((response) => {
        setSewaList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (query) => {
    setName(query);
  };
  return (
    <>  
    <Navbar onSearchSend={handleNameChange}/>
    <main className="container min-h-screen pt-20 bg-[#F6F7F9] flex flex-col sm:flex-row justify-between px-4 sm:px-0">
      <div className="object-cover relative w-full sm:w-[250px] p-8 h-screen overflow-hidden bg-[#FFFFFF]">
          <SideBar/> 
      </div>
      <div className="object-cover relative w-full sm:w-[600px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] ml-[24px] mb-[36px] mt-[36px]">
          <h2 className="font-bold text-[20px]">
            Details Rental
          </h2>
      </div>
      <div className="object-cover relative w-full sm:w-[600px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] ml-[24px] mb-[36px] mt-[36px] mr-[20px]">
          <h2 className="font-bold text-[20px]">
            Recent Transcation
          </h2>
            {sewaList.map(sewa => (
              <div key={sewa._id}>
                <p>Kendaraan ID: {sewa.kendaraan_id}</p>
                <p>Customer ID: {sewa.customer_id}</p>
                <p>Tanggal Sewa: {sewa.tanggal_sewa}</p>
                <p>Tanggal Kembali: {sewa.tanggal_kembali}</p>
                <p>Total Harga: {sewa.total_harga}</p>
                <p>Status: {sewa.status}</p>
                <p>__v: {sewa.__v}</p>
              </div>
            ))}
          </div>
    </main>
    </>
  );
};