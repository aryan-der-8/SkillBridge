import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Container,
    Grid,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { UserContext } from '../context/UserContext';

const UserDashboard = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const signUpData = JSON.parse(localStorage.getItem('signUpData'));
        if (!signUpData || signUpData.userType !== 'user') {
            navigate('/signup');
            return;
        }
        const data = JSON.parse(localStorage.getItem('businessData')) || [];
        setBusinesses(data);
    }, [navigate]);

   

    const handleApply = (email) => {
        alert(`You applied to ${email}`);
    };

    const signUpData = JSON.parse(localStorage.getItem('signUpData'));

    const businessHandle = () => {
        console.log("click");
    }

    return (
        <Container maxWidth="lg" sx={{ width:"90%" ,margin:"auto"}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
                <Typography variant="subtitle1">Welcome, {signUpData?.email}</Typography>
            </Box>

            <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                Available Business Experience Opportunities:
                <hr/>
            </Typography>

            <Grid container spacing={3} sx={{marginTop:3, cursor:"pointer"}} onClick={businessHandle}>
                {businesses.map((biz, index) => (
                    <Grid size={{xs:12, sm:6, md:4}}  key={index}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <BusinessIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6" component="div">
                                        {biz.businessName || "Unnamed Business"}
                                    </Typography>
                                </Box>
                                <Typography><b>Name:</b> {biz.ownerName}</Typography>
                                <Typography><b>Detail:</b> {biz.about} </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    // disabled={biz.email === signUpData.email}  prevent apply to own business
                                    onClick={() => handleApply(biz.email)}
                                >
                                    Apply
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};


export default UserDashboard;