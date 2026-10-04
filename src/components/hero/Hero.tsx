import Image from "next/image";
import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import HeroCards from "./HeroCards";
import LogoMarquee from "./LogoMarquee";

/**
 * Hero background layers (bottom → top):
 * 1. sky  2. glass blur  3. interactive cards  4. grass  5. bottom dark fade
 */
export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="hero-height relative isolate flex w-full flex-col self-stretch overflow-hidden rounded-[20px] max-md:rounded-2xl"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 [container-type:size]">
        <Image
          src="/assets/sky.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="pointer-events-none animate-sky-drift object-cover object-bottom"
        />

        <div className="pointer-events-none absolute inset-0 bg-white/24 backdrop-blur-[10.16px]" />

        <div className="hero-scene">
          <HeroCards />
          <Image
            src="/assets/grass.png"
            alt=""
            fill
            preload
            sizes="(max-width: 768px) 200vw, 100vw"
            className="pointer-events-none z-[2] object-cover"
          />
        </div>

        <div className="mask-fade-top pointer-events-none absolute inset-x-0 bottom-0 h-[287px] bg-linear-to-b from-[rgba(26,26,26,0)] to-[rgba(26,26,26,0.9)] backdrop-blur-[16px] max-md:h-[220px]" />
      </div>

      <Navbar />
      <HeroContent />

      <div className="pointer-events-none relative z-[2] mt-auto px-10 pb-8 max-md:px-5 max-md:pb-6">
        <p className="mb-5 text-xs leading-4 text-white/80">
          Trusted by Enterprises, Startups, Scale-ups, and
          <br />
          Agencies creating impacts
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}
