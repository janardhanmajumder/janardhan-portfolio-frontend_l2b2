import Image from "next/image";
import SkillContent from "../ui/SkillContent";
import {
  SiVscodium,
  SiFigma,
  SiPostman,
  SiMongodb,
  SiGithub,
  SiAmazon,
  SiVercel,
  SiGit,
  SiLinux,
  SiOpenai,
  SiAnthropic,
  SiDocker,
  SiRedis,
  SiPostgresql,
  SiPrisma,
  SiNestjs,
  SiGithubactions,
  SiGrafana,
} from "react-icons/si";
import { VscTerminal } from "react-icons/vsc";
import { TbApi, TbShieldLock, TbChartBar, TbCloudComputing, TbDatabaseCog, TbRobot } from "react-icons/tb";
import { MdOutlineSchedule, MdOutlineSpeed } from "react-icons/md";
import { LuWorkflow } from "react-icons/lu";

// ─── Roadmap data ────────────────────────────────────────────────────────────
const roadmap = [
  {
    phase: "Phase 1",
    label: "Strong Core",
    color: "violet",
    items: [
      { icon: <SiNestjs className="text-red-400" />, name: "NestJS" },
      { icon: <SiPostgresql className="text-sky-400" />, name: "PostgreSQL" },
      { icon: <SiPrisma className="text-teal-400" />, name: "Prisma ORM" },
      { icon: <SiRedis className="text-red-500" />, name: "Redis" },
      { icon: <SiDocker className="text-blue-400" />, name: "Docker" },
      { icon: <SiLinux className="text-yellow-300" />, name: "Linux" },
    ],
  },
  {
    phase: "Phase 2",
    label: "Production Backend",
    color: "fuchsia",
    items: [
      { icon: <TbShieldLock className="text-green-400" />, name: "Auth System" },
      { icon: <TbChartBar className="text-orange-400" />, name: "Logging" },
      { icon: <MdOutlineSpeed className="text-cyan-400" />, name: "Rate Limiting" },
      { icon: <MdOutlineSchedule className="text-yellow-400" />, name: "BullMQ" },
      { icon: <MdOutlineSchedule className="text-violet-400" />, name: "Cron Jobs" },
    ],
  },
  {
    phase: "Phase 3",
    label: "Advanced",
    color: "cyan",
    items: [
      { icon: <LuWorkflow className="text-blue-400" />, name: "System Design" },
      { icon: <TbCloudComputing className="text-sky-400" />, name: "Scaling" },
      { icon: <SiGithubactions className="text-zinc-300" />, name: "CI/CD" },
      { icon: <SiAmazon className="text-yellow-400" />, name: "AWS" },
      { icon: <SiGrafana className="text-orange-400" />, name: "Monitoring" },
    ],
  },
];

const phaseAccent: Record<string, string> = {
  violet: "border-violet-500/40 shadow-violet-500/10 | text-violet-400 bg-violet-500/5 border-violet-500/30",
  fuchsia: "border-fuchsia-500/40 shadow-fuchsia-500/10 | text-fuchsia-400 bg-fuchsia-500/5 border-fuchsia-500/30",
  cyan: "border-cyan-500/40 shadow-cyan-500/10 | text-cyan-400 bg-cyan-500/5 border-cyan-500/30",
};

// ─── Tools & Tech (no duplicates with roadmap) ───────────────────────────────
// Removed: PostgreSQL, Prisma, Redis, Docker, Linux, AWS, GitHub Actions, Grafana
// (all appear in the roadmap cards)
const tools = [
  { icon: <SiVscodium className="text-blue-400" />,    label: "VS Code",          category: "Editor" },
  { icon: <SiFigma className="text-pink-400" />,       label: "Figma",            category: "Design" },
  { icon: <SiPostman className="text-orange-400" />,   label: "Postman",          category: "API Testing" },
  { icon: <SiMongodb className="text-green-400" />,    label: "MongoDB Compass",  category: "Database" },
  { icon: <SiGithub className="text-zinc-300" />,      label: "GitHub",           category: "Version Control" },
  { icon: <SiVercel className="text-white" />,         label: "Vercel",           category: "Deployment" },
  { icon: <SiGit className="text-orange-500" />,       label: "Git CLI",          category: "Version Control" },
  { icon: <VscTerminal className="text-cyan-400" />,   label: "SSH",              category: "DevOps" },
  { icon: <TbApi className="text-emerald-400" />,      label: "REST / GraphQL",   category: "API" },
  { icon: <TbDatabaseCog className="text-blue-300" />, label: "pgAdmin",          category: "Database GUI" },
  { icon: <TbRobot className="text-fuchsia-400" />,    label: "AI Agent",         category: "AI" },
  { icon: <SiAnthropic className="text-violet-400" />, label: "Claude AI",        category: "AI" },
  { icon: <SiOpenai className="text-emerald-400" />,   label: "ChatGPT",          category: "AI" },
];

const Skills = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/skills?sort=createdAt`, {
    next: { revalidate: 30 },
  });
  const { data } = await res.json();

  const logos = [
    { image: require("@/assets/skills/nextjs.png") },
    { image: require("@/assets/skills/react.jpg") },
    { image: require("@/assets/skills/nodejs.png") },
  ];

  return (
    <div
      id="skills"
      className="min-h-screen flex flex-col justify-center py-20 lg:py-24 space-y-12 relative bg-[#09090b] overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[250px] h-[250px] bg-violet-600/5 rounded-full blur-[100px] -z-10" />

      {/* Heading */}
      <div className="space-y-3 px-6 md:px-16">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">
          MY SPECIALTY
        </p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          MY SKILLS
        </h5>
      </div>

      <div className="space-y-10 px-6 md:px-16">
        <p
          className="text-zinc-400 max-w-4xl text-sm md:text-base leading-relaxed"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          With a keen eye for detail and a passion for clean, efficient code, I
          specialize in building exceptional web experiences that captivate
          users. I have experience working with{" "}
          <strong className="text-white">more than 25 technology</strong>{" "}
          packages and libraries.
        </p>

        {/* Skill bars */}
        <div className="border-t border-zinc-900 pt-8">
          <SkillContent skills={data} />
        </div>

        {/* Tools & Tech */}
        <div data-aos="fade-up" className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 font-mono border border-violet-500/30 px-3 py-1 rounded-full bg-violet-500/5">
              Tools & Tech
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map(({ icon, label, category }) => (
              <div
                key={label}
                className="group flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/60 rounded-xl px-4 py-3 hover:border-violet-500/40 hover:bg-zinc-900/70 hover:shadow-[0_0_16px_rgba(139,92,246,0.1)] transition-all duration-300"
              >
                <span className="text-xl shrink-0">{icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white font-heading truncate group-hover:text-violet-300 transition-colors">
                    {label}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
                    {category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div data-aos="fade-up" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 font-mono border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/5">
              Learning Roadmap
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {roadmap.map(({ phase, label, color, items }) => {
              const [cardAccent, badgeAccent] = phaseAccent[color].split(" | ");
              return (
                <div
                  key={phase}
                  data-aos="fade-up"
                  className={`rounded-2xl border bg-zinc-900/30 backdrop-blur-md p-5 space-y-4 hover:shadow-lg transition-all duration-300 ${cardAccent}`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${badgeAccent}`}>
                      {phase}
                    </span>
                    <h4 className="text-base font-bold font-heading text-white mt-2">
                      {label}
                    </h4>
                  </div>

                  <ul className="space-y-2.5">
                    {items.map(({ icon, name }) => (
                      <li key={name} className="flex items-center gap-2.5 text-sm text-zinc-300 group">
                        <span className="text-base shrink-0">{icon}</span>
                        <span className="group-hover:text-white transition-colors font-medium">
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div className="w-full flex justify-evenly gap-6 py-8 mt-10 px-4 md:px-16 border-y border-zinc-900 bg-zinc-950/60 backdrop-blur-md">
        {logos.map((logo: { image: string }, i) => (
          <div
            key={i}
            className="w-16 md:w-20 h-16 md:h-20 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/80 p-2.5 hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 flex justify-center items-center"
            data-aos="zoom-in"
          >
            <Image
              src={logo.image}
              width={200}
              height={200}
              className="w-full h-full object-contain rounded-lg"
              alt="logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
