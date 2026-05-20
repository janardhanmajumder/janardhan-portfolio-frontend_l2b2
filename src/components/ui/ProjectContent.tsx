"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProject } from "@/types/project.type";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./button";
import { Badge } from "./badge";
import { motion } from "framer-motion";

const ProjectContent = ({ projects }: { projects: TProject[] }) => {
  const [tab, setTab] = useState("all");
  // console.log({tab});
  return (
    <Tabs onValueChange={(value) => setTab(value)} defaultValue="all">
      <div className="border-b border-zinc-900 space-y-6 pb-6">
        <TabsList data-aos="fade-right" className="flex gap-2 bg-zinc-950/60 border border-zinc-800/60 p-1.5 rounded-full w-fit max-w-full">
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="fullstack">
            Fullstack
          </TabsTrigger>
          <TabsTrigger value="frontend">
            Frontend
          </TabsTrigger>
          <TabsTrigger value="backend">
            Backend
          </TabsTrigger>
        </TabsList>
        <p data-aos="fade-right" className="text-zinc-400 max-w-4xl text-sm leading-relaxed">
          As a web developer, I specialize in designing, creating, and maintaining
          high-performance websites and web applications. I ensure optimal responsiveness,
          scalability, and pristine UX by crafting efficient solutions across HTML, CSS, and modern JavaScript framework ecosystems.
        </p>
      </div>

      <TabsContent value={tab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-16 pb-10">
          {projects
            .filter((project) =>
              tab === "all" ? true : project.projectType?.toLowerCase() === tab.toLowerCase()
            )
            .map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Link href={`projects/${project._id}`}>
                  <div className="relative p-6 bg-zinc-900/30 backdrop-blur-md text-center shadow-xl transition-all duration-500 group hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      {project.images && (
                        <div
                          className="w-10/12 mx-auto -mt-14 overflow-hidden transition-transform duration-500 group-hover:scale-105"
                          style={{
                            clipPath:
                              "polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0 80%, 0 20%)",
                          }}
                        >
                          <Image
                            src={project.images[0]}
                            alt="Image"
                            width={800}
                            height={800}
                            className="object-cover w-full h-[180px]"
                          />
                        </div>
                      )}

                      <h1 className="text-xl font-bold line-clamp-1 mt-6 text-white font-heading group-hover:text-violet-400 transition-colors duration-300">
                        {project.title}
                      </h1>

                      <Badge
                        className="rounded-full bg-zinc-850 border border-zinc-700/80 text-violet-400 px-3 py-0.5 text-[10px] uppercase font-mono tracking-wider mt-4"
                        variant={"outline"}
                      >
                        {project.projectType}
                      </Badge>

                      <p className="line-clamp-4 mt-4 text-sm mb-6 text-zinc-400 leading-relaxed">
                        {project.des}
                      </p>
                    </div>
                    {/* color bar  */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/30 via-fuchsia-400/20 to-cyan-400/0",
                        {
                          "from-pink-500/40 via-fuchsia-400/40 to-violet-500/40":
                            project.projectType === "backend",
                          "from-cyan-400/40 via-violet-400/40 to-fuchsia-500/40":
                            project.projectType === "frontend",
                        }
                      )}
                    />

                    {/* Glowing hover overlay */}
                    <div className="bg-black/80 backdrop-blur-xl backdrop-brightness-50 absolute inset-0 w-full flex flex-col justify-center items-center duration-300 opacity-0 group-hover:opacity-100 gap-4 z-10">
                      {/* <span className="text-white font-bold text-xs tracking-widest font-heading uppercase">Explore Details</span> */}
                      <Button  variant="secondary" className="rounded-full border-zinc-700 hover:border-violet-500 text-slate-100 hover:text-white shadow-md p-5 flex items-center">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectContent;
