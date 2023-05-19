import React from 'react';
import { AppShell, Center, Title } from '@mantine/core';
import Aside from '../../component/Navbar/navbar';

import { io } from "socket.io-client";

const socketUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET
    : process.env.REACT_APP_SERVER_SOCKET;

console.log("sock", socketUrl)

const socket = io(`${socketUrl}/match`, {
    withCredentials: true,
  });

  

const findPlayer = () => {
    return <div>
       <AppShell navbar={<Aside />}>
        <Center>
            <Title>Find Player</Title>
        </Center>
       </AppShell>
    </div>
}


export default findPlayer;