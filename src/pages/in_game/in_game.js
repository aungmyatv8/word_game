import React, { useState, useCallback, useEffect } from "react";
import { Avatar } from "@mantine/core";
import { IconSend, IconInfoCircle } from "@tabler/icons-react";
import {
  AppShell,
  Center,
  Title,
  Text,
  Container,
  Loader,
  Stack,
  Tooltip,
  ActionIcon,
  Input,
} from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useSelector } from "react-redux";
import { useStyles } from "./in_game-style";

const InGame = () => {
  const Chat = () => {
    return (
      <div className={classes.chat}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20,
        ].map(() => (
          <React.Fragment>
            <div style={{ marginTop: "10px" }}>
              <Text mx="md">Aung Myint Myat</Text>
              <div className={classes.leftChat}>
                <Avatar color="cyan">MK</Avatar>
                <p className={classes.leftWord}>Left Message</p>
                <Tooltip
                  label="Ask meaning of word"
                  position="top-end"
                  withArrow
                >
                  <ActionIcon className={classes.ask}>
                    <IconInfoCircle className={classes.icon} />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>

            <div style={{ marginTop: "10px", position: "relative" }}>
              <Text
                mx="md"
                style={{ position: "absolute", top: "-35px", right: "0" }}
              >
                Myint Myat
              </Text>
              <div className={classes.rightChat}>
                <Avatar color="cyan">MK</Avatar>
                <p className={classes.rightWord}>Right Message</p>
                <Tooltip
                  label="Ask meaning of word"
                  position="top-end"
                  withArrow
                >
                  <ActionIcon className={classes.ask}>
                    <IconInfoCircle className={classes.icon} />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const { classes } = useStyles();
  return (
    <AppShell navbar={<Aside active={1} />}>
      <Container>
        <Center>
          <Title>Game</Title>
        </Center>
        <Center>
          <Container className={classes.background}>
            <div className={classes.chatContainer}>
              {Chat()}

              <Input
                icon={"G"}
                placeholder="Word"
                className={classes.input}
                rightSection={
                  <ActionIcon>
                    <IconSend />
                  </ActionIcon>
                }
              />
            </div>
          </Container>
        </Center>
      </Container>
    </AppShell>
  );
};

export default React.memo(InGame);
