import Link from "next/link";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Image from "next/image";

const AuthOrnament = () => {
  return (
    <>
      <Link href="/" className="absolute">
        <div className="m-8 flex flex-row items-center gap-2 text-c-text-grey text-md">
          <span className="text-xl">
            <IoChevronBackCircleOutline />{" "}
          </span>
          Back to Home Page{" "}
        </div>
      </Link>
      <div className="absolute bottom-0 right-0">
        <Image src="/pattern-login.png" width={600} height={600} />
      </div>
    </>
  );
};

export default AuthOrnament;
