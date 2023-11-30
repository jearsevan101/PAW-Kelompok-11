import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import Searchbar from "./Searchbar";
import Filter from "./Filter";
import Profile from "./Profile";

const Navbar = ({onSearchSend,onFilterSend}) => {
  const [userLogin, setUserLogin] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const handleSearch = (query) => {
    // Perform search logic with the query
    onSearchSend(query);
    console.log("Searching for:", query);
  };
  const handleFilterClick = () => {
    setFilterVisible((prev) => !prev);
  };
  const handleApplyFilters = (price,capacity,type) => {
    console.log("Filters applied in Navbar:", { price, capacity, type });
    onFilterSend(price, capacity, type)
  };
  return (
    <header
      className="w-full absolute z-10 bg-white shadow-md"
      style={{ height: "80px" }}
    >
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-4 px-6 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/Logo.svg" alt="Logo" width={100} height={50} />
          </Link>
          <div className="ml-20">
            <Searchbar onSearch={handleSearch} onFilterClick={handleFilterClick} />
          </div>
        </div>
        
        {userLogin?(
          <Profile/>
        ) : (
          <Link href={`/auth/login`}>
            <Button>Login</Button>
          </Link>  
        )}
      </nav>
      {isFilterVisible && <Filter onApplyFilters={handleApplyFilters}/>}
    </header>
  );
};

export default Navbar;
