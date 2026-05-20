import { createElement } from "react";
import { TbWorldSearch } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";
import { LuPhoneCall } from "react-icons/lu";
import ContactForm from "../ui/ContactForm";

const Contact = () => {
  const info = [
    {
      icon: TbWorldSearch,
      info: "janardhan.md03@gmail.com",
      link: "mailto:janardhan.md03@gmail.com",
    },
    {
      icon: LuPhoneCall,
      info: "+880 1631-901754",
      link: "tel:+8801631901754",
    },
    {
      icon: GrMapLocation,
      info: "Noakhali-4, Bangladesh",
      link: "https://maps.app.goo.gl/LxRxvCxovRvPQ3sv9",
    },
  ];

  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 space-y-16 bg-[#09090b] relative overflow-hidden border-t border-zinc-900/60"
    >
      {/* Background neon light spotlight */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] -z-10" />

      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">GET IN TOUCH</p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          CONTACT
        </h5>
      </div>

      <div className="pt-6 pb-10 md:pb-0 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        <div className="space-y-6">
          {info.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-5 group"
              data-aos="fade-right"
            >
              <div className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-violet-400 shadow-lg group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 flex justify-center items-center">
                {createElement(item.icon, { size: "26" })}
              </div>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-zinc-200 hover:text-white font-mono text-sm md:text-base transition-colors duration-300 hover:underline tracking-wide"
              >
                {item.info}
              </a>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
