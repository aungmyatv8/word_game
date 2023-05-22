
import React, { useState, useCallback, useEffect} from "react";
import { AppShell, Center, Title, Button, Container, Loader } from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import {useSelector} from 'react-redux'

const InGame = () => {
    return <AppShell navbar={<Aside active={1} />}>
    <Container>
      <Center>
        <Title>Find Match</Title>
      </Center>
      <Center>
        
      </Center>
    </Container>
  </AppShell>
}


export default InGame;