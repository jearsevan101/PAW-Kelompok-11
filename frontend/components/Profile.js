import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = (logOut) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isLoginAsAdmin, setisLoginAsAdmin] = useState(false);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
    useEffect(() => {
      try {
        const id = jwtDecode(Cookies.get("auth_info")).id
        const username = jwtDecode(Cookies.get("auth_info")).username
        if(username == "admin"){
          setisLoginAsAdmin(true);
        }
        const apiUrl = `https://paw-kelompok-11-server.vercel.app/api/customer/${id}`;
        axios
          .get(apiUrl)
          .then((response) => {
            setName(response.data.nama);
            setUserName(response.data.username);
            setEmail(response.data.email);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error(error);
      }
      
    }, []);
    const logOutClicked = () =>{
      Cookies.remove("auth_info");
      setisLoginAsAdmin(false);
      window.location.href = "/";
      logOut;
    }
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
                <div className="text-lg font-bold text-center">{name}</div>
                <div className="text-sm font-medium opacity-70 truncate text-center">@{userName}</div>
                <div className="text-sm font-medium opacity-70 truncate text-center">{email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
              <li>
                {isLoginAsAdmin?(
                  <Link href={`/admin/dashboard`}>
                    <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Admin Dashboard
                    </div>
                  </Link>
                ):(
                  <Link href={`/order-list`}>
                    <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Order List
                    </div>
                  </Link>
                )}
              </li>
              <li>
              {isLoginAsAdmin?(
                  <Link href={`/admin/list-car`}>
                    <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      List Car
                    </div>
                  </Link>
                ):(
                  null
                )}
              </li>
            </ul>
            <div className="py-2">
              <div onClick={logOutClicked}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
export default Profile;