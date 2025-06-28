import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import skillBridge_logo from '../component/assests/skillBridge_logo.jpg';
import { UserContext } from '../context/UserContext';
import { emphasize } from '@mui/material';

export default function Navbar() {

    const location = useLocation();
    const [value, setValue] = React.useState(1);

    React.useEffect(() => {
        const path = location.pathname;

        if (path === '/home') {
            setValue(0);
        } else if (path === '/signup') {
            setValue(1);
        } else if (path.startsWith('/businessDashboard')) {
            setValue(2);
        } else if (path === '/logout') {
            setValue(2);
        } else if (path === '/userDashboard') {
            setValue(2);
        }
        else {
            setValue(-1);
        }
    }, [location.pathname]);


    // register true or false
    const { setUser, user, userIcon, setUserIcon } = React.useContext(UserContext);

    const navigate = useNavigate();

    const logoutNavigation = () => {
        if (window.confirm("Are you sure to Logout..?")) {
            localStorage.removeItem('signUpData');
            localStorage.removeItem('BusinessRegister');
            setUser(false);
            setUserIcon(false);
            navigate('/signup')
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: "10px" }}>

            <img src={skillBridge_logo} style={{ height: "50px", width: "300px", minWidth: "140px", objectFit: "cover" }} />

            <Box sx={{ width: ['100vw'], display: 'flex', justifyContent: "end", padding: "10px 5px" }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction component={Link} to="/home" label="Home" icon={<HomeIcon />} sx={{ marginRight: "20px" }} />
                    {user ?
                        <BottomNavigationAction component={Link} value={2} to="/businessDashboard" label="Business" icon={<AddBusinessIcon />} sx={{ marginRight: "20px"}} />
                        :
                        <BottomNavigationAction component={Link} value={1} to="/signup" label="Register" icon={<AssignmentIndIcon />} sx={{ marginRight: "20px" }} />
                    }
                    {
                        userIcon && <BottomNavigationAction component={Link} value={2} to="/userDashboard" label="User" icon={<PersonAddAltIcon />} sx={{ marginRight: "20px" }} />
                    }
                    {
                        userIcon ? <BottomNavigationAction
                            onClick={logoutNavigation}
                            value={3} label="Logout" icon={<ExitToAppIcon />} sx={{ marginRight: "20px" }} />
                            : null
                    }
                    {
                        user ?
                        <BottomNavigationAction
                            onClick={logoutNavigation}
                            value={3} label="Logout" icon={<ExitToAppIcon />} sx={{ marginRight: "20px" }} />
                            : null
                        }

                </BottomNavigation>
            </Box>
        </div>
    )
}