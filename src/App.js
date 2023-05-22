import React, { Suspense } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Loader} from '@mantine/core' 
import InGame from "./pages/in_game/in_game";
// import Board from "./pages/board/board";

const Home = React.lazy(() => import("./pages/home/home"));
const NotFound = React.lazy(() => import("./pages/404/404"));
const FindPlayer = React.lazy(() => import("./pages/find_player/find_player"));
const Player = React.lazy(() => import("./pages/player/player"));
const Board = React.lazy(() => import("./pages/board/board"))

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <NotFound />,
//   },
//   {
//     path: "find",
//     element: <FindPlayer />,
//   },
//   {
//     path: "me",
//     element: <Player />,
//   },
// ]);

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
        {/* <RouterProvider router={router} /> */}
        <Router >
          <Routes>  
              <Route exact path="/" element={<Home />} />
              <Route exact path="/find" element={<FindPlayer />} />
              <Route exact path="/board" element={<Board />} />
              <Route exact path="/game" element={<InGame />} />
              <Route exact path="/me" element={<Player />} />
              <Route path="*" element={<NotFound />}/>
          </Routes>
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
