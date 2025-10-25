import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Org from "./pages/Org";

function App() {
  const createRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <Org />,
    },
  ]);

  return (
    <>
      <RouterProvider router={createRouter} />
    </>
  );
}

export default App;
