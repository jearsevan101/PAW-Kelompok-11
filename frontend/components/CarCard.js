import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { HiOutlineLocationMarker, HiTrash } from "react-icons/hi";
import { BsFillFuelPumpFill, BsPeopleFill } from "react-icons/bs";
import { RiSteering2Fill } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import axios from "axios";

const CarCard = ({ data, isAdmin }) => {
  const {
    nama,
    deskripsi,
    lokasi,
    kota,
    harga,
    fuel_capacity,
    type,
    capacity,
    img_url,
  } = data;

  const router = useRouter()

  const formattedHarga = harga.toLocaleString("id-ID");
  const kendaraanId = data._id;
  const handleEdit = () => {
    const kendaraanId = data._id
    router.push(`/admin/${kendaraanId}`)
    // Implement your logic for editing the car
    console.log("Edit Car:", data);
  };

  const handleDelete = () => {
    const apiUrl = `https://paw-kelompok-11-server.vercel.app/api/kendaraan/${kendaraanId}`;
    axios
      .delete(apiUrl)
      .then((response) => {
        alert("Car delete successfully!")
        window.location.reload();
      })
      .catch((error) => {
        alert(error)
        console.error("Error fetching data:", error);
      });
    // Implement your logic for deleting the car
    console.log("Delete Car:", data);
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_35px_40px_4px_rgba(0,0,0,0.02)] p-6 gap-y-8 flex flex-col overflow-hidden">
      <div className="absolute">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-[320px] h-[11px] bg-white z-10 blur-[14px] absolute mt-[205px] rounded-full"
          />
        ))}
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <h3 className="font-bold text-c-text-dark text-xl">{nama}</h3>
          <div className="flex text-sm items-center gap-1 flex-row text-c-text-grey">
            <HiOutlineLocationMarker />
            <p className="font-medium ">{kota}</p>
          </div>
        </div>
        {isAdmin && (
          <button onClick={handleDelete} className="text-lg text-c-text-grey">
            <HiTrash />
          </button>
        )}
      </div>

      <div className="relative w-full h-[120px] mt-6">
        <Image src={img_url[0]} alt={nama} layout="fill" objectFit="contain" />
      </div>

      <div className="items-center gap-2 font-medium text-c-text-grey">
        <ul className="flex flex-row justify-between">
          <li className="flex-row flex gap-2">
            <BsFillFuelPumpFill className="text-2xl" />
            <p>{fuel_capacity}L</p>
          </li>
          <li className="flex-row flex gap-2">
            <RiSteering2Fill className="text-2xl" />
            <p>{type}</p>
          </li>
          <li className="flex-row flex gap-2">
            <BsPeopleFill className="text-2xl" />
            <p>{capacity} People</p>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-c-text-dark">
          {`Rp${formattedHarga}`}
          <span className="text-c-text-grey text-sm">/day</span>
        </p>
        {isAdmin ? (
          <Button onClick={handleEdit}>Edit</Button>
        ) : (
          <Link href={`/car/${data._id}`}>
            <Button>More Detail</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarCard;
