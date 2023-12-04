import { FaCar, FaList, FaTachometerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideButton = ({ children, selected, icon, ...props }) => {
  return (
    <button
      className={`${
        selected
          ? "bg-c-primary flex flex-row items-center text-white w-full h-10 font-regular px-5 py-4 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left text-sm md:text-base"
          : "bg-c-light-grey flex flex-row items-center text-c-text-grey w-full h-10 font-regular px-5 py-4 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left text-sm md:text-base"
      }`}
      {...props}
      aria-current={selected ? "page" : undefined}>
      {icon}
      <span className="ml-3">{children}</span>
    </button>
  );
};

const SideBar = () => {
  const [selectedButton, setSelectedButton] = useState("dashboard");
  const icons = {
    dashboard: <FaTachometerAlt />,
    "add-car": <FaCar />,
    "list-car": <FaList />,
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      link: "./dashboard",
      actualLink: "/admin/dashboard",
    },
    {
      id: "add-car",
      label: "Add Car",
      link: "./add-car",
      actualLink: "/admin/add-car",
    },
    {
      id: "list-car",
      label: "Car List",
      link: "./list-car",
      actualLink: "/admin/list-car",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const currentRoute = router.asPath;
    const selectedItem = menuItems.find(
      (item) => currentRoute === item.actualLink
    );
    console.log("Selected Item:", selectedItem);
    if (selectedItem) {
      setSelectedButton(selectedItem.id);
    }
  }, [router.asPath]);

  return (
    <div className="bg-white top-20 md:top-0 z-20 md:h-full w-full md:w-[240px] text-justify flex flex-col p-6 overflow-hidden">
      <h2 className="font-semibold text-c-text-grey text-[12px] px-5 tracking-widest mb-4">
        MAIN MENU
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-1  justify-start gap-3 text-base mt-2">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.link}>
            <SideButton
              icon={icons[item.id]}
              selected={selectedButton === item.id}
              onClick={() => setSelectedButton(item.id)}>
              {item.label}
            </SideButton>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
