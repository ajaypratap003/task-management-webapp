import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Config } from '../helpers';

const AppLayout = ({ title, goToPage }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navigateToPage = () => {
        navigate(goToPage);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {!Config.baseRoutes.includes(pathname) && <ArrowBackIcon onClick={navigateToPage} />}
                <Typography variant="h6"
                    noWrap gutterBottom component="div" sx={{ pb: 0, mr: 1, ml: pathname !== '/' ? 2 : '' }} >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppLayout;