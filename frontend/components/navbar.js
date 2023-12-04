import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import Searchbar from "./Searchbar";
import Filter from "./Filter";
import Profile from "./Profile";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const Navbar = ({ onSearchSend, onFilterSend }) => {
  const [userLogin, setUserLogin] = useState(false);
  const [onMainPages, setOnMainPages] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  useEffect(() => {
    try {
      const jwt = jwtDecode(Cookies.get("auth_info"));

      if (jwt != null) {
        setUserLogin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    if (router.pathname !== "/") {
      setOnMainPages(false);
    }else {
      setOnMainPages(true);
    }
  }, [router.pathname]);
  const handleSearch = (query) => {
    if(!onMainPages){
      router.push({
        pathname: '/',
        query: { nameF: query }
      })
    }else {
      onSearchSend(query);
    }
    console.log("Searching for:", query);
  };

  const handleFilterClick = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleApplyFilters = (price, capacity, type, selectedCity) => {
    console.log(
      "Filters applied in Navbar:",
      { price, capacity, type, selectedCity },
      jwtDecode(Cookies.get("auth_info"))
    );
    if(!onMainPages){
      router.push({
        pathname: '/',
        query: { slc_city: selectedCity, priceF: price, capacityF : capacity, typeF: type }
    })}
    onFilterSend(price, capacity, type, selectedCity);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    setVisible(
      currentScrollPos <= 0 || currentScrollPos < prevScrollPos
    );

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <header
      className={`w-full fixed z-50 bg-white shadow-md transition-transform duration-300 ${
        visible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
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

        {userLogin ? (
          <Profile logOut={() => setUserLogin(false)} />
        ) : (
          <Link href={`/auth/login`}>
            <Button>Login</Button>
          </Link>
        )}
      </nav>
      {isFilterVisible && <Filter onApplyFilters={handleApplyFilters} />}
    </header>
  );
};

export default Navbar;
