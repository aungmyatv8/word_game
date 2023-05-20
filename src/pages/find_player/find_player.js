import React from "react";
import { AppShell, Center, Title, Button, Container } from "@mantine/core";
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

const findPlayer = () => {

  const find_player = async() => {
    
  }
  return (
    <div>
      {/* <Protected> */}
        <AppShell navbar={<Aside active={1}/>}>
          <Container>
            <Center>
              <Title>Find Match</Title>
            
          
            </Center>
            <Center>
            <Button mt="md" size="lg" onClick={() => console.log("find")}>Find</Button>
            </Center>
          </Container>
        </AppShell>
      {/* </Protected> */}
    </div>
  );
};

export default findPlayer;
