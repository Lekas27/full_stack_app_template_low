import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Hello &quot;/__authorize/profile&quot;!</div>;
};

export const Route = createFileRoute("/__authorize/profile")({
  component: RouteComponent,
});
