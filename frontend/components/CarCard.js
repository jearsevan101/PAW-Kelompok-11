import Image from "next/image";
import Link from "next/link";

import Button from "./Button";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsFillFuelPumpFill, BsPeopleFill } from "react-icons/bs";
import { RiSteering2Fill } from "react-icons/ri";

const CarCard = () => {
  return (
    <>
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
          <h3 className="font-bold text-c-text-dark text-xl">All New Terios</h3>
          <div className="flex text-sm items-center gap-1 flex-row text-c-text-grey">
            <HiOutlineLocationMarker />
            <p className="font-medium ">D.I Yogyakarta</p>
          </div>
        </div>

        <div className="relative w-full h-[120px] mt-6">
          <Image
            src={"/mobil.png"}
            alt="Car 1"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className=" items-center gap-2 font-medium  text-c-text-grey">
          <ul className="flex flex-row justify-between">
            <li className="flex-row flex gap-2">
              <BsFillFuelPumpFill className="text-2xl" />
              <p>70L</p>
            </li>
            <li className="flex-row flex gap-2">
              <RiSteering2Fill className="text-2xl" />
              <p>Manual</p>
            </li>
            <li className="flex-row flex gap-2">
              <BsPeopleFill className="text-2xl" />
              <p>6 People</p>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-c-text-dark">
            Rp200.000 <span className="text-c-text-grey text-sm">/day</span>
          </p>
          <Link href='/car/id'>
            <Button>Rent Now</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CarCard;
