import AllBlogsContent from "@/components/home/AllBlogsContent";

const AllBlogs = () => {
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
      <AllBlogsContent />
    </div>
  );
};

export default AllBlogs;
