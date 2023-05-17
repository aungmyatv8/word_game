import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home";
import NotFound from "./pages/404/404";
import FindPlayer from "./pages/find_player/find_player";
import Player from './pages/player/player';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "find",
    element: <FindPlayer />,
  },
  {
    path: "me",
    element: <Player />
  }
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
