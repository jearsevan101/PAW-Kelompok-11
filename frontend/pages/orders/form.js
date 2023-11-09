import Link from 'next/link';
import Image from 'next/image';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';

const Navbar = () => {
  const handleSearch = (query) => {
    // Perform search logic with the query
    console.log('Searching for:', query);
  };

  return (
    <header className="w-full absolute z-10 bg-white shadow-md" style={{ height: '80px' }}>
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-4 px-6 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/Logo.svg" alt="Logo" width={100} height={50} />
          </Link>
          <div className="ml-20">
            <Searchbar onSearch={handleSearch} />
          </div>
        </div>
        <Image src="/Notification.png" alt="Logo" width={40} height={40} />
      </nav>
    </header>
  );
};

const HFOrders = () => {
  return (
    <div className="relative w-full h-[1024px] text-left text-xl text-secondary-500 font-medium-type14">
      <div className="absolute top-[124px] left-[0px] bg-whitesmoke-100 w-[1440px] h-[900px] overflow-hidden">
        <div className="absolute top-[34px] left-[739px] rounded-3xs bg-primary-0 w-[659px] h-[832px] overflow-hidden">
          <div className="absolute top-[24px] left-[24px] flex flex-row items-start justify-start gap-[216px]">
            <b className="relative tracking-[-0.03em] leading-[150%] flex items-center w-48 h-6 shrink-0">
              History Transaction
            </b>
            <div className="relative text-xs leading-[200%] font-medium text-primary-500 text-right flex items-center w-[68px] h-6 shrink-0">
              View All
            </div>
          </div>
          <div className="absolute top-[80px] left-[24px] flex flex-col items-start justify-start gap-[16px] text-base">
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Nissan GT - R
                </b>
                <div className="rounded bg-warning-300 w-[120px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-warning-900">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rejected
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    20 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $80.00
                </b>
              </div>
            </div>
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Nissan GT - R
                </b>
                <div className="rounded bg-warning-300 w-[120px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-warning-900">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rejected
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    20 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $80.00
                </b>
              </div>
            </div>
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Nissan GT - R
                </b>
                <div className="rounded bg-warning-300 w-[120px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-warning-900">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Returned
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    20 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $80.00
                </b>
              </div>
            </div>
            <div className="relative box-border w-[477px] h-px border-t-[1px] border-solid border-lightsteelblue-200" />
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Koegnigsegg
                </b>
                <div className="rounded bg-error-300 w-[103px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-error-800">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rejected
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    19 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $99.00
                </b>
              </div>
            </div>
            <div className="relative box-border w-[477px] h-px border-t-[1px] border-solid border-lightsteelblue-200" />
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Rolls - Royce
                </b>
                <div className="rounded bg-success-300 w-[103px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-success-800">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Returned
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    18 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $96.00
                </b>
              </div>
            </div>
            <div className="relative box-border w-[477px] h-px border-t-[1px] border-solid border-lightsteelblue-200" />
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  CR - V
                </b>
                <div className="rounded bg-information-400 w-[103px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-information-800">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rented
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    17 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $80.00
                </b>
              </div>
            </div>
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  Koegnigsegg
                </b>
                <div className="rounded bg-error-300 w-[103px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-error-800">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rejected
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    19 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $99.00
                </b>
              </div>
            </div>
            <div className="relative w-[328px] h-[51px]">
              <div className="absolute top-[0px] left-[0px] flex flex-col items-start justify-start gap-[8px]">
                <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-[108px] h-5 shrink-0">
                  CR - V
                </b>
                <div className="rounded bg-information-400 w-[103px] h-[23px] flex flex-row items-center justify-center py-[9px] px-2.5 box-border text-center text-3xs text-information-800">
                  <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                    Rented
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[220px] flex flex-col items-start justify-start gap-[8px] text-right text-xs text-secondary-300">
                <div className="flex flex-row items-center justify-start">
                  <div className="relative tracking-[-0.02em] font-medium flex items-center w-[108px] h-5 shrink-0">
                    17 July
                  </div>
                </div>
                <b className="relative text-base tracking-[-0.02em] leading-[150%] flex text-secondary-500 items-center w-[108px] h-5 shrink-0">
                  $80.00
                </b>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-[34px] left-[61px] rounded-3xs bg-primary-0 w-[646px] h-[836px] overflow-hidden text-base">
          <b className="absolute top-[24px] left-[24px] text-xl tracking-[-0.03em] leading-[150%] flex items-center w-48 h-6">
            Recent Rental
          </b>
          <div className="absolute top-[75px] left-[172px] flex flex-col items-start justify-start gap-[8px] text-5xl">
          </div>
          <div className="absolute top-[173px] left-[24px] flex flex-row items-center justify-start gap-[8px]">
            <div className="rounded-51xl bg-royalblue flex flex-row items-center justify-center p-1">
              <div className="relative rounded-[50%] bg-primary-500 w-2 h-2" />
            </div>
            <div className="relative tracking-[-0.02em] leading-[150%] font-semibold flex items-center w-[68px] h-5 shrink-0">
              Pick - Up
            </div>
          </div>
          <div className="absolute top-[213px] left-[24px] flex flex-row items-start justify-start gap-[24px]">
            <div className="relative box-border w-px h-[49px] border-r-[1px] border-solid border-lightsteelblue-200" />
            <div className="flex flex-col items-start justify-start gap-[8px]">
              <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-12 h-5 shrink-0">
                Date
              </b>
              <div className="flex flex-row items-center justify-start gap-[8px] text-xs text-secondary-300">
                <div className="relative tracking-[-0.02em] font-medium flex items-center w-28 h-5 shrink-0">
                  20 July 2022
                </div>
              </div>
            </div>
            <div className="relative box-border w-px h-[49px] border-r-[1px] border-solid border-lightsteelblue-200" />
          </div>
          <div className="absolute top-[293px] left-[24px] flex flex-row items-center justify-start gap-[8px]">
            <div className="rounded-51xl bg-cornflowerblue flex flex-row items-center justify-center p-1">
              <div className="relative rounded-[50%] bg-information-500 w-2 h-2" />
            </div>
            <div className="relative tracking-[-0.02em] leading-[150%] font-semibold flex items-center w-20 h-5 shrink-0">
              Drop - Off
            </div>
          </div>
          <div className="absolute top-[333px] left-[24px] flex flex-row items-start justify-start gap-[24px]">
            <div className="relative box-border w-px h-[49px] border-r-[1px] border-solid border-lightsteelblue-200" />
            <div className="flex flex-col items-start justify-start gap-[8px]">
              <b className="relative tracking-[-0.02em] leading-[150%] flex items-center w-12 h-5 shrink-0">
                Date
              </b>
              <div className="flex flex-row items-center justify-start gap-[8px] text-xs text-secondary-300">
                <div className="relative tracking-[-0.02em] font-medium flex items-center w-28 h-5 shrink-0">
                  21 July 2022
                </div>
              </div>
            </div>
            <div className="relative box-border w-px h-[49px] border-r-[1px] border-solid border-lightsteelblue-200" />
          </div>
          <div className="absolute top-[420.5px] left-[23.5px] box-border w-[487px] h-px border-t-[1px] border-solid border-lightsteelblue-200" />
          <div className="absolute top-[457px] left-[24px] flex flex-row items-start justify-start gap-[74px] text-xl">
            <div className="w-[284px] flex flex-col items-start justify-start gap-[4px]">
              <b className="relative tracking-[-0.03em] leading-[150%] flex items-center w-[200px] h-6 shrink-0">
                Total Rental Price
              </b>
              <div className="relative text-sm tracking-[-0.02em] leading-[150%] font-medium text-secondary-300 flex items-center w-[284px] h-5 shrink-0">
                Overall price and includes rental discount
              </div>
            </div>
            <b className="relative text-13xl flex text-right items-center w-32 h-12 shrink-0">
              $80.00
            </b>
          </div>
          <div className="absolute top-[758px] left-[67px] rounded-[5.6px] bg-error-300 w-[486px] h-[43px] flex flex-row items-center justify-center py-[12.59999942779541px] px-3.5 box-border text-center text-sm text-error-800">
            <Link href="./form">
              <Button>Cancel Order</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-[40px] left-[1362px] flex flex-row items-start justify-start text-center text-base text-primary-0">
        <div className="flex flex-row items-center justify-center gap-[20px]">
          <div className="relative w-[104px] h-11 hidden">
            <div className="absolute top-[calc(50%_-_22px)] left-[calc(50%_-_52px)] rounded bg-primary-500 w-[104px] flex flex-row items-center justify-center py-[9px] px-4 box-border">
              <div className="relative tracking-[-0.02em] leading-[160%] font-semibold">
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  );
};

export default HFOrders;