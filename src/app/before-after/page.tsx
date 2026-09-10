/**
 * UNREACHABLE — kept only so the route's history is visible in the tree.
 *
 * /before-after is redirected to /services by the redirects() block in
 * next.config.ts, which resolves before filesystem routing, so this component
 * never renders.
 *
 * The gallery it replaced presented Unsplash stock photography as Auto Moj's
 * own before/after work, which is a misleading claim under the DMCC Act 2024.
 * Delete the redirect and rebuild this page only when real photographs of the
 * workshop's own repairs are available. The original is in _backups/.
 */
import { redirect } from "next/navigation";

export default function BeforeAfterPage() {
  redirect("/services");
}
