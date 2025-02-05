import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Config } from '../helpers';

/**
 * AppLayout component renders the application layout with an AppBar.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the AppBar.
 * @param {string} props.goToPage - The page to navigate to when the back arrow is clicked.
 */
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