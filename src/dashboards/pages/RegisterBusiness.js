import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function RegisterBusiness() {

    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        businessType: '',
        gstNumber: '',
        city: '',
        state: '',
        zip: '',
        website: '',
        address: '',
        about: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { businessName, ownerName, email, phone, businessType, city, address, about } = formData;

        let existingData = [];

        try {
            const stored = localStorage.getItem("businessData");
            existingData = stored ? JSON.parse(stored) : [];
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
        } catch (e) {
            console.error("Error reading from localStorage", e);
            existingData = [];
        }
        console.log(existingData);
        const updateData = [...existingData, formData];

        localStorage.setItem('businessData', JSON.stringify(updateData));

        if(phone.length !== 10) {
            alert("Enter valid phone number");
            return;
        }

        setFormData({
            businessName: '',
            ownerName: '',
            email: '',
            phone: '',
            businessType: '',
            gstNumber: '',
            city: '',
            state: '',
            zip: '',
            website: '',
            address: '',
            about: '',
        });
    };


    return (
        <div>
            <hr />
            <h1 style={{ width: "60%", marginInline: 'auto', backgroundColor: "#1976d2", color: "#fff", borderRadius: "5px", paddingBottom: "5px" }}>Business Registration</h1>

            <form onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 6, xl: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.businessName}
                            onChange={handleChange}
                            name="businessName"
                            id="standard-basic"
                            label="Business Name"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.ownerName}
                            onChange={handleChange}
                            name="ownerName"
                            id="standard-basic"
                            label="Owner Name"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="standard-basic"
                            label="Email"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.phone}
                            onChange={handleChange}
                            type="number"
                            name="phone"
                            id="standard-basic"
                            label="Phone Number"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.businessType}
                            onChange={handleChange}
                            name="businessType"
                            id="standard-basic"
                            label="Business Type"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            sx={{ width: "100%", }}
                            value={formData.gstNumber}
                            onChange={handleChange}
                            name="gstNumber"
                            id="standard-basic"
                            label="GST Number (optional)"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            required
                            sx={{ width: "100%", }}
                            value={formData.city}
                            onChange={handleChange}
                            name="city"
                            id="standard-basic"
                            label="City"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            sx={{ width: "100%", }}
                            value={formData.state}
                            onChange={handleChange}
                            name="state"
                            id="standard-basic"
                            label="State"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            sx={{ width: "100%", }}
                            value={formData.zip}
                            onChange={handleChange}
                            name="zip"
                            id="standard-basic"
                            label="Zip Code"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            sx={{ width: "100%", }}
                            value={formData.website}
                            onChange={handleChange}
                            name="website"
                            id="standard-basic"
                            label="Website/Social Link"
                            variant="standard" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField
                            sx={{ width: "100%", }}
                            required
                            name="address"
                            id="standard-basic"
                            label="Business Address"
                            variant="standard"
                            multiline
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ paddingInline: "20px" }}>
                        <TextField sx={{ width: "100%", }}
                            required
                            name="about"
                            id="standard-basic"
                            label="About Your Business"
                            variant="standard"
                            multiline
                            rows={3}
                            value={formData.about}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button variant='outlined' sx={{ mt: "35px", mb: "30px" }} type='submit'>Register Business</Button>
            </form>

        </div>
    )
}