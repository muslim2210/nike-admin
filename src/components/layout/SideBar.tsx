"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./NavLink";
import { CircleUser } from "lucide-react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-[280px] left-0 top-0 sticky p-10 flex flex-col gap-16 bg-gray-200 shadow-xl max-lg:hidden">
      <Image src="/logo.svg" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 items-center text-body-medium ${
              pathname === link.url ? "text-blue-500" : "text-black"
            }`}
          >
            {link.icon} <p className="capitalize">{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <CircleUser />
        <p className="text-primaryBlack">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
