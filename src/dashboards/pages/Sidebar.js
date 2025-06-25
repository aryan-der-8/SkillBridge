import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
} from '@mui/material';


export default function Sidebar() {
    
    const ownerEmail = JSON.parse(localStorage.getItem("signUpData"));

    const location = useLocation();
    // console.log(location);

    const menuItems = [
        { text: 'Dashboard', path: '/businessDashboard/dashboard' },
        { text: 'Job Applied', path: '/businessDashboard/jobapplied' },
        { text: 'Register Business', path: '/businessDashboard/register' },
        { text: 'Business List', path: '/businessDashboard/business-list' },
    ];

    const drawerWidth = 240;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" fontWeight={'bold'} noWrap>
                    <span>{ownerEmail.email}</span>
                </Typography>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} sx={{ padding: 0 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname.includes(item.path)}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}