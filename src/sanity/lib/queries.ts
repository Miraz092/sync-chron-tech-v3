import { client, urlFor } from "@/sanity/lib/client";
import { worksProjects, WorkProject } from "@/data/works";

export const revalidate = 0; // Fetch fresh data on page reload

export async function getProjects(): Promise<WorkProject[]> {
  try {
    const query = `*[_type == "project"] | order(order asc, _createdAt desc){
      _id,
      title,
      tag,
      coverImage,
      kpis,
      "slug": slug.current
    }`;

    const sanityProjects = await client.fetch(query);

    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects.map((p: any) => ({
        id: p._id,
        tag: p.tag || "Case Study",
        title: p.title,
        image: p.coverImage ? urlFor(p.coverImage).width(800).height(600).url() : "/assets/works/salextra.png",
        kpis: (p.kpis || []).map((k: any) => ({
          value: k.value || "",
          label: k.label || "",
        })),
      }));
    }
  } catch (error) {
    console.error("Error fetching projects from Sanity, falling back to local data:", error);
  }

  // Fallback to local data if no projects exist in Sanity yet
  return worksProjects;
}

