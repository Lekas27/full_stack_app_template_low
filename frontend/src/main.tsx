import { createRoot } from "react-dom/client";

import "./styles/index.css";
import { MainProvider } from "./providers/main-provider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <MainProvider />,
);
