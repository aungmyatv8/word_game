import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title } from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {resetGame} from '../../reducers/game'

function GameOverModal({isOpened, victory}) {
  const [opened, { _, close }] = useDisclosure(isOpened);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    close();
    dispatch(resetGame())
    navigate("/find")
  }

  return (
  
   <React.Fragment>
       <Modal opened={opened} onClose={onClose} title={victory ? "Victory" : "Eliminated"} centered>
        <Title>You {victory ? "Win" : "Lose"}</Title>
      </Modal>
   </React.Fragment>

 
 
  );
}

export default React.memo(GameOverModal)