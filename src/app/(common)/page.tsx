import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Blogs from "@/components/home/Blogs";
import Contact from "@/components/home/Contact";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Thanks from "@/components/home/Thanks";
import WorkExperience from "@/components/home/WorkExperience";
import GSAPReveal from "@/components/ui/GSAPReveal";

const AIDivider = () => (
  <div className="relative h-px mx-6 md:mx-16 overflow-visible">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 rounded-full border border-violet-500/50 bg-zinc-950 flex items-center justify-center">
      <div className="w-1 h-1 rounded-full bg-violet-500 animate-ping" />
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Banner />

      <GSAPReveal variant="glowIn" start="top 92%">
        <About />
      </GSAPReveal>

      <AIDivider />

      <GSAPReveal variant="slideReveal" start="top 90%">
        <Skills />
      </GSAPReveal>

      <AIDivider />

      <GSAPReveal variant="fadeLeft" start="top 90%">
        <WorkExperience />
      </GSAPReveal>

      <AIDivider />

      <GSAPReveal variant="fadeUp" start="top 90%">
        <Projects />
      </GSAPReveal>

      <AIDivider />

      <GSAPReveal variant="fadeRight" start="top 90%">
        <Blogs />
      </GSAPReveal>

      <AIDivider />

      <GSAPReveal variant="glowIn" start="top 90%">
        <Contact />
      </GSAPReveal>

      <Thanks />
    </main>
  );
}
