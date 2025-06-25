import React, { useContext, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Paper,
  Container,
  CardActionArea,
  CardContent,
  Checkbox,
  Card,
} from '@mui/material';

import { Visibility, VisibilityOff, Male, Female, Transgender } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

export default function User() {

  const signupData = JSON.parse(localStorage.getItem("signUpData"));
  
  const [email, setEmail] = useState(signupData.email);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const navigate = useNavigate();

  const {userData, setUserData} = useContext(UserContext)

  const submitHandle = (e) => {
    e.preventDefault();

    if(phone.length !== 10) {
      alert("Enter valid phone number");
      return
    }

    setUserData({
      ...userData,
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      gender,
      password,
    });

    navigate('/userInterest');
  };

  return (
    <Box component="form" onSubmit={submitHandle} sx={{ p: 4 }}>
      <h1 style={{ width: "60%", marginInline: 'auto', backgroundColor: "#1976d2", color: "#fff", borderRadius: "5px", paddingBottom: "5px" }}>User Details</h1>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Grid container columnSpacing={10} rowSpacing={3}>
          {/* Row 1: Name and Password */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <TextField
            required
              fullWidth
              label="First Name"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <TextField
            required
              fullWidth
              label="Last Name"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>

          {/* Row 2: Email full width */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <TextField
            required
              fullWidth
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel required>Password</InputLabel>
              <Input
              
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>



          {/* Row 3: Phone full width */}
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
            <TextField
            required
              fullWidth
              label="Phone"
              variant="standard"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>

          {/* Row 4: City full width */}
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
            <TextField
            required
              fullWidth
              label="City"
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>

          {/* Row 4: City full width */}
          <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
            <TextField
              fullWidth
              label="State"
              variant="standard"
              value={state}
              onChange={(e) => setState(e.target.value)}
              sx={{ borderRadius: '12px' }}
            />
          </Grid>

          {/* Row 5: Gender selection */}
          <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <FormControl component="fieldset" >
              <Typography fontWeight={'bold'} textAlign={'center'} variant="subtitle1" mb={1}>
                Gender
              </Typography>
              <RadioGroup
                row
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio icon={<Male />} checkedIcon={<Male />} />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio icon={<Female />} checkedIcon={<Female />} />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio icon={<Transgender />} checkedIcon={<Transgender />} />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>


          {/* Submit Button */}
          <Box sx={{width:'12%' ,display:'flex', justifyContent:'center', margin:"auto"}}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth sx={{ py: "10px", px:"40px", marginTop:"30px"
              }}>
              Next
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}
