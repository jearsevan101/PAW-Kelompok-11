import { FaCar, FaList, FaTachometerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideButton = ({ children, selected, icon, ...props }) => {
  return (
    <button
      className={`${
        selected
          ? "bg-c-primary flex flex-row items-center text-white w-full sm:w-48 h-10 font-regular px-5 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left text-lg sm:text-base"
          : "bg-c-light-grey flex flex-row items-center text-c-text-grey w-full sm:w-48 h-10 font-regular px-5 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring text-left text-lg sm:text-base"
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
    <div className="fixed top-0 left-0 bg-primary-0 w-64 h-full text-justify text-lightsteelblue-100 flex flex-col p-4 overflow-hidden mt-[96px]">
      <h2 className="font-semibold text-c-text-grey text-[12px] px-5 tracking-widest mb-4">
        MAIN MENU
      </h2>
      <div className="flex flex-col items-start justify-start gap-[10px] text-base text-secondary-300 mt-5">
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
      <div className="mt-auto mb-4 flex flex-row items-center justify-start gap-[12px] text-base text-secondary-300">
        <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex items-center w-[68px] h-7 shrink-0">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default SideBar;
