import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Paths, ServerPaths } from "../utils/paths";
import AuthContext from "../contexts/AuthContext";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerContext from "../contexts/DrawerContext";


/**
 * A UI component that shows important links to the user
 */

export default function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { toggleDrawer } = useContext(DrawerContext);
    return (
        <Box sx={{
            display: 'flex',
            p: 2,
            justifyContent: 'space-between',
            bgcolor: 'background.surface',
            borderBottom: '1px solid',
            borderColor: 'divider',
            position: 'sticky'
        }}>
            <Box display="flex">
                <IconButton aria-label="Main Menu" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography>Blogger Alternative</Typography>
            </Box>

            {
                isAuthenticated
                    ? <Button onClick={logout}>Logout</Button>
                    : <Button><a href={ServerPaths.Login}>Login to Google</a></Button>
            }
        </Box>
    )
}