import { HomeView } from "@/components/pages/HomeView";

/**
 * Server Component. The page itself renders nothing interactive — the scroll
 * canvas and the language switch live in HomeView, which is the client
 * boundary. Splitting them this way is what lets this file export metadata at
 * all: a file marked "use client" cannot.
 *
 * Title and description come from the root layout's defaults.
 */
export default function HomePage() {
  return <HomeView />;
}
