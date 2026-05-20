import { TBlog } from "@/types/blog.type";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Blogs = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/blogs?limit=6`, {
    next: { revalidate: 30 },
  });
  const { data: blogs } = await res.json();
  return (
    <div
      id="blog"
      className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-16 space-y-16 bg-[#030303] relative overflow-hidden"
    >
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] -z-10" />

      <div className="space-y-3">
        <p className="text-[11px] text-violet-400 font-mono tracking-widest uppercase">READ</p>
        <h5
          className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-tight"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          RECENT BLOGS
        </h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {blogs.map((blog: TBlog, index: number) => (
          <Link href={`blogs/${blog._id}`} key={blog._id}>
            <div
              data-aos="fade-right"
              data-aos-delay={`${index.toString().slice(-1)}00`}
              className="group space-y-4 bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md px-3 pt-3 pb-5 rounded-2xl shadow-xl hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                {blog.images && (
                  <div className="w-full h-[200px] overflow-hidden rounded-xl bg-zinc-950">
                    <Image
                      src={blog.images[0]}
                      alt="Image"
                      width={800}
                      height={800}
                      className="object-cover w-full h-full group-hover:scale-110 duration-500"
                    />
                  </div>
                )}
                
                <p className="text-[10px] font-mono tracking-wider text-zinc-500 mt-4 flex items-center gap-2">
                  <span>{new Date(blog.createdAt).toDateString().slice(4)}</span>
                  <span>•</span>
                  <span>{blog.subTitle}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={10} className="inline text-violet-400" /> 4
                  </span>
                </p>

                <h1 className="text-lg font-bold font-heading text-white leading-snug mt-2 line-clamp-2 h-14 group-hover:text-violet-400 transition-colors duration-300">
                  {blog.title}
                </h1>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-4 text-justify mt-2">
                  {blog.des}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center pt-6">
        <Link href={`blogs`}>
          <Button 
            variant="outline"
            className="rounded-full border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white px-8 py-5 border hover:border-zinc-700 transition-all duration-300"
          >
            See All Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
