"use client";

import { sideRoutes } from "@/utils/routeConstants";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import SidebarEmail from "./SidebarEmail";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const SidebarContent = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[1]?.slice(0, -1);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const sections = [
      "about",
      "skills",
      "experience",
      "project",
      "blog",
      "contact",
    ];

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      return { id, el };
    });

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    observers.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (path) {
        setActiveSection(path);
      } else if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    if (path) {
      setActiveSection(path);
    }else if (window.scrollY < 100) {
      setActiveSection("home");
    }
  }, [pathname]);
  
  return (
    <div className="h-full flex flex-col justify-between text-slate-200">
      <div className="px-5 text-center py-10">
        <div className="w-32 h-32 mx-auto rounded-full p-[3px] bg-gradient-to-tr from-violet-300 via-fuchsia-200 to-cyan-200 shadow-[0_0_30px_rgba(167,139,250,0.45)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(167,139,250,0.55)] ai-ring-pulse">
          <div className="w-full h-full rounded-full p-[2px] bg-zinc-950">
            <div className="w-full h-full rounded-full p-[1.5px] bg-gradient-to-bl from-cyan-600 via-fuchsia-600 to-violet-600">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profile.png"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6 font-heading tracking-tight text-white hover:text-violet-400 transition-colors">
          Janardhan Majumder
        </h3>
        <SidebarEmail />
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium mt-1">
          <span className="text-violet-400 font-semibold">Front-End</span> /{" "}
          <span className="text-cyan-400 font-semibold">Back-End</span>{" "}
          Developer
        </p>
        <p className="text-[9px] uppercase tracking-widest text-zinc-500 mt-0.5">
          Bangladesh
        </p>

        <div className="mt-10 text-[12px] uppercase tracking-widest flex flex-col gap-5 font-heading">
          <Link
            href={sideRoutes[0].path}
            className={cn(
              "w-fit mx-auto group relative py-1 px-2 transition-colors duration-300",
              activeSection === "home"
                ? "text-white font-semibold"
                : "text-zinc-300 hover:text-white",
            )}
          >
            <span className="relative z-10">{sideRoutes[0].name}</span>
            <div
              className={cn(
                "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-fuchsia-500 transition-all duration-300",
                activeSection === "home" ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </Link>
          {sideRoutes[0].children.map((nav) => (
            <Link
              href={`/#${nav.name}`}
              key={nav.name}
              className={cn(
                "w-fit mx-auto group relative py-1 px-2 transition-colors duration-300",
                activeSection === nav.name
                  ? "text-white font-semibold"
                  : "text-zinc-300 hover:text-white",
              )}
            >
              <span className="relative z-10">{nav.name}</span>
              <div
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-fuchsia-500 transition-all duration-300",
                  activeSection === nav.name
                    ? "w-full"
                    : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-800/80 text-center pt-5 pb-6 bg-zinc-950/40">
        <span className="text-[10px] text-zinc-500 tracking-wider font-mono">
          &copy; {new Date().getFullYear()} All rights reserved
        </span>
        <nav className="text-zinc-400 flex justify-center gap-4 mt-3">
          <a
            href="https://github.com/subrotomojumder"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center text-lg hover:text-white hover:scale-110 transition-all duration-300 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 shadow-sm hover:shadow-[0_0_10px_rgba(139,92,246,0.15)]"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/janardhan-majumder/"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center text-lg hover:text-violet-400 hover:scale-110 transition-all duration-300 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 shadow-sm hover:shadow-[0_0_10px_rgba(139,92,246,0.15)]"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://codeforces.com/profile/janardhan03"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center text-[11px] font-bold font-mono hover:text-red-400 hover:scale-110 transition-all duration-300 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 shadow-sm hover:shadow-[0_0_10px_rgba(239,68,68,0.15)]"
          >
            CF
          </a>
          <a
            href="https://www.instagram.com/subroto.mojumder.14/"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 flex items-center justify-center text-lg hover:text-pink-400 hover:scale-110 transition-all duration-300 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 shadow-sm hover:shadow-[0_0_10px_rgba(236,72,153,0.15)]"
          >
            <FaInstagram />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SidebarContent;
