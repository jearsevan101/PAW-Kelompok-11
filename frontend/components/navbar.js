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
    } else {
      setOnMainPages(true);
    }
  }, [router.pathname]);
  const handleSearch = (query) => {
    if (!onMainPages) {
      router.push({
        pathname: "/",
        query: { nameF: query },
      });
    } else {
      onSearchSend(query);
    }
  };

  const handleFilterClick = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleApplyFilters = (price, capacity, type, selectedCity) => {
    console.log(
      "Filters applied in Navbar:",
      { price, capacity, type, selectedCity },
    );
    if (!onMainPages) {
      router.push({
        pathname: "/",
        query: {
          slc_city: selectedCity,
          priceF: price,
          capacityF: capacity,
          typeF: type,
        },
      });
    }else {
      onFilterSend(price, capacity, type, selectedCity);
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    setVisible(currentScrollPos <= 0 || currentScrollPos < prevScrollPos);

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
      className={`w-full fixed z-50 bg-white max-h-[130px] shadow-md transition-transform duration-300 ${
        visible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}>
      <nav className="max-w-[1440px] mx-auto sm:px-4 px-8 py-2">
        <div className="flex flex-row sm:flex-row justify-between items-center ">
          <div className="flex items-center order-1">
            <Link href="/" className="flex justify-center items-center">
              <Image src="/Logo.svg" alt="Logo" width={100} height={50} />
            </Link>
          </div>
          <div className="flex items-center sm:order-3 order-2">
            {userLogin ? (
              <Profile logOut={() => setUserLogin(false)} />
            ) : (
              <Link href={`/auth/login`}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
          <div className=" hidden flex-1 sm:flex justify-start ml-0 sm:ml-10 items-center sm:order-2  order-3 mt-2 sm:mt-0">
            <Searchbar
              onSearch={handleSearch}
              onFilterClick={handleFilterClick}
            />
          </div>
        </div>

        <div className="block sm:hidden my-2">
          <Searchbar
            onSearch={handleSearch}
            onFilterClick={handleFilterClick}
          />
        </div>
      </nav>
      {isFilterVisible && <Filter onApplyFilters={handleApplyFilters} />}
    </header>
  );
};

export default Navbar;
