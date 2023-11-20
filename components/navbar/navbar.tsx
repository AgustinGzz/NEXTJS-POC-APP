import labLogo from "@/public/svgs/lab.svg";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./navlinks";

const Navbar: React.FC = () => {
  return (
    <nav className='bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 nav-container'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image src={labLogo} width={25} alt='lab image' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white max-sm:hidden'>
            Agus Playground
          </span>
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
