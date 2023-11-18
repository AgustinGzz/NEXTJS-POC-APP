import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

const NavButton: React.FC<Props> = ({ label, href }) => {
  return (
    <Link href={href}>
      <button className='border-white border-2 p-3'>{label}</button>
    </Link>
  );
};

export default NavButton;
