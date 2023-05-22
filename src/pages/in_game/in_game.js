import React, { useState, useCallback, useEffect } from "react";
import { Avatar } from '@mantine/core';
import {IconAt} from '@tabler/icons-react'
import {
  AppShell,
  Center,
  Title,
  Button,
  Container,
  Loader,
  Input,
} from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useSelector } from "react-redux";
import { useStyles } from "./in_game-style";

const InGame = () => {


  const Chat = () => {
    return <div className={classes.chat}>
         {
          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20].map(() => (<React.Fragment>
            <div className={classes.leftChat}>
               <Avatar color="cyan">MK</Avatar>
                <p className={classes.leftWord}>Left Message</p>
              </div>

              <div className={classes.rightChat}>
                <Avatar color="cyan">MK</Avatar>
                <p className={classes.rightWord}>Right Message</p>
              </div>
          </React.Fragment>))
         }     
            
    </div>
  }

  

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
             

            <Input icon={"G"} placeholder="Word" className={classes.input} />
            </div>
         
          </Container>
        </Center>
      </Container>
    </AppShell>
  );
};

export default InGame;
