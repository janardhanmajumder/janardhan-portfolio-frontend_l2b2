import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full relative">
      <Sidebar />
      <div className="max-w-[calc(100%)] md:max-w-[calc(100%-256px)] lg:max-w-[calc(100%-288px)] flex-1">
        {children}
        <Footer />
      </div>
    </div>
  );
};
export default CommonLayout;
