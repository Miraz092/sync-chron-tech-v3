import { defineType, defineField } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects (Our Works)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. Multi-Vendor Commerce Platform",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL identifier)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Category / Tag",
      type: "string",
      description: "e.g. E-Commerce, ERP / Logistics, Healthcare, EdTech",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true, // Enables visual hotspot/crop for designer control
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Overview / Description",
      type: "text",
      rows: 3,
      description: "Brief summary of the work/case study.",
    }),
    defineField({
      name: "kpis",
      title: "Key Performance Indicators (KPIs)",
      type: "array",
      of: [
        {
          type: "object",
          name: "kpi",
          title: "KPI Item",
          fields: [
            {
              name: "value",
              title: "Value / Number (e.g. 80%, 3x, 10K+)",
              type: "string",
            },
            {
              name: "label",
              title: "Label / Metric (e.g. Performance Improvement, Revenue Growth)",
              type: "string",
            },
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
      description: "Add multiple KPIs (e.g. 80% Performance Improvement, 3x Faster)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order priority to display on the website (1, 2, 3...)",
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tag",
      media: "coverImage",
    },
  },
});

