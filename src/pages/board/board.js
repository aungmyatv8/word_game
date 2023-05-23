import React, { useState } from "react";
import {
  AppShell,
  Center,
  Title,
  Container,
  Avatar,
  Badge,
  Group,
  Indicator,
  Stack,
  Card,
  Text,
} from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useStyles } from "./board-style";
import { IconCrown } from "@tabler/icons-react";

// import { io } from "socket.io-client";

// const socketUrl =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_DEV_SOCKET
//     : process.env.REACT_APP_SERVER_SOCKET;

// console.log("sock", socketUrl);

// const socket = io(`${socketUrl}/match`, {
//   withCredentials: true,
// });

const Board = () => {
  const { classes } = useStyles();
  const [topFifty, setTopFifty] = useState([...Array(20).keys()])
  return (
    <div>
      {/* <Protected>
      
      
      </Protected> */}
      <AppShell navbar={<Aside active={2} />}>
        <Center>
          <Title>Leader Board</Title>
        </Center>
        <Center>
          <Container className={classes.container}>
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              Bronze
            </Badge>
            <Center>
              <Container className={classes.boardContainer}>
                <Center>
                  <Group spacing="xl" sx={{ marginTop: "50px" }}>
                    <Indicator
                      inline
                      size={16}
                      position="bottom-center"
                      label="2"
                      color="blue"
                    >
                      <Avatar color="green" radius="xl" size="md">
                        TD
                      </Avatar>
                    </Indicator>

                    <Stack className={classes.firstWinner}>
                      <IconCrown
                        className={classes.crown}
                        size="50px"
                        color="gold"
                      />
                      <Indicator
                        inline
                        size={16}
                        position="bottom-center"
                        label="1"
                        color="green"
                      >
                        <Avatar color="yellow" radius="xl" size="lg">
                          FT
                        </Avatar>
                      </Indicator>
                    </Stack>
                    <Indicator
                      inline
                      size={16}
                      position="bottom-center"
                      label="3"
                      color="purple"
                    >
                      <Avatar color="green" radius="xl" size="md">
                        TD
                      </Avatar>
                    </Indicator>
                  </Group>
                </Center>
                <Center>
                  <Stack mt="xl" >
                    {
                      topFifty.map(data => (
                        <div className={classes.cardDesign}>
                        <Group noWrap>
                           <Text lineClamp={1}>{data}</Text>
                           <Avatar color="green">Ak</Avatar>
                           <Text lineClamp={1}>Aung Myint Myat</Text>
                           <Text>Win: 10</Text>
                         </Group>
                     </div>
                      ))
                    }
                 
                  </Stack>
                </Center>
              </Container>
            </Center>
          </Container>
        </Center>
      </AppShell>
    </div>
  );
};

export default React.memo(Board);
