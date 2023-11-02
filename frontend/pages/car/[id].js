import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import axios from "axios";

import CarCard from "@/components/CarCard";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

import { HiOutlineLocationMarker } from "react-icons/hi";

export default function CarDescription() {
  const router = useRouter();
  const { id } = router.query;

  const [kendaraanList, setKendaraanList] = useState([]);
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kendaraan")
      .then((response) => {
        setKendaraanList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/kendaraan/${id}`)
      .then((response) => {
        setCarDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  return (
    <>
      <div className="container min-h-screen mx-auto">
        {carDetails ? (
          <main className="my-6 mx-4">
            <div className="flex flex-col md:flex-row gap-8">
              <CarouselImage data={carDetails.img_url} />
              <div className="w-full md:w-2/3 bg-white rounded-xl p-8">
                <div>
                  <h3 className="font-bold text-c-text-dark text-3xl">
                    {carDetails.nama}
                  </h3>
                  <div className="flex text-sm mt-1 items-center gap-1 flex-row text-c-text-grey">
                    <HiOutlineLocationMarker />
                    <p className="font-medium">{carDetails.kota}</p>
                  </div>
                  <p className="mt-6 text-[#596780]">{carDetails.deskripsi}</p>
                  <div className=" items-center mt-28 gap-2 font-regular  text-c-text-grey">
                    <div className="flex flex-row w-full md:w-1/2 gap-12">
                      <div className="flex flex-row justify-between w-1/2">
                        <span className="font-regular">Capacity</span>
                        <span className="font-semibold text-[#596780]">
                          {`${carDetails.capacity} Person`}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between w-1/2">
                        <span className="font-regular">Gasoline</span>
                        <span className="font-semibold text-[#596780]">
                          {`${carDetails.fuel_capacity} Liter`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" items-center mt-2 gap-2 font-regular  text-c-text-grey">
                    <div className="flex flex-row w-full md:w-1/2 gap-12">
                      <div className="flex flex-row justify-between w-1/2">
                        <span className="font-regular">Steering</span>
                        <span className="font-semibold text-[#596780]">
                          {`${carDetails.type}`}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex mt-12 items-center justify-between">
                    {carDetails.harga ? (
                      <p className="text-3xl font-bold text-c-text-dark">
                        {`Rp${carDetails.harga.toLocaleString("id-ID")}`}
                        <span className="text-c-text-grey text-sm">/day</span>
                      </p>
                    ) : (
                      <p>Price not available</p>
                    )}
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
                {kendaraanList.slice(0, 4).map((kendaraan, index) => (
                  <CarCard key={index} data={kendaraan} />
                ))}
              </div>
            </div>
          </main>
        ) : (
          <div className="flex items-center min-h-screen justify-center ">
            <Loading />
          </div>
        )}
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

const CarouselImage = ({ data }) => {
  const images = data;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="w-full md:w-1/3">
      {selectedImage === images[0] ? (
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
              image === selectedImage && image !== images[0]
                ? "border-c-primary box-border border-[3px] border-solid rounded-lg"
                : ""
            }`}
            onClick={() => handleImageClick(image)}>
            {image !== images[0] ? (
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
