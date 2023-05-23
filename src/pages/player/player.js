import React from 'react';


import { AppShell, Center, Title } from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";

// import { io } from "socket.io-client";

// const socketUrl =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_DEV_SOCKET
//     : process.env.REACT_APP_SERVER_SOCKET;

// console.log("sock", socketUrl);

// const socket = io(`${socketUrl}/match`, {
//   withCredentials: true,
// });



const Player = () => {
    return  <div>
    <Protected>
      <AppShell navbar={<Aside active={0}/>}>
        <Center>
          <Title>Me</Title>
        </Center>
      </AppShell>
    </Protected>
  </div>
}

export default React.memo(Player)