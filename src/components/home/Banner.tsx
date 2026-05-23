"use client";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import SquareLoading from "../ui/SquareLoading";
import developerAnimation from "@/assets/lottie/developer1.json";
import helloAnimation from "@/assets/lottie/hello1.json";
import frontendAnimation from "@/assets/lottie/frontend.json";
import { cn } from "@/lib/utils";
import { Wave1 } from "../ui/TextWaveAni";
import { IoDownloadOutline, IoMailOutline } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const bannerData = [
  {
    heading1: "Hi!",
    heading2: "I'm Janardhan",
    des: "Passionate web developer skilled in creating dynamic, user-friendly websites with innovative design and seamless functionality. Web Developer.",
    bg: "https://i.ibb.co/WndYYCR/address.jpg",
    smBg: "https://i.ibb.co/3CF7wxP/woman1.jpg",
    animation: {
      loop: true,
      autoplay: true,
      animationData: helloAnimation,
    },
  },
  {
    heading1: "Hi! I'm a",
    heading2: "Web Developer",
    des: "Proficient MERN stack developer specializing in building robust web applications with MongoDB, Express.js, React, and Node.js technologies.",
    bg: "https://i.ibb.co.com/nM7fSsXT/Gemini-Generated-Image-1jkepg1jkepg1jke.png",
    smBg: "https://i.ibb.co/3CF7wxP/woman1.jpg",
    animation: {
      loop: true,
      autoplay: true,
      animationData: developerAnimation,
    },
  },
  {
    heading1: "Hi! I am a",
    heading2: "Frontend Developer",
    des: "Experienced Next.js developer adept at building fast, scalable web applications with cutting-edge features and optimal performance enhancements.",
    bg: "https://i.ibb.co/WPhvx63/frontend1.jpg",
    smBg: "https://i.ibb.co/3CF7wxP/woman1.jpg",
    animation: {
      loop: true,
      autoplay: true,
      animationData: frontendAnimation,
    },
  },
];

const Banner = () => {
  const [width, setWidth] = useState(0);
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);
    const timer = setTimeout(() => {
      setShowLottie(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (width === 0) {
    return (
      <div className="h-screen max-h-[600px] flex justify-center items-center bg-[#09090b]">
        <SquareLoading />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#09090b]">
      {/* Background spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] -z-10" />

      <Carousel
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        opts={{
          loop: true,
          duration: 40,
        }}
        className="relative"
      >
        <CarouselContent>
          {bannerData.map((item, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  background:
                    width === 0
                      ? ""
                      : width > 768
                      ? `linear-gradient(90deg, rgba(9, 9, 11, 0.98) 10%, rgba(9, 9, 11, 0.9) 30%, rgba(9, 9, 11, 0.75) 50%, rgba(9, 9, 11, 0.3) 80%, rgba(9, 9, 11, 0.1)), url(${item.bg})`
                      : `linear-gradient(to bottom, rgba(9, 9, 11, 0.95), rgba(9, 9, 11, 0.8) 40%, rgba(9, 9, 11, 0.9) 70%, rgba(9, 9, 11, 0.98)), url(${item.smBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="md:h-screen md:max-h-[600px] xl:max-h-[700px] flex flex-col md:justify-center bg-no-repeat bg-cover relative min-h-[550px]"
              >
                <div className="px-6 md:px-16 pt-28 md:pt-0 pb-10 space-y-5 text-center md:text-left max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* AI typing badge */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading text-white ai-glow-text ai-flicker">
                      {item.heading1}
                      <br />
                      <div className="text-white mt-2 h-[45px] md:h-[70px]">
                        <Wave1 text={`${item.heading2}!`} />
                      </div>
                    </h1>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-[40ch] md:max-w-[50ch] mx-auto md:mx-0 text-zinc-300 text-sm lg:text-base leading-relaxed"
                  >
                    {item.des}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className={cn("pt-4 flex flex-wrap gap-4 justify-center md:justify-start items-center", {
                      "pt-2": index === 2,
                    })}
                  >
                    <a
                      href="https://docs.google.com/document/d/1GVFQmxkYdflpjjkOeXIXWI7bDEtrwVyn/edit?usp=sharing&ouid=110884669252090278616&rtpof=true&sd=true"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block"
                    >
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        className="relative overflow-hidden group shadow-lg rounded-full border-zinc-700 bg-zinc-950/80 text-zinc-200 hover:text-white transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center gap-2 px-6 py-6"
                      >
                        Download CV
                        <IoDownloadOutline className="text-lg group-hover:translate-y-0.5 transition-transform duration-300 text-violet-400 group-hover:text-violet-300" />
                      </Button>
                    </a>
                    <a href="#contact" className="inline-block">
                      <Button
                        variant={"outline"}
                        size={"lg"}
                        className="relative overflow-hidden group shadow-lg rounded-full border-zinc-700 bg-zinc-950/80 text-zinc-200 hover:text-white transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center gap-2 px-6 py-6"
                      >
                        Contact Me
                        <IoMailOutline className="text-lg group-hover:translate-y-0.5 transition-transform duration-300 text-violet-400 group-hover:text-violet-300" />
                      </Button>
                    </a>
                    <div className="flex gap-4 items-center">
                      <a
                        href="https://github.com/janardhanmajumder"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-full border border-zinc-700 bg-zinc-950/80 text-zinc-400 hover:text-white hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                      >
                        <FaGithub className="text-xl" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/janardhan-majumder/"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-full border border-zinc-700 bg-zinc-950/80 text-zinc-400 hover:text-white hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                      >
                        <FaLinkedin className="text-xl" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Lottie for mobile view */}
                  {showLottie && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className={cn("pt-4 md:hidden max-w-[200px] mx-auto", {
                        "pt-0": index === 2,
                      })}
                    >
                      <div className={cn("pointer-events-none", { "-my-6": index === 2 })}>
                        <Lottie animationData={item.animation.animationData} loop={item.animation.loop} />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
