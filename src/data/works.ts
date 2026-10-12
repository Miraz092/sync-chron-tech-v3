export interface WorkKPI {
  value: string;
  label: string;
}

export interface WorkProject {
  id: string;
  tag: string;
  title: string;
  image: string;
  kpis: WorkKPI[];
}

export const worksProjects: WorkProject[] = [
  {
    id: "work-1",
    tag: "E-Commerce",
    title: "Multi-Vendor Commerce Platform",
    image: "/assets/works/salextra.png",
    kpis: [
      { value: "80%", label: "Performance Improvement" },
      { value: "60%", label: "Increase in Organic Traffic" },
      { value: "40%", label: "Revenue Growth" },
      { value: "3x", label: "Higher Conversion Rate" },
    ],
  },
  {
    id: "work-2",
    tag: "ERP / Logistics",
    title: "Warehouse Management System",
    image: "/assets/works/mrjn.png",
    kpis: [
      { value: "90%", label: "Shipping Accuracy" },
      { value: "40%", label: "Faster Shipping" },
      { value: "32%", label: "Cost Reduction" },
      { value: "4x", label: "Picking Efficiency" },
    ],
  },
  {
    id: "work-3",
    tag: "Healthcare",
    title: "Digital Healthcare Management Platform",
    image: "/assets/works/omphd.png",
    kpis: [
      { value: "7K+", label: "Patients Supported" },
      { value: "20+", label: "Partner Institutions" },
      { value: "24/7", label: "Digital Health Access" },
      { value: "50+", label: "Healthcare Professionals" },
    ],
  },
  {
    id: "work-4",
    tag: "EdTech",
    title: "Education Management Platform",
    image: "/assets/works/pathyochorn.png",
    kpis: [
      { value: "5K+", label: "Students Managed" },
      { value: "80%", label: "Administrative Time Reduced" },
      { value: "24/7", label: "Real-time Data Access" },
      { value: "3x", label: "Faster Reporting" },
    ],
  },
  {
    id: "work-5",
    tag: "Fashion",
    title: "Fashion E-com Management System",
    image: "/assets/works/fashion.png",
    kpis: [
      { value: "10K+", label: "Orders Managed" },
      { value: "99%", label: "Inventory Accuracy" },
      { value: "60%", label: "Less Manual Operations" },
      { value: "3x", label: "Faster Order Processing" },
    ],
  },
  {
    id: "work-6",
    tag: "Restaurant",
    title: "Restaurant Management System",
    image: "/assets/works/restaurant.png",
    kpis: [
      { value: "3x", label: "Faster Order Processing" },
      { value: "25%", label: "Reduced Operational Cost" },
      { value: "50%", label: "Improved Customer Experience" },
      { value: "100%", label: "Centralized Restaurant Control" },
    ],
  },
];

