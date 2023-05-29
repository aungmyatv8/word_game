import React, { useState, useEffect } from 'react';


import { AppShell, Avatar,  Group, Text , Center, Title, Loader } from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import { useSelector} from 'react-redux';
import axios from 'axios'

// import { io } from "socket.io-client";

// const socketUrl =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_DEV_SOCKET
//     : process.env.REACT_APP_SERVER_SOCKET;

// console.log("sock", socketUrl);

// const socket = io(`${socketUrl}/match`, {
//   withCredentials: true,
// });


const SERVER_UL = "http://localhost:4000"


const Player = () => {
  const userState = useSelector(state => state.user);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    async function fetch() {
      console.log("users", userState)
      const result = await axios.post(`${SERVER_UL}/me`, {
        id: userState.user._id
      }, {
        headers: {
          Authorization: userState.token
        },
        
      }, {
        withCredentials: true
      })

      console.log("result", result.data)
      setUser(result.data)
      setLoading(false);
    }

    fetch()
  }, [])


    return  <div>
    <Protected>
        {
          loading ? <Loader /> : <AppShell navbar={<Aside active={0}/>}>
          <Center>
              <Avatar src={user.picture}/>
          </Center>
          <Center my="lg">
             <Text>Name: {user.name}</Text>
          </Center>
          <Center>
            <Group>
              <Text>Win: {user.win}</Text>
              <Text>Loss: {user.loss}</Text>
              <Text>Matches: {user.matches}</Text>
            </Group>
          </Center>
        </AppShell>
        }
    </Protected>
  </div>
}

export default React.memo(Player)