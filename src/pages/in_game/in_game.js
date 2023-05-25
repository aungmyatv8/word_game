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
  Group,
  Tooltip,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useSelector } from "react-redux";
import { useStyles } from "./in_game-style";
import { useDebouncedState } from '@mantine/hooks';
import nlp from 'compromise'

import { io } from "socket.io-client";

const socketUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET
    : process.env.REACT_APP_SERVER_SOCKET;



const socket = io(`${socketUrl}/match`, {
  withCredentials: true,
});

const InGame = () => {
  const userState = useSelector((state) => state.user);
  const [word, setWord] = useDebouncedState('', 200);
  const [sendDisabled, setSend] = useState(true);
  


  useEffect(() => {
    const split = word.split(" ")
    if(split.length >= 2) {
      setSend(true)
    } else {
      const doc = nlp(word);
      if(doc.verbs().text().length || doc.adjectives().text()) {
        setSend(false)
      } else {
        setSend(true)
      }
    }
 

  }, [word])

  const onChange = (e) => {
    setWord(e.currentTarget.value)

  }

  const onSend = () => {
    socket.emit("send", {id: userState.user._id, word})
  }




  const Chat = () => {
    return (
      <div className={classes.chat}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20,
        ].map((i) => (
          <React.Fragment key={i}>
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
          {/* <Title>Timer</Title> */}
          <Group>
          <Title>Timer:</Title>
          <Title>60</Title>
          </Group>

        </Center>
        <Center>
          <Container className={classes.background}>
            <div className={classes.chatContainer}>
              {Chat()}

              <TextInput
                defaultValue={word}
                // value={word}
                icon={"G"}
                placeholder="Word"
                className={classes.input}
                rightSection={
                  <ActionIcon disabled={sendDisabled}>
                    <IconSend />
                  </ActionIcon>
                }
                onChange={onChange}
                // onKeyDownCapture={onKeyDown}
              />
            </div>
          </Container>
        </Center>
      </Container>
    </AppShell>
  );
};

export default React.memo(InGame);
