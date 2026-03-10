"use client";

import { TextLoop } from "@/components/motion-primitives/text-loop";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const image = [
  "/images/WhatsApp Image 2026-02-26 at 04.49.25.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.26 (1).jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.26.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.28 (1).jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.28 (2).jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.28.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.33 (1).jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.33.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.34.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.36.jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.37 (1).jpeg",
  "/images/WhatsApp Image 2026-02-26 at 04.49.37.jpeg",
];

const Skiper30 = ({img=image}:{img?:string[]}) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main
    id="gallery"
    style={{
            background: "#030203",
          }}

    className="w-full text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;600&display=swap');
      `}</style>
      <div className="flex h-[40vh] md:h-[40vh] items-center justify-center gap-2 px-4">

          {/* <span className="relative text-yellow-300 max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span> */}
          <div className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl gap-2 sm:gap-3 md:gap-5 grid grid-cols-2 w-full" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <div className="flex justify-end">
              <p>THE</p>
            </div>            <TextLoop
        className='overflow-y-clip'
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 50,
          mass: 15,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(4px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(4px)',
          },
        }}
      >
        <span style={{
          background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>MAN</span>
        <span style={{
          background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>MYTH</span>
        <span style={{
          background: 'linear-gradient(90deg, #ff6b6b, #ffd93d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>LEGEND</span>
        {/* <span>Design Engineers</span> */}
      </TextLoop>
          </div>







      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[120vh] sm:h-[140vh] md:h-[160vh] lg:h-[175vh] gap-[1vw] sm:gap-[1.5vw] md:gap-[2vw] overflow-hidden p-[1vw] sm:p-[1.5vw] md:p-[2vw]"
      >
        <Column images={[img[0], img[1], img[2]]} y={y} />
        <Column images={[img[3], img[4], img[5]]} y={y2} />
        <Column images={[img[6], img[7], img[8]]} y={y3} />
        <Column images={[img[9], img[10], img[11]]} y={y4} />
      </div>
      {/* <div className="font-geist relative flex h-screen items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll Up to see
          </span>
        </div>
      </div> */}
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[80px] sm:min-w-[120px] md:min-w-[160px] lg:min-w-[250px] flex-col gap-[1vw] sm:gap-[1.5vw] md:gap-[2vw] first:top-[-45%] nth-2:top-[-95%] nth-3:top-[-45%] nth-4:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
