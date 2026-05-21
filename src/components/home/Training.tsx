import { SiJavascript, SiNextdotjs } from "react-icons/si";
import { TbSchool, TbCertificate } from "react-icons/tb";
import { PiGraduationCapBold } from "react-icons/pi";

const courses = [
  {
    title: "CSE Fundamentals",
    institute: "Phitron.io",
    icon: <TbSchool className="text-violet-400" />,
    badge: "CSE Core",
    badgeColor: "border-violet-500/40 text-violet-400 bg-violet-500/5",
    glow: "hover:border-violet-500/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]",
    bar: "from-violet-500 via-fuchsia-400 to-violet-500",
    desc: "Data structures, algorithms, OOP, and computer science fundamentals.",
  },
  {
    title: "Next Level Web Development",
    institute: "Programming Hero",
    icon: <SiNextdotjs className="text-cyan-400" />,
    badge: "Batch-2",
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/5",
    glow: "hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]",
    bar: "from-cyan-500 via-sky-400 to-cyan-500",
    desc: "Advanced Next.js, TypeScript, PostgreSQL, Prisma, Redis, and backend architecture.",
  },
  {
    title: "Complete Web Development",
    institute: "Programming Hero",
    icon: <SiJavascript className="text-fuchsia-400" />,
    badge: "Batch-6 · Jankar Mahbub",
    badgeColor: "border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/5",
    glow: "hover:border-fuchsia-500/50 hover:shadow-[0_0_24px_rgba(217,70,239,0.12)]",
    bar: "from-fuchsia-500 via-pink-400 to-fuchsia-500",
    desc: "Full-stack web development covering HTML, CSS, JavaScript, React, Node.js, MongoDB, and Express.",
  },
  {
    title: "Diploma in Software Application",
    institute: "Charbata Digital Post Office",
    icon: <TbCertificate className="text-yellow-400" />,
    badge: "Diploma",
    badgeColor: "border-yellow-500/40 text-yellow-400 bg-yellow-500/5",
    glow: "hover:border-yellow-500/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.12)]",
    bar: "from-yellow-500 via-amber-400 to-yellow-500",
    desc: "Software application development, office tools, and digital literacy fundamentals.",
  },
];

const Training = () => {
  return (
    <div
      id="training"
      className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 space-y-16 relative bg-[#09090b] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-fuchsia-600/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] -z-10" />

      {/* Heading */}
      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 ai-ring-pulse" />
          EDUCATION
        </p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          PROFESSIONAL TRAINING
        </h5>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={`${i * 100}`}
            className={`group relative bg-zinc-900/30 border border-zinc-800/60 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ${course.glow} hover:-translate-y-1`}
          >
            {/* Top accent bar */}
            <div className={`h-[3px] w-full bg-gradient-to-r ${course.bar} bg-[length:200%_100%] animate-[shimmerBar_2.5s_linear_infinite]`} />

            <div className="p-6 space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Icon box */}
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-xl shrink-0 group-hover:border-zinc-700 transition-colors">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-heading text-white leading-snug group-hover:text-violet-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-mono mt-0.5 flex items-center gap-1">
                      <PiGraduationCapBold className="text-zinc-600" />
                      {course.institute}
                    </p>
                  </div>
                </div>
                {/* Badge */}
                <span className={`shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${course.badgeColor}`}>
                  {course.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 leading-relaxed pl-[52px]">
                {course.desc}
              </p>
            </div>

            {/* Corner glow on hover */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
