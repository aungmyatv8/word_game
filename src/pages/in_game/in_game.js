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
import Countdown from "../../component/Countdown/countdown";
import GameOverModal from "../../component/Modal/modal";
import {resetTime} from "../../reducers/game";

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
  const {time, isFirstPlayerTurn, players} = useSelector((state) => state.game);
  const [word, setWord] = useDebouncedState('', 200);
  const [sendDisabled, setSend] = useState(true);
  const [lastWord, setLastWord] = useState(null);
  const [victoryStatus, setVictoryStatus] = useState({
    gameOver: false,
    text:""
  });


  useEffect(() => {
   function choosePlayer() {
    console.log("checkoalyer", userState.user._id === players[0])
    setPlayer(userState.user._id === players[0] ? "1" : "2");
   }

   choosePlayer()
  }, [userState.user._id, players])
  
  

 const Modal = useCallback(() => {
  console.log("time", time)
    
    // if(time <= 0) {
    //   // if you are player 1 and isFirstPlayerTurn -> you lose
    //   // if you are player 2 and isFirstPlayerTurn
    //   console.log("zero time")
    //   if(playerType === "1") {
    //     console.log("player 1", playerType)
    //     return <GameOverModal isOpened={true} victory={isFirstPlayerTurn ? false : true}/>
    //   }
    //   else if(playerType === "2") {
    //     console.log("player 2", playerType)
    //     return <GameOverModal isOpened={true} victory={isFirstPlayerTurn ? true : false}/>
  
    //   }
    // } else {
    //   console.log("not oepning")
    //   return 
    // }

    if(time) {
      <GameOverModal isOpened={false} victory={isFirstPlayerTurn ? false : true} />
    } else {
      if(playerType === "1") {
        console.log("player 1", playerType)
        return <GameOverModal isOpened={true} victory={isFirstPlayerTurn ? false : true}/>
      }
      if(playerType === "2") {
        console.log("player 2", playerType)
        return <GameOverModal isOpened={true} victory={isFirstPlayerTurn ? true : false}/>
  
      }
    }

    
  }, [time, isFirstPlayerTurn, playerType])
  


  useEffect(() => {
    const split = word.split(" ")
    if(split.length >= 2) {
      setSend(true)
    } else {
      const doc = nlp(word);
      if(doc.verbs().text().length || doc.adjectives().text()) {
        setSend(false)
        setLastWord(word[word.length - 1].toLocaleUpperCase())
      } else {
        setSend(true)
        setLastWord(null)
      }
    }
 

  }, [word])

  const onChange = (e) => {
    setWord(e.currentTarget.value)

  }

  const onSend = () => {
    socket.emit("send", {id: userState.user._id, word, lastWord})
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
      {/* <GameOverModal isOpened={victoryStatus.gameOver} victory={victoryStatus.text}/> */}
      {Modal()}
      <Title align="center">You are Player {playerType}</Title>
        <Center>
          {/* <Title>Timer</Title> */}
          
          
          <Group position="apart">
          <Title order={2} color={isFirstPlayerTurn ? "green": "white"}>Player 1</Title> 
          <Countdown />
          <Title order={2} color={isFirstPlayerTurn ? "white": "green"}> Player 2</Title> 
          {/* <Title>60</Title> */}
          </Group>

        </Center>
        <Center>
          <Container className={classes.background}>
            <div className={classes.chatContainer}>
              {Chat()}

              <TextInput
                defaultValue={word}
                // value={word}
                icon={lastWord}
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
