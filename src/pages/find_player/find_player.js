import React, { useState, useCallback} from "react";
import { AppShell, Center, Title, Button, Container, Loader } from "@mantine/core";
import Aside from "../../component/Navbar/navbar";
import Protected from "../../component/Protected";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {setData} from '../../reducers/game'


import { io } from "socket.io-client";

const socketUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SOCKET
    : process.env.REACT_APP_SERVER_SOCKET;



const socket = io(`${socketUrl}/match`, {
  withCredentials: true,
});

const FindPlayer = () => {
  const [isFinding, setFinding] = useState(false);
  const userState = useSelector((state) => state.user);
  // const gameState = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("this find")
 

 

  // useEffect(() => {
  //   socket.on("waiting room", (data) => {
  //     console.log("waiting room", data)
  //   })
  // })




  const Buttons = useCallback(() => {

    const goToMatch = (result) => {
      console.log("result", result)
      if(result.players.includes(userState.user._id)) {
        // set game id and navigate
        navigate("/game")
      }
      
    }

    const findMatch = () => {
      
      var time = 60;
      if(userState.user.level === "bronze") {
        time = 10;
      } else if(userState.user.level === "silver") {
        time = 40;
      } else {
        time = 20;
      }
      


      setFinding(true);
      socket.emit("find-match", userState.user, (response) => {
        // console.log("find match", response)
        goToMatch(response.data)
        socket.emit("join game room", response.data)
        // dispatch(setData(response.data))
        dispatch(setData({players: response.data.players, room: response.data.room, time}))
      })
      // socket.emit("join_room", "join_room")

      socket.on(`found match`, (data) => {
        // console.log("found match", data)
        goToMatch(data)
        socket.emit("join game room", data)
        dispatch(setData({players: data.players, room: data.room, time}))
      })
     
      // socket.emit("join waiting room", userState.user._id)
      
      // console.log("waiting on ", userState.user._id)
      
     
      
      
     
    }


   

    const cancelFindMatch = () => {
      setFinding(false)
      socket.emit("cancel-find-match", userState.user._id, () => console.log("cancel"))
    }

    return isFinding ? (
      <div>
        <Button mt="md" size="lg" onClick={cancelFindMatch}>
        Cancel
      </Button>
      <div>
      <Loader mt="lg" ml="md" />
      </div>
      </div>
    ) : (
      <Button mt="md" size="lg" onClick={findMatch}>
        Find
      </Button>
    )
  }, [isFinding, userState, navigate, dispatch])



  return (
    <div>
      {/* <Protected> */}
      <AppShell navbar={<Aside active={1} />}>
        <Container>
          <Center>
            <Title>Find Match</Title>
          </Center>
          <Center>
            {Buttons()}
          </Center>
        </Container>
      </AppShell>
      {/* </Protected> */}
    </div>
  );
};

export default React.memo(FindPlayer);
