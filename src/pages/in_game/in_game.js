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
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./in_game-style";
import { useDebouncedState } from "@mantine/hooks";
import nlp from "compromise";

import { io } from "socket.io-client";
import Countdown from "../../component/Countdown/countdown";
import GameOverModal from "../../component/Modal/modal";
import { resetTime, changeTurn, changeLastWord } from "../../reducers/game";

const socketUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET
    : process.env.REACT_APP_SERVER_SOCKET;

const socket = io(`${socketUrl}/match`, {
  withCredentials: true,
});

const InGame = () => {
  const userState = useSelector((state) => state.user);
  const [playerType, setPlayer] = useState(null);
  const { time, isFirstPlayerTurn, players, lastWord, room } = useSelector(
    (state) => state.game
  );
  const [word, setWord] = useDebouncedState("", 200);
  const [sendDisabled, setSend] = useState(true);
  // const [lastWord, setLastWord] = useState(null);
  const [victoryStatus, setVictoryStatus] = useState({
    gameOver: false,
    text: "",
  });

  const dispatch = useDispatch();

  const [typeAble, changeTypeAble] = useState(true);

  const [messages, setMessage] = useState([]);
  const { classes } = useStyles();

  useEffect(() => {
    console.log("isFirst", isFirstPlayerTurn, playerType);
    if (playerType === "1" && isFirstPlayerTurn) {
      changeTypeAble(false);
    }
    if (playerType === "2" && !isFirstPlayerTurn) {
      changeTypeAble(false);
    }
  }, [isFirstPlayerTurn, playerType]);

  useEffect(() => {
    socket.emit("join game room", room);
  }, [room, dispatch]);

  useEffect(() => {
    function choosePlayer() {
      // console.log("checkoalyer", userState.user._id === players[0])
      setPlayer(userState.user._id === players[0] ? "1" : "2");
    }

    choosePlayer();
  }, [userState.user._id, players]);

  const Modal = useCallback(() => {
    if (time) {
       (
        <GameOverModal
          isOpened={false}
          victory={isFirstPlayerTurn ? false : true}
        />
      );
    } else {
      if (playerType === "1") {
        // console.log("player 1", playerType);
        if(isFirstPlayerTurn) {
          // lose
          socket.emit("eliminate", userState.user._id)
        } else {
          socket.emit("victory", userState.user._id)
        }

        return (
          <GameOverModal
            isOpened={true}
            victory={isFirstPlayerTurn ? false : true}
          />
        );
      }
      if (playerType === "2") {
        // console.log("player 2", playerType);
        if (isFirstPlayerTurn) {
          // lose
          socket.emit("victory", userState.user._id);
        } else {
          socket.emit("eliminate", userState.user._id);
        }

        return (
          <GameOverModal
            isOpened={true}
            victory={isFirstPlayerTurn ? true : false}
          />
        );
      }
    }
  }, [time, isFirstPlayerTurn, playerType, userState.user._id]);

  useEffect(() => {
    const split = word.split(" ");
    if (split.length >= 2) {
      setSend(true);
    } else {
      const doc = nlp(word);
      if (doc.verbs().text().length || doc.adjectives().text()) {
        setSend(false);
        // setLastWord(word[word.length - 1].toLocaleUpperCase())
      } else {
        setSend(true);
        // setLastWord(null)
      }
    }
  }, [word]);

  const onChange = (e) => {
    setWord(e.currentTarget.value);
  };

  const onSend = () => {
    setMessage((message) => [
      ...message,
      {
        sender: userState.user._id,
        name: userState.user.name,
        picture: userState.user.picture,
        lastWord,
        word,
      },
    ]);

    let time = 60;
    if (userState.user.level === "bronze") {
      time = 60;
    } else if (userState.user.level === "bronze") {
      time = 40;
    } else {
      time = 20;
    }

    changeTypeAble((state) => !state);
    dispatch(changeTurn());
    dispatch(changeLastWord(word[word.length - 1].toLocaleUpperCase()));
    dispatch(resetTime(time));

    socket.emit("send", {
      user: userState.user,
      word,
      lastWord: word[word.length - 1].toLocaleUpperCase(),
      room,
    });
  };

  // useEffect(() => {

  // })

  const Messages = useCallback(() => {
    return messages.map((data, i) => {
      if (i % 2 === 0) {
        return (
          <div style={{ marginTop: "10px" }} key={i}>
            <Text mx="md">{data.name}</Text>
            <div className={classes.leftChat}>
              <Avatar color="cyan">MK</Avatar>
              <p className={classes.leftWord}>{data.word}</p>
              <Tooltip label="Ask meaning of word" position="top-end" withArrow>
                <ActionIcon className={classes.ask}>
                  <IconInfoCircle className={classes.icon} />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ marginTop: "10px", position: "relative" }} key={i}>
            <Text
              mx="md"
              style={{ position: "absolute", top: "-35px", right: "0" }}
            >
              {data.name}
            </Text>
            <div className={classes.rightChat}>
              <Avatar color="cyan">MK</Avatar>
              <p className={classes.rightWord}>{data.word}</p>
              <Tooltip label="Ask meaning of word" position="top-end" withArrow>
                <ActionIcon className={classes.ask}>
                  <IconInfoCircle className={classes.icon} />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        );
      }
    });
  }, [messages, classes]);

  // const Chat = () => {
  //   return (
  //     <div className={classes.chat}>
  //       {Messages()}
  //     </div>
  //   );
  // };

  const Chat = useCallback(
    () => <div className={classes.chat}>{Messages()}</div>,
    [Messages, classes.chat]
  );

  useEffect(() => {
    socket.on("receive", (data) => {
      dispatch(changeTurn());
      let time = 60;
      if (userState.user.level === "bronze") {
        time = 60;
      } else if (userState.user.level === "bronze") {
        time = 40;
      } else {
        time = 20;
      }

      dispatch(resetTime(time));
      dispatch(changeLastWord(data.lastWord));
      setMessage((message) => [
        ...message,
        {
          ...data,
        },
      ]);
    });
  }, [dispatch, userState.user.level]);

  return (
    <AppShell navbar={<Aside active={1} />}>
      <Container>
        <Title align="center">You are Player {playerType}</Title>
        <Center>
          {/* <Title>Timer</Title> */}
          {Modal()}

          <Group position="apart">
            <Title order={2} color={isFirstPlayerTurn ? "green" : "white"}>
              Player 1
            </Title>
            <Countdown />
            <Title order={2} color={isFirstPlayerTurn ? "white" : "green"}>
              {" "}
              Player 2
            </Title>
            {/* <Title>60</Title> */}
          </Group>
        </Center>
        <Center>
          <Container className={classes.background}>
            <div className={classes.chatContainer}>
              {Chat()}

              <TextInput
                defaultValue={word}
                disabled={typeAble}
                // value={word}
                icon={lastWord}
                placeholder="Word"
                className={classes.input}
                rightSection={
                  <ActionIcon disabled={sendDisabled} onClick={onSend}>
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
