import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "../page";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
        
        <div className="mb-10">
          <div className="flex items-center gap-4 text-sm font-semibold mb-4">
            <span className="text-primary">{post.category}</span>
            <span className="text-muted-foreground">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
        </div>

        <div className="aspect-[21/9] bg-surface rounded-2xl mb-12 flex items-center justify-center border border-border">
           <span className="text-muted-foreground font-medium">Hero Image Placeholder</span>
        </div>

        <article className="prose prose-invert prose-lg max-w-none text-muted-foreground">
          <p className="lead text-xl text-foreground font-medium mb-8">
            {post.excerpt}
          </p>
          
          <h2>The Cost of Premium Repairs</h2>
          <p>
            When looking for car body repair in London, pricing can vary significantly based on the severity of the damage, the specific vehicle model, and the quality of the paint system used by the bodyshop.
          </p>
          
          <h3>1. Minor Scratches</h3>
          <p>
            For a premium smart repair that blends the clear coat perfectly without repainting the entire panel, prices typically start at £95. This is ideal for lease return vehicles or minor parking scuffs.
          </p>

          <h3>2. Paintless Dent Removal (PDR)</h3>
          <p>
            If the paint hasn't been broken, dents can often be massaged out from behind the panel. This is a highly skilled process starting from £120, and it retains your car's factory paint finish.
          </p>
          
          <div className="bg-surface p-6 rounded-xl border border-border my-8">
            <h4 className="text-foreground font-bold m-0 mb-2">Need an exact price for your car?</h4>
            <p className="text-sm m-0 mb-4">Get a free, no-obligation estimate from our expert technicians within 24 hours.</p>
            <Link href="/get-a-quote" className="inline-block bg-primary text-background font-bold px-6 py-2 rounded-full text-sm">
              Request a Quote
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
