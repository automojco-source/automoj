import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const BLOG_POSTS = [
  {
    slug: "how-much-does-car-body-repair-cost-london",
    title: "How Much Does Car Body Repair Cost in London? (2026 Guide)",
    excerpt: "A complete breakdown of typical repair costs for scratches, dents, and resprays in the Greater London area.",
    date: "Sep 2, 2026",
    category: "Pricing"
  },
  {
    slug: "what-to-do-after-car-accident",
    title: "What Should I Do After a Car Accident in the UK?",
    excerpt: "A step-by-step guide on handling insurance claims, staying safe, and getting your car assessed for repairs.",
    date: "Aug 28, 2026",
    category: "Guides"
  },
  {
    slug: "can-dent-be-repaired-without-painting",
    title: "Can a Dent Be Repaired Without Painting?",
    excerpt: "Everything you need to know about Paintless Dent Removal (PDR) and when it's the right choice for your vehicle.",
    date: "Aug 15, 2026",
    category: "Services"
  }
];

export default function BlogIndexPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Bodyshop Blog & Guides</h1>
        <p className="text-muted-foreground text-lg">
          Expert advice, repair guides, and industry news from London&rsquo;s premium accident repair centre.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {BLOG_POSTS.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm">
            <div className="aspect-[16/9] bg-surface relative">
              {/* Placeholder for blog image */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <span className="font-bold opacity-20 text-4xl">BLOG</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="text-primary">{post.category}</span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground text-sm flex-1 mb-6">{post.excerpt}</p>
              <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
