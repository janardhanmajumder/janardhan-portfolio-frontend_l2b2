import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { Button } from "../ui/button";
import AIStatCard from "../ui/AIStatCard";

const About = () => {
  const topStatus: Array<{ content: number; suffix: string; status: string; color: "violet" | "cyan" | "fuchsia" }> = [
    { content: 50, suffix: "+", status: "Projects Completed", color: "violet" },
    { content: 3,  suffix: " yrs+", status: "Experience",         color: "cyan" },
    { content: 25, suffix: "+", status: "Technologies",           color: "fuchsia" },
  ];

  return (
    <div
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 lg:py-32 space-y-16 px-6 md:px-16 bg-[#030303] relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-950/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-950/10 rounded-full blur-[100px] -z-10" />

      {/* Heading */}
      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">
          ABOUT ME
        </p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          WHO AM I?
        </h5>
      </div>

      {/* Terminal-style bio */}
      <div
        className="ai-shimmer-border rounded-2xl bg-zinc-950/80 backdrop-blur-md overflow-hidden"
        data-aos="fade-up"
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/60">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[11px] font-mono text-zinc-500 tracking-widest">
            janardhan@portfolio ~ about.md
          </span>
        </div>
        {/* Terminal body */}
        <div className="px-6 py-6 space-y-4 font-mono text-sm leading-relaxed">
          <p className="text-zinc-400">
            <span className="text-violet-400">$</span>{" "}
            <span className="text-cyan-400">whoami</span>
          </p>
          <p className="text-zinc-300 pl-4">
            <strong className="text-white">Janardhan Majumder</strong> — a dedicated Web Developer
            focused on crafting dynamic, user-centric digital experiences. Three years of building
            responsive, visually stunning websites aligned with client objectives.
          </p>
          <p className="text-zinc-400 mt-2">
            <span className="text-violet-400">$</span>{" "}
            <span className="text-cyan-400">cat stack.txt</span>
          </p>
          <p className="text-zinc-300 pl-4">
            Frontend:{" "}
            <span className="text-violet-400">Next.js · React.js · Tailwind CSS</span>
            <br />
            Backend:{" "}
            <span className="text-cyan-400">NestJS · Express.js · PostgreSQL · MongoDB</span>
            <br />
            DevOps:{" "}
            <span className="text-fuchsia-400">Docker · AWS · GitHub Actions · Linux</span>
          </p>
          <p className="text-zinc-400 mt-2">
            <span className="text-violet-400">$</span>{" "}
            <span className="text-cyan-400">echo $GOAL</span>
          </p>
          <p className="text-zinc-300 pl-4">
            Build intuitive, high-performance web applications that drive user engagement and
            business success.{" "}
            <span className="text-violet-400 animate-pulse">▋</span>
          </p>
        </div>
      </div>

      {/* Animated stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topStatus.map((status, index) => (
          <AIStatCard key={index} {...status} index={index} />
        ))}
      </div>

      {/* CTA card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 p-8 md:p-12 text-center text-white border border-zinc-800/60 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/5 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-cyan-600/5 rounded-full blur-[80px] -z-10" />

        <h3 className="text-center text-xl md:text-3xl font-bold font-heading leading-snug mb-8 tracking-tight">
          Excited to share that{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500">
            50+ projects
          </span>{" "}
          have been done successfully!
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
            variant="outline"
            size="lg"
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
