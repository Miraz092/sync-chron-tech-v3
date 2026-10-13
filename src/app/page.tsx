import Hero from "@/components/hero/Hero";
import BentoSection from "@/components/stats/BentoSection";
import ServicesSection from "@/components/services/ServicesSection";
import WorksSection from "@/components/works/WorksSection";
import { getProjects } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex flex-col items-start gap-2 bg-white p-3">
      <Hero />
      <BentoSection />
      <ServicesSection />
      <WorksSection projects={projects} />
    </main>
  );
}

