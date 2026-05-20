import Rating from "@/components/ui/Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectDetailsImage from "@/components/ui/projectDetails/projectDetailsImage";
import { Droplets, TimerReset } from "lucide-react";
import { Metadata } from "next";

type TProjectDetailsProps = {
  params: {
    [index: string]: unknown;
  };
};
export const metadata: Metadata = {
  title: "JANARDHAN | PROJECT",
  description:
    "Passionate web developer skilled in creating dynamic, user-friendly websites with innovative design and seamless functionality. Web Developer.",
};

const ProductDetails = async ({ params }: TProjectDetailsProps) => {
  const { projectId } = params;
  const res = await fetch(`${process.env.SERVER_URL}/projects/${projectId}`);
  const { data: project } = await res.json();
  return (
    <div
      className="min-h-screen flex flex-col justify-center pt-16 md:pt-12 pb-32 space-y-6 md:space-y-16 relative"
      //  style={{
      //   background: `linear-gradient(90deg, rgba(255, 99, 71, 0.1), rgba(0, 0, 0, 0)), url(https://i.ibb.co/NsvqYx8/category-BG.jpg)`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {project?.images?.length && (
        <ProjectDetailsImage
          images={project.images}
          className="px-5 md:px-10"
        />
      )}
      <div className="py-6 px-4 md:px-20 space-y-7">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">{project.title}</h3>
          <div className="flex flex-wrap justify-start items-center gap-5">
            <h5 className="text-xl font-bold capitalize text-slate-600">
              {project.projectType}
            </h5>
            <div className="h-3.5 w-0.5 bg-gray-400" />
            <Rating rate={4} size={24} />
          </div>
        </div>
        <div className="h-[1.5px] bg-gray-200" />
        <div className="flex flex-wrap gap-4 items-center ">
          {/* <span className="font-medium text-slate-600">Project Link :</span> */}
          {Object.entries(project.links).map(
            ([name, link], inx) =>
              name !== "_id" && (
                <a href={link as string} target="_blank" key={inx}>
                  <Button
                    variant="link"
                    className="border capitalize hover:text-purple-600"
                  >
                    {name}
                  </Button>
                </a>
              )
          )}
        </div>
        <p className="text-sm font-medium text-slate-600">{project.des}</p>
        <ul className="space-y-1 list-disc text-sm font-medium text-gray-700 pl-8">
          {project.desBullet?.map((bullet: string, inx: number) => (
            <li key={inx}>{bullet}</li>
          ))}
        </ul>
        <div className="space-y-4">
          <h5 className="text-xl font-semibold text-slate-600">Technologies:</h5>
          <div className="flex flex-wrap gap-3">
            {project.technologies?.map((item: string, inx: number) => (
              <Badge variant="outline" key={inx}>
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm font-medium text-gray-700 pt-4">
          <div className="flex justify-start gap-3">
            <Droplets />
            <span>
              Posted date at: {new Date(project.createdAt).toDateString()}
            </span>
          </div>
          <div className="flex justify-start gap-3">
            <TimerReset />
            <span>
              Updated date at: {new Date(project.updatedAt ?? project.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="pt-12" />
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const res = await fetch(`${process.env.SERVER_URL}/projects`);
  const { data } = await res.json();
  return data.map((project: any) => ({
    projectId: project._id,
  }));
}

export default ProductDetails;
