import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Loader} from '@mantine/core' 

const Home = React.lazy(() => import("./pages/home/home"));
const NotFound = React.lazy(() => import("./pages/404/404"));
const FindPlayer = React.lazy(() => import("./pages/find_player/find_player"));
const Player = React.lazy(() => import("./pages/player/player"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "find",
    element: <FindPlayer />,
  },
  {
    path: "me",
    element: <Player />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      ><Loader /></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
