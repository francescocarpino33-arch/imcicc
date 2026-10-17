import { createFileRoute, redirect } from "@tanstack/react-router";

// The old services page now lives inside About; keep the URL working.
export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
});
