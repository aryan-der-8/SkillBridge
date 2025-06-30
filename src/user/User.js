import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  MenuItem,
  Autocomplete,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

export default function User() {
  const signupData = JSON.parse(localStorage.getItem("signUpData"));
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: signupData.email || "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    education: "",
    skills: [],
    experience: "",
    workPreference: "",
    preferredIndustry: "",
    expectedSalary: "",
    availability: "",
    about: "",
    profileImage: null,
  });

  const skillsOptions = [
    "Communication",
    "Leadership",
    "React",
    "Tailwind CSS",
    "Marketing",
    "Sales",
    "UI/UX",
    "Data Entry",
    "Project Management",
    "Business Analysis",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    setUserData({
      ...userData,
      ...formData,
    });

    navigate("/userInterest");
  };

  return (
    <Box sx={{ background: "#f5f7fa", py: 4, minHeight: "100vh" }}>
      <Paper
        elevation={6}
        sx={{
          maxWidth: 900,
          margin: "0 auto",
          p: 4,
          borderRadius: "20px",
          background: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "gray",
            textAlign: "center",
          }}
        >
          Complete <span style={{color:"#333", fontWeight:'bold'}}>{signupData.email}</span> Your Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* firstName + lastName */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="First Name"
                name="firstName"
                required
                variant="outlined"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* email */}
            <Grid size={{xs:12}}>
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* phone + age */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Phone"
                name="phone"
                required
                type="tel"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Age"
                name="age"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.age}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* gender + location */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                select
                label="Gender"
                name="gender"
                variant="outlined"
                fullWidth
                value={formData.gender}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">Prefer not to say</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* education + experience */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Education / University "
                name="education"
                variant="outlined"
                fullWidth
                value={formData.education}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Experience (e.g. 2 years)"
                name="experience"
                variant="outlined"
                fullWidth
                value={formData.experience}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* skills */}
            <Grid size={{xs:12}}>
              <Autocomplete
                multiple
                freeSolo
                options={skillsOptions}
                value={formData.skills}
                onChange={(e, newValue) =>
                  setFormData((prev) => ({ ...prev, skills: newValue }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Skills"
                    placeholder="Add skills"
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                    required
                  />
                )}
              />
            </Grid>

            {/* work preference + preferred industry */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Work Preference"
                name="workPreference"
                placeholder="On-site, Remote, Hybrid"
                variant="outlined"
                fullWidth
                value={formData.workPreference}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Preferred Industry"
                name="preferredIndustry"
                placeholder="e.g. IT, Marketing, Construction"
                variant="outlined"
                fullWidth
                value={formData.preferredIndustry}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* expected salary + availability */}
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Expected Salary"
                name="expectedSalary"
                placeholder="e.g. 25000/month"
                variant="outlined"
                fullWidth
                value={formData.expectedSalary}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6}}>
              <TextField
                label="Availability"
                name="availability"
                placeholder="Immediately, 1 week, 1 month"
                variant="outlined"
                fullWidth
                value={formData.availability}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* about */}
            <Grid size={{xs:12}}>
              <TextField
                name="about"
                label="About You"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={formData.about}
                onChange={handleChange}
                sx={{ borderRadius: 2 }}
              />
            </Grid>

            {/* profile image upload */}
            <Grid size={{xs:12, sm:6}}>
              <Button variant="contained" component="label" sx={{ borderRadius: 2 }}>
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {formData.profileImage && (
                <Avatar
                  src={URL.createObjectURL(formData.profileImage)}
                  sx={{ mt: 2, width: 64, height: 64 }}
                />
              )}
            </Grid>

            {/* submit */}
            <Grid size={{xs:12}}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  textTransform: "none",
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
