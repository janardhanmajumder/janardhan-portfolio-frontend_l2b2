import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="bg-black py-16">
      <div className="mb-6 lg:flex justify-center gap-x-3">
        <div className="flex justify-center items-center">
          <PhoneCall size={18} className="text-gray-300" />
          <a href="tel:+8801631901754" target="blank">
            <Button
              variant="link"
              className="text-gray-300 text-center text-sm py-0 px-1.5"
            >
              +880 1631-901754
            </Button>
          </a>
        </div>
        <div className="flex justify-center items-center">
          <Mail size={18} className="text-gray-300" />
          <a href="mailto:janardhan.md03@gmail.com" target="blank">
            <Button
              variant="link"
              className="text-gray-300 text-center text-sm py-0 px-1.5 line-clamp-1"
            >
              janardhan.md03@gmail.com
            </Button>
          </a>
        </div>
        <div className="flex justify-center items-center">
          <MapPinned size={18} className="text-gray-300" />
          <a href="https://maps.app.goo.gl/LxRxvCxovRvPQ3sv9" target="blank">
            <Button
              variant="link"
              className="text-gray-300 text-center text-sm py-0 px-1"
            >
              Noakhali , Bangladesh
            </Button>
          </a>
        </div>
      </div>
      <div className="text-center md:mt-2">
        <nav className="text-2xl text-blue-500 flex justify-center gap-2 md:gap-5 mt-4 h-10">
          <a href="https://github.com/subrotomojumder" target="blank">
            <FaGithub className="hover:text-orange-400 hover:text-3xl mx-2 hover:mx-[5px]  hover:mt-[-3px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/janardhan-majumder/"
            target="blank"
          >
            <FaLinkedin className="hover:text-orange-400 hover:text-3xl mx-2 hover:mx-[5px] hover:mt-[-3px]" />
          </a>
          <a href="https://web.facebook.com/subroto.mojumder.14" target="blank">
            <FaFacebook className="hover:text-orange-400 hover:text-3xl mx-2 hover:mx-[5px] hover:mt-[-3px]" />
          </a>
          <a
            href="https://www.instagram.com/subroto.mojumder.14/"
            target="blank"
          >
            <FaInstagram className="hover:text-orange-400 hover:text-3xl mx-2 hover:mx-[5px] hover:mt-[-3px]" />
          </a>
        </nav>
      </div>
      <div className="bg-gray-500 w-[80%] h-[1px] mx-auto mt-10 mb-12" />
      <p className="text-gray-300 text-center text-xs lg:text-sm">
        © {new Date().getFullYear()}. Copyright reserved by Janardhan.
      </p>
    </div>
  );
};

export default Footer;
