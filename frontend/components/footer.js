import Link from 'next/link';
import Image from 'next/image';
import Button from "./Button";
import Searchbar from './Searchbar';

const Footer = () =>{
  return (
    <footer className="bg-white text-black mt-5 border-t border-gray-100">
      <div className="flex justify-center items-center sm:px-16 px-6 py-10">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={100}
              height={50}
            />
          </div>
          <p className='text-[#717171]'>
            Ease of doing a car rental safely and reliably. <br/>Of course at a low price
          </p>
          <div className="border-t border-[c-text-grey] flex my-4"></div>
          <p className='font-semibold text-sm'>
            ©2023 RentalIn. All right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
