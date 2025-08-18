import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShell from "./shell/AppShell";
import LandingPage from "./pages/Landing";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFoundPage from "./pages/NotFound";
import ProjectsPage from "./pages/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> }, // /
      { path: "projects", element: <ProjectsPage /> }, // /projects
      { path: "about", element: <AboutPage /> }, // /about
      { path: "contact", element: <ContactPage /> }, // /contact
      { path: "*", element: <NotFoundPage /> }, // 404
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
