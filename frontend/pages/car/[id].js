import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import CarCard from "@/components/CarCard";
import Button from "@/components/Button";

import { HiOutlineLocationMarker } from "react-icons/hi";

export default function CarDescription() {
  return (
    <>
      <div className="container min-h-screen mx-auto">
        <main className="my-6 mx-4">
          <div className="flex flex-col md:flex-row gap-8">
            <CarouselImage />
            <div className="w-full md:w-2/3 bg-white rounded-xl p-8">
              <div>
                <h3 className="font-bold text-c-text-dark text-3xl">
                  All New Terios
                </h3>
                <div className="flex text-sm items-center gap-1 flex-row text-c-text-grey">
                  <HiOutlineLocationMarker />
                  <p className="font-medium ">D.I Yogyakarta</p>
                </div>
                <p className="mt-6 text-[#596780]">
                  All New Terios" is a compelling and innovative crossover SUV
                  that sets new standards for versatility, performance, and
                  design. With a harmonious blend of cutting-edge technology and
                  sophisticated engineering, this vehicle caters to the demands
                  of the modern driver.
                </p>
                <div className=" items-center mt-28 gap-2 font-regular  text-c-text-grey">
                  <div className="flex flex-row w-full md:w-1/2 gap-12">
                    <div className="flex flex-row justify-between w-1/2">
                      <span className="font-regular">Capacity</span>
                      <span className="font-semibold text-[#596780]">
                        6 Person
                      </span>
                    </div>
                    <div className="flex flex-row justify-between w-1/2">
                      <span className="font-regular">Gasoline</span>
                      <span className="font-semibold text-[#596780]">
                        70 Liter
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" items-center mt-2 gap-2 font-regular  text-c-text-grey">
                  <div className="flex flex-row w-full md:w-1/2 gap-12">
                    <div className="flex flex-row justify-between w-1/2">
                      <span className="font-regular">Steering</span>
                      <span className="font-semibold text-[#596780]">
                        Manual
                      </span>
                    </div>
                    <div className="flex flex-row justify-between w-1/2"></div>
                  </div>
                </div>
                <div className="flex mt-12 items-center justify-between">
                  <p className="text-3xl font-bold text-c-text-dark">
                    Rp200.000{" "}
                    <span className="text-c-text-grey text-sm">/day</span>
                  </p>
                  <Link href="/orders/form">
                    <Button>Rent Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <span className="text-c-text-grey font-semibold">
              Recommendation Car
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {[...Array(4)].map((_, index) => (
                <CarCard key={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const MainImage = ({ src }) => {
  return (
    <div className="w-full p-8 bg-c-primary pattern rounded-lg">
      <div className="flex flex-col gap-16">
        <div className="text-white text-sm flex flex-col gap-2 font-regular">
          <Image
            src="/rentalin-white.svg"
            alt="logo"
            width={120}
            height={120}
          />

          <p>
            Ease of doing a car rental safely and reliably. <br /> Of course at
            a low price.
          </p>
        </div>
        <div className="w-full h-[150px] relative">
          <Image src={src} alt="Car" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

const ViewMainImage = ({ src, className }) => {
  return (
    <div
      className={`${className} box-border w-full h-32 flex items-center py-4 bg-c-primary pattern rounded-lg`}>
      <div className="w-full h-[50px] relative">
        <Image src={src} alt="Car" layout="fill" objectFit="contain" />
      </div>
      <div className="inner-border box-border"></div>
    </div>
  );
};

const CarouselImage = () => {
  const images = ["/mobil.png", "/view2.png", "/view3.png"];
  const [selectedImage, setSelectedImage] = useState("/mobil.png");

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full md:w-1/3">
      {selectedImage === "/mobil.png" ? (
        <MainImage src={selectedImage} />
      ) : (
        <div className="relative w-full h-[350px] main-image">
          <Image
            className="rounded-lg"
            src={selectedImage}
            alt="Car"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="flex cursor-pointer flex-row gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative duration-75 transition-all w-full h-32 ${
              image === selectedImage && image !== "/mobil.png"
                ? "border-c-primary box-border border-[3px] border-solid rounded-lg"
                : ""
            }`}
            onClick={() => handleImageClick(image)}>
            {image !== "/mobil.png" ? (
              <Image
                className={`transition-all rounded-lg ${
                  image === selectedImage
                    ? "border-[#F6F7F9] border-[6px] border-solid"
                    : ""
                }`}
                src={image}
                alt="Car"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <ViewMainImage
                className={`transition-all ${
                  image === selectedImage
                    ? "border-[#F6F7F9] rounded-lg border-[9px] border-solid "
                    : ""
                }`}
                src={image}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
