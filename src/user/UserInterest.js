import { Box, Button, Card, CardActionArea, CardContent, Checkbox, Container, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

export default function UserInterest() {

    const {setUserIcon} = useContext(UserContext);

    const interestsList = [
        'Web Development',
        'App Development',
        'UI/UX Design',
        'Graphic Design',
        'Marketing',
        'Content Writing',
        'Data Science',
        'Finance',
        'Human Resources',
        'Business Development',
        'Photography',
        'Sales',
    ];

    const [selectedInterests, setSelectedInterests] = useState([]);

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests((prev) => prev.filter((item) => item !== interest));
        } else {
            setSelectedInterests((prev) => [...prev, interest]);
        }
    };

    const naviget = useNavigate();

    const {userData, setUserData} = useContext(UserContext);

    const handleSubmit = () => {
        console.log(userData);
        console.log(selectedInterests);

        setUserData({
            ...userData,
            interest: selectedInterests,
        });
        
        setTimeout(() => {
            naviget('/userDashboard');
            setUserIcon(true);
        }, 400);
    };


    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Select Your Area(s) of Interest
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
                You can select multiple interests.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {interestsList.map((interest, index) => (
                    <Grid size={{xs:12, sm:6, md:4}}  key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderColor: selectedInterests.includes(interest)
                                    ? 'primary.main'
                                    : 'grey.300',
                                borderWidth: 2,
                                borderRadius: 2,
                            }}
                        >
                            <CardActionArea onClick={() => toggleInterest(interest)}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography variant="body1">{interest}</Typography>
                                    <Checkbox
                                        checked={selectedInterests.includes(interest)}
                                        color="primary"
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={selectedInterests.length === 0}
                    onClick={handleSubmit}
                >
                    Create profile
                </Button>
            </Box>
        </Container>
    )
}