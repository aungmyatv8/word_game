import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Title } from '@mantine/core';

function GameOverModal({isOpened, victory}) {
  const [opened, { open, close }] = useDisclosure(isOpened);

  return (
    <>
      <Modal opened={opened} onClose={close} title={victory ? "Victory" : "Eliminated"} centered>
        {/* Modal content */}
        <Title>You {victory ? "Wins" : "Loses"}</Title>
      </Modal>

      {/* <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group> */}
    </>
  );
}

export default React.memo(GameOverModal)