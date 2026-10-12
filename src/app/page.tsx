import Hero from "@/components/hero/Hero";
import BentoSection from "@/components/stats/BentoSection";
import ServicesSection from "@/components/services/ServicesSection";
import WorksSection from "@/components/works/WorksSection";

export default function Home() {
  return (
    <main className="flex flex-col items-start gap-2 bg-white p-3">
      <Hero />
      <BentoSection />
      <ServicesSection />
      <WorksSection />
    </main>
  );
}

