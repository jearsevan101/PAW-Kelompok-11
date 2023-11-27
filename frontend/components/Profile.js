import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useState } from 'react';

const Profile = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
  
    return (
      <div className="relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <Image src="/Profile.png" alt="Profile" width={40} height={40} />
        </button>
  
        {isDropdownVisible && (
          <div
            id="dropdownInformation"
            className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white mb-1">
                <div className="text-lg font-bold text-center">John Doe</div>
                <div className="text-sm font-medium opacity-70 truncate text-center">@johnDoe</div>
                <div className="text-sm font-medium opacity-70 truncate text-center">name@flowbite.com</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Order List
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };
export default Profile;