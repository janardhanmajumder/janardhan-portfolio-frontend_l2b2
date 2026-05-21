import { TBlog } from "@/types/blog.type";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllBlogs = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/blogs`, {
    next: { revalidate: 30 },
  });
  const { data: blogs } = await res.json();
  return (
    <div
      id="blog"
      className="min-h-screen flex flex-col justify-center pt-14 lg:pt-10 px-4 pb-32 md:px-16 space-y-16 relative"
    >
      <div className="space-y-3">
        <p className="text-xs text-slate-400 font-mono">READ</p>
        <h5
          className="text-lg md:text-xl font-medium font-serif text-slate-600"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-center"
        >
          RECENT BLOG
        </h5>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-24 ">
        {blogs?.map((blog: TBlog, index: number) => (
          <Link href={`blogs/${blog._id}`} key={blog._id}>
            <div
              data-aos="fade-right"
              data-aos-delay={`${index.toString().slice(-1)}00`}
              className="group space-y-5 border border-white hover:border-blue-500 transition-all px-2 pt-2 pb-4"
            >
              {blog.images && (
                <div className="w-full overflow-hidden">
                  <Image
                    src={blog.images[0]}
                    alt="Image"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full group-hover:scale-110 duration-300"
                  />
                </div>
              )}
              <p className="text-[11px] tracking-widest text-slate-400">
                {new Date(blog.createdAt).toDateString()} | {blog.subTitle} |{" "}
                <MessageSquare size={12} className="inline" /> 4
              </p>
              <h1 className="text-lg uppercase line-clamp-2 h-14">
                {blog.title}
              </h1>
              <p className="text-sm text-slate-600 leading-6 line-clamp-6 text-justify">
                {blog.des}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
