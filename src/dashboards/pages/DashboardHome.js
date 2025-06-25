import {
    Box,
    Grid,
    Paper,
    Typography,
} from '@mui/material';

export default function DashboardHome() {

    const businesses = JSON.parse(localStorage.getItem('businessData')) || [];

    const uniqueCities = [...new Set(businesses.map(b => b.city))];
    const uniqueTypes = [...new Set(businesses.map(b => b.businessType))];

    const cardStyle = {
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" mb={6}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={4} sx={{ml:"30px"}}>
                <Grid size={{xs:12, md:4}}>
                    <Paper sx={{ ...cardStyle, backgroundColor: '#bbdefb' }}>
                        <Typography variant="h6">Total Businesses</Typography>
                        <Typography variant="h4">{businesses.length}</Typography>
                    </Paper>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                    <Paper sx={{ ...cardStyle, backgroundColor: '#c8e6c9' }}>
                        <Typography variant="h6">Cities</Typography>
                        <Typography variant="h4">{uniqueCities.length}</Typography>
                    </Paper>
                </Grid>

                <Grid size={{xs:12, md:4}}>
                    <Paper sx={{ ...cardStyle, backgroundColor: '#fff9c4' }}>
                        <Typography variant="h6">Types</Typography>
                        <Typography variant="h4">{uniqueTypes.length}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}