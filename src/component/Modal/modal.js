import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Title } from '@mantine/core';
import {useNavigate} from 'react-router-dom';

function GameOverModal({isOpened, victory}) {
  const [opened, { _, close }] = useDisclosure(isOpened);
  const navigate = useNavigate();

  const onClose = () => {
    close();
    navigate("/find")
  }

  return (
  
   <React.Fragment>
       <Modal opened={opened} onClose={onClose} title={victory ? "Victory" : "Eliminated"} centered>
        <Title>You {victory ? "Wins" : "Loses"}</Title>
      </Modal>
   </React.Fragment>

 
 
  );
}

export default React.memo(GameOverModal)