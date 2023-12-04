import{ useEffect, useState } from "react";

import {IoIosArrowUp } from 'react-icons/io'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${
        isVisible ? "translate-y-0" : "translate-y-96"
      } block z-20 fixed bottom-8 right-8 bg-blue-500 font-bold opacity-50 hover:opacity-100 text-blue-100 text-3xl p-3 rounded-full cursor-pointer transition-all`}
      onClick={handleBackToTop}
    >
      <IoIosArrowUp />
    </button>
  );
};

export default BackToTopButton;
