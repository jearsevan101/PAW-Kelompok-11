import Link from 'next/link';
import SideButton from './SideButton';
import { FaCar, FaList, FaTachometerAlt } from 'react-icons/fa';
import { useState } from 'react';

const SideBar = () => {
    const [selectedButton, setSelectedButton] = useState('dashboard');
    const icons = {
        'dashboard': <FaTachometerAlt />,
        'add-car': <FaCar />,
        'list-car': <FaList />
    };
    return (
      <div className="absolute top-[0px] left-[0px] bg-primary-0 box-border w-[286px] h-[900px] overflow-hidden text-justify text-lightsteelblue-100 border-r-[1px] border-solid border-whitesmoke-200">
        <div className="absolute top-[80px] left-[16px] rounded-3xs bg-primary-500 w-[254px] h-14" />
        <div className="absolute top-[36px] left-[32px] flex flex-col items-start justify-start">
          <div className="flex flex-col items-start justify-start gap-[20px]">
            <h2 className="font-semibold text-c-secondary text-12 px-5 tracking-widest">
                  MAIN MENU
            </h2>
            <div className="flex flex-col items-start justify-start gap-[10px] text-base text-secondary-300">
              <div className="flex flex-row items-center justify-start gap-[12px] text-primary-0">
              <Link href="./dashboard">
                  <SideButton icon={icons['dashboard']} selected={selectedButton === 'dashboard'} onClick={() => setSelectedButton('dashboard')}>Dashboard</SideButton>
              </Link>
              </div>
              <Link href="./add-car">
                <SideButton icon={icons['add-car']} selected={selectedButton === 'add-car'} onClick={() => setSelectedButton('add-car')}>Add Car</SideButton>
              </Link>
              <Link href="./list-car">
                <SideButton icon={icons['list-car']} selected={selectedButton === 'list-car'} onClick={() => setSelectedButton('list-car')}>Car List</SideButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-[824px] left-[32px] flex flex-row items-center justify-start gap-[12px] text-base text-secondary-300">
          <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex items-center w-[68px] h-7 shrink-0">
            Log Out
          </div>
        </div>
      </div>
    );
};

export default SideBar;