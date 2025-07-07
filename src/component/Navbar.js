import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link, useLocation, useNavigate } from "react-router-dom";
import skillBridge_logo from "../component/assests/skillBridge_logo.jpg";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
    const location = useLocation();
    const [value, setValue] = React.useState(-1);

    const { setUser, user, userIcon, setUserIcon } = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        const path = location.pathname;

        if (path === "/home") {
            setValue(0);
        } else if (path === "/signup") {
            setValue(1);
        } else if (path.startsWith("/businessDashboard")) {
            setValue(2);
        } else if (path === "/userDashboard") {
            setValue(3);
        } else if (path.startsWith("/chat")) {
            setValue(4);
        } else {
            setValue(-1);
        }
    }, [location.pathname]);

    const logoutNavigation = () => {
        if (window.confirm("Are you sure to Logout..?")) {
            localStorage.removeItem("signUpData");
            localStorage.removeItem("BusinessRegister");
            setUser(false);
            setUserIcon(false);
            navigate("/signup");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: "10px",
            }}
        >
            <img
                src={skillBridge_logo}
                style={{
                    height: "50px",
                    width: "300px",
                    minWidth: "140px",
                    objectFit: "cover",
                }}
            />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    padding: "10px 5px",
                }}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        icon={<HomeIcon />}
                        value={0}
                        component={Link}
                        to="/home"
                        sx={{ marginRight: "20px" }}
                    />

                    {user ? (
                        <BottomNavigationAction
                            label="Business"
                            icon={<AddBusinessIcon />}
                            value={2}
                            component={Link}
                            to="/businessDashboard"
                            sx={{ marginRight: "20px" }}
                        />
                    ) : userIcon ? (
                        <BottomNavigationAction
                            label="User"
                            showLabel
                            icon={<PersonAddAltIcon />}
                            value={3}
                            component={Link}
                            to="/userDashboard"
                            sx={{ marginRight: "20px" }}
                        />

                    ) : (
                        <BottomNavigationAction
                            label="Register"
                            icon={<AssignmentIndIcon />}
                            value={1}
                            component={Link}
                            to="/signup"
                            sx={{ marginRight: "20px" }}
                        />
                    )}

                    {(user || userIcon) && (
                        <BottomNavigationAction
                            label="Logout"
                            icon={<ExitToAppIcon />}
                            value={5}
                            onClick={logoutNavigation}
                            sx={{ marginRight: "20px" }}
                        />
                    )}
                </BottomNavigation>
            </Box>
        </div>
    );
}
