import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Layout from "./pages/Layout";
import ValorantPage from "./pages/ValorantAPI/ValorantPage";
import GenshinPage from "./pages/GenshinAPI/GenshinPage";
import AgentDetailPage from "./pages/ValorantAPI/AgentDetailPage/AgentDetailPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/ValorantPage",
          element: <ValorantPage />,
        },
        {
          path: "/ValorantPage/:uuid",
          element: <AgentDetailPage />,
        },
        {
          path: "/GenshinPage",
          element: <GenshinPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
