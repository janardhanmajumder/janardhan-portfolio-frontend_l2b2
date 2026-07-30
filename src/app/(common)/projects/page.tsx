import AllProjectsContent from "@/components/home/AllProjectsContent";
import React from "react";

const AllProjects = () => {
  return (
    <div
      id="project"
      className="min-h-screen flex flex-col justify-center pt-14 lg:pt-10 px-4 pb-32 md:px-16 space-y-16 relative"
    >
      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">
          Projects
        </p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          RECENT WORK
        </h5>
      </div>
      <AllProjectsContent />
    </div>
  );
};

export default AllProjects;
