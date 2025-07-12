"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Stack,
  IconButton,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Chip,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material"
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Link as LinkIcon,
  EmojiEvents as AchievementIcon,
  Timeline as TimelineIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material"

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
)

const EditProfileDialog = ({ open, handleClose, user, onSave }) => {
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    education: "",
    jobTitle: "",
    company: "",
    location: "",
    about: "",
    profileImage: "",
    isVerified: false,
    skillCategories: {},
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    achievements: [],
    careerJourney: [],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        skillCategories: user.skillCategories || {},
        achievements: user.achievements || [],
        careerJourney: user?.careerJourney || [],
        socialLinks: {
          github: user?.socialLinks?.github || "",
          linkedin: user?.socialLinks?.linkedin || "",
          twitter: user?.socialLinks?.twitter || "",
          website: user?.socialLinks?.website || "",
        },
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes("socialLinks.")) {
      const key = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSkillChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      skillCategories: {
        ...prev.skillCategories,
        [category]: {
          ...prev.skillCategories[category],
          [field]: field === "skills" ? value.split(",").map((s) => s.trim()) : value,
        },
      },
    }))
  }

  const handleRenameCategory = (oldKey, newKey) => {
    const updated = { ...formData.skillCategories }
    updated[newKey] = updated[oldKey]
    delete updated[oldKey]
    setFormData((prev) => ({
      ...prev,
      skillCategories: updated,
    }))
  }

  const handleRemoveCategory = (key) => {
    const updated = { ...formData.skillCategories }
    delete updated[key]
    setFormData((prev) => ({
      ...prev,
      skillCategories: updated,
    }))
  }

  const handleAddCategory = () => {
    const newCategory = `Category ${Object.keys(formData.skillCategories || {}).length + 1}`
    setFormData((prev) => ({
      ...prev,
      skillCategories: {
        ...prev.skillCategories,
        [newCategory]: { skills: [], level: 50 },
      },
    }))
  }

  const handleAchievementChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...(prev.achievements || [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, achievements: updated }
    })
  }

  const handleAddAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), { title: "", date: "", icon: "", color: "#1976d2" }],
    }))
  }

  const handleRemoveAchievement = (index) => {
    setFormData((prev) => {
      const updated = [...(prev.achievements || [])]
      updated.splice(index, 1)
      return { ...prev, achievements: updated }
    })
  }

  const handleCareerChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...(prev.careerJourney || [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, careerJourney: updated }
    })
  }

  const handleAddCareer = () => {
    setFormData((prev) => ({
      ...prev,
      careerJourney: [...(prev.careerJourney || []), { title: "", company: "", year: "", type: "work" }],
    }))
  }

  const handleRemoveCareer = (index) => {
    setFormData((prev) => {
      const updated = [...(prev.careerJourney || [])]
      updated.splice(index, 1)
      return { ...prev, careerJourney: updated }
    })
  }

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in First Name, Last Name, and Email.")
      return
    }
    onSave(formData)
    localStorage.setItem("userLoginData", JSON.stringify(formData))
    handleClose()
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const fileInputRef = useRef();

  const handleAvtarClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EditIcon />
          <Typography variant="h6">Edit Profile</Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "grey.50" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ px: 2 }}>
          <Tab icon={<PersonIcon />} label="Basic Info" />
          <Tab icon={<WorkIcon />} label="Skills" />
          <Tab icon={<LinkIcon />} label="Social Links" />
          <Tab icon={<AchievementIcon />} label="Achievements" />
          <Tab icon={<TimelineIcon />} label="Career Journey" />
        </Tabs>
      </Box>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Basic Information Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <PersonIcon color="primary" />
              Personal Information
            </Typography>

            <Grid container spacing={3}>
              {/* Profile Image Preview */}
              {formData.profileImage && (
                <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Tooltip title="set profile pic">
                  <Avatar 
                    src={formData.profileImage}
                    sx={{
                      width: 100,
                      height: 100,
                      border: "3px solid white",
                      boxShadow: 3,
                      cursor: "pointer",
                      transition: "0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                    onClick={handleAvtarClick} />
                    </Tooltip>
                </Grid>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="About Me"
                  name="about"
                  multiline
                  rows={4}
                  value={formData.about || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="Tell us about yourself..."
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Profile Image URL"
                  name="profileImage"
                  value={formData.profileImage || ""}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Skills Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WorkIcon color="primary" />
                Skills & Expertise
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCategory} size="small">
                Add Skill Category
              </Button>
            </Box>

            {Object.keys(formData.skillCategories || {}).length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
                <WorkIcon sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No skills added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add your skills and expertise to showcase your abilities
                </Typography>
                <Button variant="outlined" onClick={handleAddCategory}>
                  Add Your First Skill Category
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {Object.entries(formData.skillCategories || {}).map(([category, data], index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={3}>
                          <TextField
                            label="Category Name"
                            value={category}
                            onChange={(e) => handleRenameCategory(category, e.target.value)}
                            variant="outlined"
                            size="small"
                          />

                          <Box>
                            <Typography gutterBottom>Proficiency Level: {data.level}%</Typography>
                            <Slider
                              value={data.level || 50}
                              onChange={(e, value) => handleSkillChange(category, "level", value)}
                              valueLabelDisplay="auto"
                              step={10}
                              marks
                              min={0}
                              max={100}
                            />
                          </Box>

                          <TextField
                            label="Skills (comma-separated)"
                            value={(data.skills || []).join(", ")}
                            onChange={(e) => handleSkillChange(category, "skills", e.target.value)}
                            variant="outlined"
                            multiline
                            rows={2}
                            placeholder="React, JavaScript, Node.js, Python..."
                          />

                          {data.skills && data.skills.length > 0 && (
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Skills Preview:
                              </Typography>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {data.skills.map((skill, i) => (
                                  <Chip key={i} label={skill} size="small" />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveCategory(category)}
                        >
                          Remove Category
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>

        {/* Social Links Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <LinkIcon color="primary" />
              Social Links
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(formData.socialLinks).map(([key, value], i) => (
                <Grid size={{ xs: 12, md: 6 }} key={i}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={`socialLinks.${key}`}
                    value={value}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder={`Your ${key} profile URL`}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        {/* Achievements Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AchievementIcon color="primary" />
                Achievements
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddAchievement} size="small">
                Add Achievement
              </Button>
            </Box>

            {formData.achievements.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
                <AchievementIcon sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No achievements added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add your certifications, awards, and accomplishments
                </Typography>
                <Button variant="outlined" onClick={handleAddAchievement}>
                  Add Your First Achievement
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {formData.achievements.map((ach, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={2}>
                          <TextField
                            fullWidth
                            label="Achievement Title"
                            value={ach.title}
                            onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                            variant="outlined"
                            size="small"
                          />
                          <TextField
                            fullWidth
                            label="Date"
                            value={ach.date}
                            onChange={(e) => handleAchievementChange(index, "date", e.target.value)}
                            variant="outlined"
                            size="small"
                            placeholder="e.g., March 2024"
                          />
                          <TextField
                            fullWidth
                            label="Icon Name"
                            value={ach.icon}
                            onChange={(e) => handleAchievementChange(index, "icon", e.target.value)}
                            variant="outlined"
                            size="small"
                            placeholder="e.g., trophy, certificate"
                          />
                          <Box>
                            <Typography variant="body2" gutterBottom>
                              Color Theme
                            </Typography>
                            <TextField
                              type="color"
                              value={ach.color}
                              onChange={(e) => handleAchievementChange(index, "color", e.target.value)}
                              size="small"
                              sx={{ width: 60 }}
                            />
                          </Box>
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveAchievement(index)}
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>

        {/* Career Journey Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ px: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TimelineIcon color="primary" />
                Career Journey
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCareer} size="small">
                Add Entry
              </Button>
            </Box>

            {formData.careerJourney.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center", bgcolor: "grey.50" }}>
                <TimelineIcon sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No career entries added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add your work experience and education history
                </Typography>
                <Button variant="outlined" onClick={handleAddCareer}>
                  Add Your First Entry
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {formData.careerJourney.map((item, index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              fullWidth
                              label="Title/Position"
                              value={item.title}
                              onChange={(e) => handleCareerChange(index, "title", e.target.value)}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              fullWidth
                              label="Company/Institute"
                              value={item.company}
                              onChange={(e) => handleCareerChange(index, "company", e.target.value)}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                              fullWidth
                              label="Year"
                              value={item.year}
                              onChange={(e) => handleCareerChange(index, "year", e.target.value)}
                              variant="outlined"
                              size="small"
                              placeholder="e.g., 2020-2023"
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth size="small">
                              <InputLabel>Type</InputLabel>
                              <Select
                                value={item.type}
                                label="Type"
                                onChange={(e) => handleCareerChange(index, "type", e.target.value)}
                              >
                                <MenuItem value="work">Work Experience</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveCareer(index)}
                        >
                          Remove Entry
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: "grey.50" }}>
        <Button variant="outlined" onClick={handleClose} size="large">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} size="large">
          Save Profile
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditProfileDialog
