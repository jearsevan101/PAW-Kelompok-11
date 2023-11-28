import { FaCar, FaList, FaTachometerAlt } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import SideButton from './SideButton';

const SideBar = () => {
  const [selectedButton, setSelectedButton] = useState('dashboard');
  const icons = {
      'dashboard': <FaTachometerAlt />,
      'add-car': <FaCar />,
      'list-car': <FaList />
  };
  return (
    <div className="fixed top-0 left-0 bg-primary-0 w-64 h-full text-justify text-lightsteelblue-100 flex flex-col p-4 overflow-hidden mt-[96px]">
      <h2 className="font-semibold text-c-text-grey text-[12px] px-5 tracking-widest mb-4">
            MAIN MENU
      </h2>
      <div className="flex flex-col items-start justify-start gap-[10px] text-base text-secondary-300 mt-5">
        <Link href="./dashboard">
            <SideButton icon={icons['dashboard']} selected={selectedButton === 'dashboard'} onClick={() => setSelectedButton('dashboard')}>Dashboard</SideButton>
        </Link>
        <Link href="./add-car">
          <SideButton icon={icons['add-car']} selected={selectedButton === 'add-car'} onClick={() => setSelectedButton('add-car')}>Add Car</SideButton>
        </Link>
        <Link href="./list-car">
          <SideButton icon={icons['list-car']} selected={selectedButton === 'list-car'} onClick={() => setSelectedButton('list-car')}>Car List</SideButton>
        </Link>
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