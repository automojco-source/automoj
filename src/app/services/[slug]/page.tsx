import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { SERVICES_CATALOG, SERVICE_SLUGS, getService } from "@/lib/services";

/**
 * Server Component on purpose. Previously this page fell back to the
 * accident-repair entry for ANY unknown slug, so every made-up URL under
 * /services/ answered 200 with duplicate content — an unbounded soft-404
 * surface. Unknown slugs now return a real 404, and the four real ones are
 * pre-rendered.
 */

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

/**
 * Only the slugs from generateStaticParams exist. Anything else is a real 404
 * from the routing layer — no render, no soft-404. Retired slugs are handled by
 * the redirects() block in next.config.ts, which runs before routing.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found | Auto Moj", robots: { index: false } };

  return {
    title: `${service.title_en} | Auto Moj`,
    description: service.short_en,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      title: `${service.title_en} | Auto Moj`,
      description: service.short_en,
      images: [{ url: service.img }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = SERVICES_CATALOG[slug];
  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
