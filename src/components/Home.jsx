import React from 'react';
import { useTranslation } from 'react-i18next';
import AccordionTask from "./AccordionTask";
import AppLayout from './AppLayout';
import Container from '@mui/material/Container';

const Home = () => {
    const {t}=useTranslation();

    return (
        <>
            <AppLayout title={t('TODO APP')} />
            <Container maxWidth="sm">
                <AccordionTask />
            </Container>
        </>
    );
}

export default Home;