import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import Searchbar from "./Searchbar";
import Filter from "./Filter";
import Profile from "./Profile";

const Navbar = () => {
  const [userLogin, setUserLogin] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const handleSearch = (query) => {
    // Perform search logic with the query
    console.log("Searching for:", query);
  };
  const filterClicked =()=>{
    if(isFilterVisible == true){
      setFilterVisible(false);
    }else {
      setFilterVisible(true);
    }
  }

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
            <Searchbar onSearch={handleSearch} filterClick={filterClicked} />
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
      {isFilterVisible && <Filter/>}
    </header>
  );
};

export default Navbar;
