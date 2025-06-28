"use client"

import {
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    MenuItem,
    Autocomplete,
    InputAdornment,
    Paper,
    Box,
    Divider,
    Container,
} from "@mui/material"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useState } from "react"

export default function RegisterBusiness() {
    const signupData = JSON.parse(localStorage.getItem("signUpData"))

    const durationOptions = ["1 Month", "2 Months", "3 Months", "6 Months", "1 Year", "2 Years", "Flexible"]

    const skillOptions = [
        "JavaScript",
        "React",
        "Graphic Design",
        "Video Editing",
        "CNC Operating",
        "Painting",
        "Cooking",
        "Housekeeping",
        "Teamwork",
        "Problem Solving",
    ]

    const educationOptions = ["BCA", "BBA", "B.Tech", "Other"]

    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        email: signupData?.email || "",
        phone: "",
        jobCategory: "",
        jobTitle: "",
        jobType: [],
        duration: "",
        location: "",
        workMode: "",
        skillsRequired: [],
        description: "",
        education: [],
        salary: "",
        openings: "",
        applicationDeadline: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Phone number validation
        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Enter a valid 10-digit phone number")
            return
        }

        if (formData.skillsRequired.length === 0) {
            alert("Please add at least one skill");
            return;
        }

        // Store into localStorage
        let existingData = []
        try {
            const stored = localStorage.getItem("businessData")
            existingData = stored ? JSON.parse(stored) : []
            if (!Array.isArray(existingData)) existingData = []
        } catch (e) {
            console.error("Error reading from localStorage", e)
            existingData = []
        }

        const updatedData = [...existingData, formData]
        localStorage.setItem("businessData", JSON.stringify(updatedData))

        alert("Business opportunity registered successfully!")

        // Reset all form fields
        // setFormData({
        //     businessName: "",
        //     ownerName: "",
        //     email: "",
        //     phone: "",
        //     jobCategory: "",
        //     jobTitle: "",
        //     jobType: [],
        //     duration: "",
        //     location: "",
        //     workMode: "",
        //     skillsRequired: [],
        //     description: "",
        //     education: [],
        //     salary: "",
        //     openings: "",
        //     applicationDeadline: "",
        // })
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 1, borderRadius: 3 }}>
                {/* Header */}
                <Box sx={{ textAlign: "center"}}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 1,
                        }}
                    >
                        Business Registration
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Register your business opportunity and connect with talented individuals
                    </Typography>
                </Box>
                    <Divider sx={{ my: 4 }} />

                <form onSubmit={handleSubmit}>
                    {/* Owner Details Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: "primary.main",
                                borderBottom: "2px solid",
                                borderColor: "primary.main",
                                pb: 1,
                                display: "inline-block",
                            }}
                        >
                            Owner Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="businessName"
                                    label="Business Name"
                                    variant="outlined"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="ownerName"
                                    label="Owner Name"
                                    variant="outlined"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    variant="outlined"
                                    value={formData.email}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="phone"
                                    label="Phone Number"
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 10 }}
                                    helperText="Enter 10-digit phone number"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Job Details Section */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: "primary.main",
                                borderBottom: "2px solid",
                                borderColor: "primary.main",
                                pb: 1,
                                display: "inline-block",
                            }}
                        >
                            Job Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="jobCategory"
                                    label="Job Category"
                                    placeholder="Ex - Interior Design, IT"
                                    variant="outlined"
                                    value={formData.jobCategory}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="jobTitle"
                                    label="Job Title"
                                    placeholder="Ex - Graphic Designer Intern"
                                    variant="outlined"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                            mb: 1,
                                        }}
                                    >
                                        Job Type *
                                    </Typography>
                                    <ToggleButtonGroup
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={(e, newTypes) => {
                                            if (newTypes.length) {
                                                setFormData({ ...formData, jobType: newTypes })
                                            }
                                        }}
                                        sx={{
                                            flexWrap: "wrap",
                                            "& .MuiToggleButton-root": {
                                                borderRadius: 2,
                                                mx: 0.5,
                                                my: 0.5,
                                            },
                                        }}
                                        color="primary"
                                        size="medium"
                                        multiple
                                    >
                                        <ToggleButton value="Full-time">Full-time</ToggleButton>
                                        <ToggleButton value="Part-time">Part-time</ToggleButton>
                                        <ToggleButton value="Internship">Internship</ToggleButton>
                                        <ToggleButton value="Project-based">Project-based</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    name="duration"
                                    label="Duration"
                                    variant="outlined"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                >
                                    {durationOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="location"
                                    label="Location"
                                    variant="outlined"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City, State"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                            mb: 1,
                                        }}
                                    >
                                        Work Mode *
                                    </Typography>
                                    <ToggleButtonGroup
                                        name="workMode"
                                        value={formData.workMode}
                                        onChange={(e, newMode) => {
                                            setFormData({ ...formData, workMode: newMode })
                                        }}
                                        sx={{
                                            "& .MuiToggleButton-root": {
                                                borderRadius: 2,
                                                mx: 0.5,
                                            },
                                        }}
                                        color="primary"
                                        size="medium"
                                        exclusive
                                    >
                                        <ToggleButton value="On-Site">On-Site</ToggleButton>
                                        <ToggleButton value="Remote">Remote</ToggleButton>
                                        <ToggleButton value="Hybrid">Hybrid</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={skillOptions}
                                    value={formData.skillsRequired}
                                    onChange={(event, newValue) => {
                                        setFormData({ ...formData, skillsRequired: newValue })
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Skills Required"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="e.g. Graphic Design, Sales, HTML"
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    multiple
                                    freeSolo
                                    options={educationOptions}
                                    value={formData.education}
                                    onChange={(event, newValue) => {
                                        setFormData({ ...formData, education: newValue })
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="education"
                                            label="Education Required"
                                            variant="outlined"
                                            fullWidth
                                            placeholder="e.g. MCA, B.com, MBBS"
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    name="description"
                                    label="Job / Opportunity Description"
                                    variant="outlined"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Explain the type of work, responsibilities, learning experience, and goals."
                                    helperText="Example: You'll assist in creating social media designs, attend weekly team meetings, and learn client handling."
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                    fullWidth
                                    name="salary"
                                    label="Salary / Stipend"
                                    variant="outlined"
                                    type="number"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    placeholder="e.g. 5000"
                                    helperText="Optional"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="openings"
                                    label="Number of Openings"
                                    variant="outlined"
                                    inputProps={{ min: 1 }}
                                    value={formData.openings}
                                    onChange={handleChange}
                                    placeholder="e.g. 2"
                                    helperText="How many people to hire"
                                    required
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    name="applicationDeadline"
                                    label="Application Deadline"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Submit Button */}
                    <Box sx={{ textAlign: "center", mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: 3,
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                                boxShadow: "0 3px 5px 2px rgba(25, 118, 210, .3)",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                                    boxShadow: "0 6px 10px 2px rgba(25, 118, 210, .3)",
                                },
                            }}
                        >
                            Register Business
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
}
