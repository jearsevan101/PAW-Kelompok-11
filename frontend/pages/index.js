import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";

export default function Home() {
  return (
    <>
      <div className="container min-h-screen mx-auto">
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
              {[...Array(16)].map((_, index) => (
                <Link href="/car/1" key={index}>
                  <CarCard key={index} />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
