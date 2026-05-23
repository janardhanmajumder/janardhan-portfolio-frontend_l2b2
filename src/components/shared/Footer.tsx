import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    href: "https://github.com/janardhanmajumder",
    label: "GitHub",
    icon: <FaGithub />,
    hover: "hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]",
  },
  {
    href: "https://www.linkedin.com/in/janardhan-majumder/",
    label: "LinkedIn",
    icon: <FaLinkedin />,
    hover: "hover:text-violet-400 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]",
  },
  {
    href: "https://codeforces.com/profile/janardhan03",
    label: "Codeforces",
    icon: <span className="text-[11px] font-bold font-mono leading-none">CF</span>,
    hover: "hover:text-red-400 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]",
  },
  {
    href: "https://www.instagram.com/subroto.mojumder.14/",
    label: "Instagram",
    icon: <FaInstagram />,
    hover: "hover:text-pink-400 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]",
  },
];

const contacts = [
  {
    icon: <PhoneCall size={15} />,
    text: "+880 1631-901754",
    href: "tel:+8801631901754",
  },
  {
    icon: <Mail size={15} />,
    text: "janardhan.md03@gmail.com",
    href: "mailto:janardhan.md03@gmail.com",
  },
  {
    icon: <MapPinned size={15} />,
    text: "Noakhali, Bangladesh",
    href: "https://maps.app.goo.gl/LxRxvCxovRvPQ3sv9",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/60 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[200px] h-[150px] bg-cyan-600/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 space-y-10">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Contact info */}
        <div className="flex flex-wrap justify-center gap-6">
          {contacts.map(({ icon, text, href }) => (
            <a
              key={text}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-mono tracking-wide transition-colors duration-300 group"
            >
              <span className="text-violet-400 group-hover:text-violet-300 transition-colors">
                {icon}
              </span>
              {text}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3">
          {socials.map(({ href, label, icon, hover }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`w-9 h-9 flex items-center justify-center text-lg text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:scale-110 transition-all duration-300 ${hover}`}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Copyright */}
        <p className="text-center text-[11px] text-zinc-600 font-mono tracking-wider">
          &copy; {new Date().getFullYear()} Janardhan Majumder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
