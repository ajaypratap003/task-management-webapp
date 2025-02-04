import React from 'react';
import AccordionTask from "./AccordionTask";
import AppLayout from './AppLayout';
import Container from '@mui/material/Container';
import i18n from '../i18n';

const Home = () => {
    return (
        <>
            <AppLayout title={i18n.appTitle} />
            <Container maxWidth="sm">
                <AccordionTask />
            </Container>
        </>
    );
}

export default Home;