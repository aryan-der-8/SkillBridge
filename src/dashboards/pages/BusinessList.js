import {
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

export default function BusinessList() {

    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('businessData')) || [];
        const signData = JSON.parse(localStorage.getItem("signUpData"))

        const storeInEmail = store.filter((item) => item.email === signData.email);        

        setBusinesses(storeInEmail);
    },[])

    const handleDelete = (index) => {
        const updateList = businesses.filter((_, idx) => idx !== index);
        setBusinesses(updateList);
        localStorage.setItem('businessData', JSON.stringify(updateList));
    };

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" marginBottom={"10px"} gutterBottom>
                Registered Businesses
            </Typography>

            <TableContainer component={Paper} elevation={4}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>No</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Owner</strong></TableCell>
                            <TableCell><strong>City</strong></TableCell>
                            <TableCell><strong>DeadLine</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {businesses.map((b, i) => (
                            <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{b.jobTitle}</TableCell>
                                <TableCell>{b.ownerName}</TableCell>
                                <TableCell>{b.location}</TableCell>
                                <TableCell>{b.applicationDeadline}</TableCell>
                                <TableCell>

                                    <IconButton color="error" onClick={() => handleDelete(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}