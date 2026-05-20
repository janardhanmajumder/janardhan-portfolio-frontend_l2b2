import { TExperience } from "@/types/experience.type";
import React from "react";
import { PiPenThin } from "react-icons/pi";
import { cn } from "@/lib/utils";

const WorkExperience = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/experiences`, {
    next: { revalidate: 30 },
  });
  const { data } = await res.json();

  // Deduplicate experiences by ID or company name to resolve duplicate rendering bug
  const uniqueData = Array.from(
    new Map(data.map((item: TExperience) => [item._id || `${item.companyName}-${item.designation}`, item])).values()
  ) as TExperience[];

  return (
    <div
      id="experience"
      className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 space-y-16 relative bg-[#030303] overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] -z-10" />

      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">EXPERIENCE</p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          WORK EXPERIENCE
        </h5>
      </div>

      <div className="relative">
        {/* Glow timeline path */}
        <div
          className="absolute top-3 left-4.5 lg:left-5.5 -z-10 bg-gradient-to-b from-violet-500 via-fuchsia-400 to-cyan-400 h-full w-0.5 opacity-60"
          data-aos="fade-down"
        />
        <div
          className="absolute left-[13px] lg:left-[17px] -bottom-9 lg:-bottom-10 -z-10 rounded-full border-2 border-cyan-400 w-3 h-3 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          data-aos="fade-right"
        />

        <div className="space-y-10">
          {uniqueData.map((experience: TExperience, index: number) => (
            <div key={index} className="flex group">
              <div
                data-aos="fade-right"
                className={cn(
                  "h-fit bg-zinc-950 rounded-full border-2 border-violet-500 text-violet-400 p-2 mt-2.5 md:mt-1 shadow-[0_0_15px_rgba(139,92,246,0.3)] z-10 transition-all duration-300 hover:scale-115",
                  {
                    "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]": index % 2 === 0,
                  }
                )}
              >
                <PiPenThin className="size-5 lg:size-6" />
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="200"
                className="bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md flex-1 pt-4 pb-6 px-6 md:px-8 relative ml-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-violet-500/40 text-zinc-300 space-y-4"
              >
                {/* Sleek rotated square pointer */}
                <div
                  className="h-4.5 w-4.5 bg-zinc-900 border-l border-b border-zinc-800/80 absolute -left-2.5 top-5 rotate-45"
                />

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 border-b border-zinc-800/60 pb-3">
                  <div>
                    <h6 className="font-bold text-white tracking-wide text-base font-heading group-hover:text-violet-400 transition-colors">
                      {experience.companyName}
                    </h6>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {experience.location}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] md:text-xs text-zinc-400 bg-zinc-950/80 border border-zinc-800/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    {new Date(experience.dateOfEntry).toDateString().slice(4) +
                      " - " +
                      (experience.dateOfDeparture
                        ? new Date(experience.dateOfDeparture).toDateString().slice(4)
                        : "Present")}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg lg:text-xl font-bold font-heading text-white">
                    {experience.designation}
                  </h4>
                </div>

                {experience.des && (
                  <p className="text-sm text-zinc-400 leading-relaxed">{experience.des}</p>
                )}

                <div className="text-sm text-zinc-400 space-y-2">
                  <h2 className="font-semibold text-white text-xs uppercase tracking-widest text-violet-400 font-heading">
                    Responsibilities :
                  </h2>
                  {experience.desBullet && (
                    <ul className="list-disc ml-5 space-y-1.5 text-zinc-400 text-sm">
                      {experience.desBullet.map(
                        (bullet: string, cinx: number) => (
                          <li key={cinx} className="marker:text-violet-400 pl-1">{bullet}</li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
