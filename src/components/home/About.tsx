import { LocateFixed, Mail, MapPinned, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";

const About = () => {
  const topStatus = [
    {
      content: "50+",
      status: "Projects",
      aos: "zoom-in-right",
    },
    {
      content: "3 years+",
      status: "Experiences",
      aos: "zoom-in-down",
    },
    {
      content: "25+",
      status: "Technology",
      aos: "zoom-in-left",
    },
  ];
  return (
    <div
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 lg:py-32 space-y-16 px-6 md:px-16 bg-[#030303] relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-950/10 rounded-full blur-[120px] -z-10" />

      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">ABOUT US</p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          WHO AM I?
        </h5>
      </div>

      <div className="space-y-6 font-sans text-zinc-400 leading-relaxed text-sm md:text-base">
        <p data-aos="fade-right" data-aos-anchor-placement="bottom-center">
          <strong className="text-white">Hi! I&apos;m Janardhan Majumder</strong>, a dedicated Web Developer with a strong focus on crafting dynamic, user-centric digital experiences. With three years of experience, I specialize in creating responsive, visually stunning websites that align perfectly with client objectives and standard practices.
        </p>
        <p data-aos="fade-left" data-aos-anchor-placement="bottom-center">
          I bridge frontend and backend development using modern frameworks like <span className="text-violet-400 font-medium">Next.js</span>, <span className="text-violet-400 font-medium">React.js</span>, and <span className="text-cyan-400 font-medium">Express.js</span> to deliver efficient, scalable solutions. My goal is to build intuitive, high-performance web applications that drive user engagement and business success.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-0"
      >
        {topStatus.map((status, index) => (
          <div
            key={index}
            data-aos={status.aos}
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
            data-aos-mirror="true"
            className="w-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/80 shadow-xl rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 group"
          >
            <div className="space-y-3 px-8 pt-8 pb-7 bg-zinc-950/20 h-36">
              <h1 className="text-3xl font-bold font-heading text-white group-hover:text-violet-400 transition-colors">{status.content}</h1>
              <h4 className="text-sm tracking-wider uppercase text-zinc-400">{status.status}</h4>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"></div>
          </div>
        ))}
      </div>

      {/* Replaced Jarring Yellow Panel with a beautiful, glowing Glassmorphic Mesh card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 p-8 md:p-12 text-center text-white border border-zinc-800/60 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-600/5 rounded-full blur-[80px] -z-10" />

        <h3 className="text-center text-xl md:text-3xl font-bold font-heading leading-snug mb-8 tracking-tight">
          Excited to share that <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500 text-shadow-md">50+ projects</span> have been done successfully!
        </h3>

        <div className="mb-10 flex flex-col md:flex-row justify-center items-center gap-6 text-zinc-400 text-sm md:text-base">
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <PhoneCall size={18} className="text-violet-400" />
            <a href="tel:+8801631901754" target="_blank" rel="noreferrer" className="hover:underline">
              +880 1631-901754
            </a>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={18} className="text-violet-400" />
            <a href="mailto:janardhan.md03@gmail.com" target="_blank" rel="noreferrer" className="hover:underline">
              janardhan.md03@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <MapPinned size={18} className="text-violet-400" />
            <a href="https://maps.app.goo.gl/LxRxvCxovRvPQ3sv9" target="_blank" rel="noreferrer" className="hover:underline">
              Noakhali, Bangladesh
            </a>
          </div>
        </div>

        <a href="mailto:janardhan.md03@gmail.com" target="_blank" rel="noreferrer">
          <Button
            variant={"outline"}
            size={"lg"}
            className="rounded-full border-zinc-700 bg-zinc-950/80 text-zinc-200 hover:text-white hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 px-8 py-5"
          >
            HIRE ME
          </Button>
        </a>
      </div>
    </div>
  );
};

export default About;
