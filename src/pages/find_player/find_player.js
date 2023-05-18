import React from 'react';
import { AppShell, Center, Title } from '@mantine/core';
import Aside from '../../component/Navbar/navbar';


const findPlayer = () => {
    return <div>
       <AppShell navbar={<Aside />}>
        <Center>
            <Title>Find Player</Title>
        </Center>
       </AppShell>
    </div>
}


export default findPlayer;