import React, { useEffect, useState } from "react";
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
  Loader,
  Text,
} from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useStyles } from "./board-style";
import { IconCrown } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

// import { io } from "socket.io-client";

// const socketUrl =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_DEV_SOCKET
//     : process.env.REACT_APP_SERVER_SOCKET;

// console.log("sock", socketUrl);

// const socket = io(`${socketUrl}/match`, {
//   withCredentials: true,
// });

const SERVER_UL = "http://localhost:4000";

const Board = () => {
  const userState = useSelector((state) => state.user);
  const { classes } = useStyles();
  const [topFifty, setTopFifty] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    if(!userState.token) {
      navigate("/")
      return ;
    }
    async function fetch() {
      // console.log("users", userState)
      const result = await axios.post(
        `${SERVER_UL}/board`,
        {
          level: userState.user.level,
        },
        {
          headers: {
            Authorization: userState.token,
          },
        },
        {
          withCredentials: true,
        }
      );

      // console.log("result", result.data[0], result.data.length);
      setTopFifty(result.data);
      setLoading(false);
    }

    fetch();
  }, [userState, navigate]);

  return (
      <div>
        {loading ? (
          <Loader />
        ) : (
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
                  {userState.user.level}
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
                          <Avatar
                            color="green"
                            radius="xl"
                            size="md"
                            src={topFifty[1].picture}
                          ></Avatar>
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
                            <Avatar
                              color="yellow"
                              radius="xl"
                              size="lg"
                              src={topFifty[0].picture}
                            ></Avatar>
                          </Indicator>
                        </Stack>
                        <Indicator
                          inline
                          size={16}
                          position="bottom-center"
                          label="3"
                          color="purple"
                        >
                          <Avatar
                            color="green"
                            radius="xl"
                            size="md"
                            src={topFifty[2].picture}
                          ></Avatar>
                        </Indicator>
                      </Group>
                    </Center>
                    <Center>
                      <Stack mt="xl">
                        {topFifty.map((data, index) => {
                          console.log("in map", data);
                          return (
                            <div className={classes.cardDesign}>
                              <Group noWrap>
                                <Text lineClamp={1}>{index + 1}</Text>
                                <Avatar
                                  color="green"
                                  src={data.picture}
                                ></Avatar>
                                <Text lineClamp={1}>{data.name}</Text>
                                <Text>Win: {data.win}</Text>
                              </Group>
                            </div>
                          );
                        })}
                      </Stack>
                    </Center>
                  </Container>
                </Center>
              </Container>
            </Center>
          </AppShell>
        )}
      </div>

  );
};

export default React.memo(Board);
