import React, { useContext } from "react";
import { Paths, ServerPaths } from "../utils/paths";
import AuthContext from "../contexts/AuthContext";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
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
            <Box display="flex" alignItems={'center'}>
                <IconButton aria-label="Main Menu" onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <IconButton aria-label="Home" component="a" href="/" style={{textDecoration: 'none'}}>
                    Blogger Alternative
                </IconButton>
                <Stack direction="row" justifyContent="center" spacing={1} alignItems="center">
                    <Button variant="plain" color="neutral" component="a" href={Paths.PostsList}>Posts</Button>
                </Stack>
            </Box>

            {
                isAuthenticated
                    ? <Button onClick={logout}>Logout</Button>
                    : <Button><a href={ServerPaths.Login} style={{ textDecoration: 'none', color: 'inherit' }}>Login to Google</a></Button>
            }
        </Box>
    )
}