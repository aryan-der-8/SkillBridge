import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

export default function Signup() {

    // Passworn
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    // Confirm Password
    const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

    const handleClickConfirmShowPassword = () => setConfirmShowPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpConfirmPassword = (event) => {
        event.preventDefault();
    };

    // My code
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [userType, setUserType] = React.useState('');

    const [signUpData, setSignUpData] = React.useState([]);

    // register true and false
    // const [register, setRegister] = React.useState(false)
    const {setUser, setUserIcon} = React.useContext(UserContext);

    const navigate = useNavigate();

    const submitHandle = (e) => {
        e.preventDefault();

        if (email.length != 0 && password.length != 0 && confirmPassword.length != 0 && userType.length!=0) {
            if (password === confirmPassword) {
                
                const newData = { email: email, password: password, userType:userType };
                setSignUpData(newData);
                
                localStorage.setItem("signUpData", JSON.stringify(newData));

                setTimeout(() => {
                    if(userType == "business") {
                        navigate('/businessDashboard');
                        setUser(true);
                        // localStorage.setItem("BusinessRegister", JSON.stringify(user));
                    } 
                    if(userType == "user") {
                        navigate('/userDashboard');
                        // setUserIcon(true);
                    }
                }, 400)

            } else {
                alert("Password and Confirm password is different");
            }

        } else {
            alert("Please fill in all fields before submitting.")
        }


        setEmail("");
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <div>
            <hr />

            <h1 style={{ width: "60%", marginInline: 'auto', backgroundColor: "#1976d2", color: "#fff", borderRadius: "5px", paddingBottom: "5px" }}>Register</h1>

            <Box component={'form'} onSubmit={submitHandle} sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>

                    <Box sx={{ display: 'flex', alignItems: "center", position: "relative", justifyContent: "center", width: "100%", marginLeft: "30px" }}>
                        <TextField id="input-with-sx" label="Email" variant="standard" sx={{ width: "40%" }}
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <AccountCircle sx={{ color: 'action.active', position: "absolute", right: "30.6%", paddingTop: "14px", height:"100px" }} />
                    </Box>


                    <FormControl sx={{ width: "40%", marginBottom: "20px", marginLeft:'30px', marginTop:"30px" }}>
                        <TextField
                            select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                        >
                            <option value="" sx={{color:"red"}}>Select Role</option>
                            <option value="business">Business Owner</option>
                            <option value="user">User (Want Experience)</option>
                        </TextField>
                    </FormControl>


                    <FormControl sx={{ marginLeft: "30px", width: '40%', marginTop: "0px" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ marginLeft: "30px", width: '40%', marginTop: "20px" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
                        <Input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="standard-adornment-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showConfirmPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickConfirmShowPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                        onMouseUp={handleMouseUpConfirmPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button variant='outlined' sx={{ mt: "30px" }} type='submit'>Register</Button>

                </Box>
            </Box>
        </div>
    )
}