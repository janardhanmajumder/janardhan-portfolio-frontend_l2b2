import Link from "next/link";
import ProjectContent from "../ui/ProjectContent";
import { Button } from "../ui/button";

const Projects = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/projects?limit=6`, {
    next: { revalidate: 30 },
  });
  const { data } = await res.json();
  return (
    <div
      id="project"
      className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 space-y-16 relative bg-[#09090b] overflow-hidden border-t border-zinc-900/60"
    >
      {/* Dynamic glow spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[100px] -z-10" />

      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">Projects</p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          RECENT WORK
        </h5>
      </div>

      <ProjectContent projects={data} />

      <div className="text-center pt-6">
        <Link href={`projects`}>
          <Button 
            variant="outline"
            className="rounded-full border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white px-8 py-5 border hover:border-zinc-700 transition-all duration-300"
          >
            See All Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
