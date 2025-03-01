import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/layout")({
  component: AboutPage,
});

function AboutPage() {
  return <div>About Page</div>;
}
