"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "../ui/SidebarContent";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="w-full md:hidden fixed top-0 left-0 z-10 py-3 px-4 flex justify-between items-center bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50 text-white shadow-lg">
          <SheetTrigger>
            <RxHamburgerMenu size={26} className="text-violet-400 hover:text-violet-300 transition-colors" />
          </SheetTrigger>
          <Link href={"/"}>
            <div className="w-9 h-9 mx-auto rounded-full overflow-hidden object-center border-2 avatar border-violet-500 shadow-md shadow-violet-500/20">
              <Image
                src={"https://i.ibb.co/DYMCF0N/IMG-20220710-130806-698.jpg"}
                width={100}
                height={100}
                className="size-[130%] object-cover"
                alt="profile"
              />
            </div>
          </Link>
        </div>
        <SheetContent
          side={"left"}
          className="w-[300px] h-screen overflow-y-auto pb-0 bg-zinc-950 border-r border-zinc-800/60 text-slate-100"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="bg-zinc-950/60 backdrop-blur-md w-full max-w-64 lg:max-w-72 h-screen overflow-y-auto hidden md:block sticky top-0 left-0 border-r border-zinc-900/80 shadow-2xl">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
