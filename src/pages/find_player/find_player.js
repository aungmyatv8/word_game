import React from 'react';
import { AppShell } from '@mantine/core';
import Aside from '../../component/Navbar/navbar';


const findPlayer = () => {
    return <div>
       <AppShell navbar={<Aside />}>
        <h1>Find palyer</h1>
       </AppShell>
    </div>
}


export default findPlayer;