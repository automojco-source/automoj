import type { NextConfig } from "next";

/**
 * Security headers are set here rather than in middleware so they apply to
 * static assets too, and so middleware stays focused on the admin gate.
 *
 * Not set yet, deliberately: Content-Security-Policy. The homepage draws to a
 * canvas and the contact page embeds a Google Map, so a CSP needs to be written
 * against the real asset list and tested — a wrong one fails silently in the
 * browser. Add it once the map is behind a consent gate.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // No remote image hosts are allowed. Add entries here only for hosts we
    // actually control or have licensed.
    remotePatterns: [],
  },

  // Don't advertise the framework version.
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The admin area and the API must never be cached by a shared proxy.
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  /**
   * Redirects belong here rather than in the page components. `redirect()`
   * inside a prerendered Server Component becomes a CLIENT-side redirect served
   * with HTTP 200 — which is exactly what a crawler must not see. Declared here
   * they are real 307/308 responses, resolved before routing.
   */
  async redirects() {
    return [
      // Renamed: the slug said alloy wheels, the page was panel beating.
      {
        source: "/services/alloy-wheel-repair",
        destination: "/services/panel-beating",
        permanent: true,
      },
      // The gallery is offline until real workshop photography replaces the
      // stock images that were previously presented as our own work.
      // Temporary (307) on purpose — this is coming back.
      { source: "/before-after", destination: "/services", permanent: false },
      { source: "/restorations", destination: "/services", permanent: false },
    ];
  },
};

export default nextConfig;
