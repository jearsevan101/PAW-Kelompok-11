import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillFuelPumpFill, BsPeopleFill } from "react-icons/bs";
import { RiSteering2Fill } from "react-icons/ri";

const CarCard = ({ data }) => {
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

  const formattedHarga = harga.toLocaleString("id-ID");

  return (
    <div className="bg-white rounded-xl p-6 gap-y-8 flex flex-col overflow-hidden">
      <div className="absolute">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-[320px] h-[11px] bg-white z-10 blur-[14px] absolute mt-[205px] rounded-full"
          />
        ))}
      </div>

      <div>
        <h3 className="font-bold text-c-text-dark text-xl">{nama}</h3>
        <div className="flex text-sm items-center gap-1 flex-row text-c-text-grey">
          <HiOutlineLocationMarker />
          <p className="font-medium ">{kota}</p>
        </div>
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
        <Link href={`/car/${data._id}`}>
          <Button>More Detail</Button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
