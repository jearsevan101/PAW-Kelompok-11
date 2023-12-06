import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/Button";
import Navbar from "@/components/navbar";
import CarCard from "@/components/CarCard";
import Loading from "@/components/Loading";
import Footer from "@/components/footer";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";

export default function Home() {
  // const [kendaraanList, setKendaraanList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [kendaraanListSearch, setkendaraanListSearch] = useState([]);
  const [name, setName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [price, setPrice] = useState(3000000);
  const [capacity, setCapacity] = useState(null);
  const [type, setType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { nameF, slc_city, priceF, capacityF, typeF} = router.query;
    if (nameF) {
      setName(nameF);
    }
    if(slc_city || priceF || capacityF || typeF){
      setSelectedCity(slc_city);
      setPrice(priceF);
      setCapacity(capacityF);
      setType(typeF);
    }
    const apiUrl = `https://paw-kelompok-11-server.vercel.app/api/kendaraan?search=${name || ''}&sort=asc&hargaBelow=${price|| ''}&capacity=${capacity|| ''}&type=${type|| ''}&kota=${selectedCity|| ''}`;
    console.log("API URL:", apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        setkendaraanListSearch(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [name, price, capacity, type, selectedCity]);
  const handleNameChange = (query) => {
    resetFilter();
    setName(query);
  };
  const resetFilter = () =>{
    setCapacity(null);
    setPrice(3000000);
    setType('');
    setSelectedCity('');
  }
  const resetSearch = () =>{
    setName('');
  }
  const handleFiltersChange = (price, capacity, type, selectedCity) => {
    resetSearch();
    setCapacity(capacity);
    setPrice(price);
    setType(type);
    setSelectedCity(selectedCity);
  };
  return (
    <>
      <Navbar onSearchSend={handleNameChange} onFilterSend={handleFiltersChange}/>
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
                {kendaraanListSearch.map((kendaraan, index) => (
                  <CarCard key={index} data={kendaraan} />
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
      <Footer/>
    </>
  );
}
