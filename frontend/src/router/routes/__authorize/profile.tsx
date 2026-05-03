import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Hello "/__authorize/profile"!</div>;
};

export const Route = createFileRoute("/__authorize/profile")({
  component: RouteComponent,
});
