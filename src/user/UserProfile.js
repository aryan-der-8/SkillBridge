"use client"
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
  Stack,
  Container,
  useTheme,
  alpha,
  Fab,
  Tooltip,
  CircularProgress,
} from "@mui/material"
import {
  LocationOn,
  Email,
  Phone,
  CalendarToday,
  School,
  Work,
  EmojiEvents,
  Star,
  People,
  Edit,
  Share,
  Message,
  GitHub,
  LinkedIn,
  Twitter,
  Language,
  Verified,
  TrendingUp,
  Code,
  Psychology,
  CloudUpload,
  Add,
  Download,
  Favorite,
  Visibility,
} from "@mui/icons-material"

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import { useContext, useEffect, useState } from "react"
import EditProfileDialog from "./EditProfileDialog";
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router"

const UserProfile = () => {
  const theme = useTheme()
  const [editOpen, setEditOpen] = useState(false);
  const { userData, setUserData } = useContext(UserContext)
  const navigate = useNavigate();

  // Mock user data
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleProfileSave = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem("userLoginData", JSON.stringify(updatedData));
  };;
  const user = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: `+91 ${userData.phone}`,
    age: userData.age,
    gender: userData.gender,
    location: userData.location,
    education: userData.education,
    about:
      userData.about,
    skills: [
      userData?.interest?.map((item) => item) || "Problem Solving"
    ],
    experience: `${userData.experience} years`,
    jobTitle: `Lead ${Array.isArray(userData?.interest) && userData.interest.length > 0 ? userData.interest[0] : "Developer"}`,
    company: "InnovateTech Solutions",
    profileImage: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=300&width=1200",
    isVerified: true,
    socialLinks: {
      github: userData.socialLinks.github || '',
      linkedin: userData.socialLinks.linkedin || '',
      twitter: userData.socialLinks.twitter || '',
      website: userData.socialLinks.website || '',
    },
  }

  const iconMap = {
    CloudUpload,
    Code,
    EmojiEvents,
    GitHub,
    Star,
    People,
    Work,
    Default: EmojiEvents,
  };

  const skillCategories = Object.entries(userData?.skillCategories || {}).map(([category, data]) => ({
    category,
    skills: data.skills || [],
    level: data.level || 0,
  }));

  const achievements = (userData.achievements || []).map((ach) => ({
    ...ach,
    icon: iconMap[ach.icon] || iconMap.Default,
  }));

  const stats = [
    { label: "Projects", value: "52", icon: Work, color: "#1976d2" },
    { label: "Mentees", value: "28", icon: People, color: "#388e3c" },
    { label: "Certificates", value: "12", icon: EmojiEvents, color: "#f57c00" },
    { label: "GitHub Stars", value: "1.2k", icon: Star, color: "#e91e63" },
  ]

  const timelineData = (userData.careerJourney || []).map((career) => ({
    ...career,
  }));

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url(/placeholder.svg?height=300&width=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ pt: 4, pb: 8, position: "relative", zIndex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={4}>
              <Box />
              <Stack direction="row" spacing={1}>
                <Tooltip title="Share Profile">
                  <IconButton
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      "&:hover": { bgcolor: alpha("#fff", 0.3) },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Profile">
                  <IconButton
                    onClick={handleEditOpen}
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      "&:hover": { bgcolor: alpha("#fff", 0.3) },
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Go Back">
                  <Button
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      "&:hover": { bgcolor: alpha("#fff", 0.3) },
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>

            <EditProfileDialog
              open={editOpen}
              handleClose={handleEditClose}
              user={userData}
              onSave={handleProfileSave}
            />

            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={user.profileImage}
                      sx={{
                        width: 180,
                        height: 180,
                        border: "6px solid white",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        fontSize: "4rem",
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Avatar>
                    {user.isVerified && (
                      <Verified
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          color: "#1976d2",
                          bgcolor: "white",
                          borderRadius: "50%",
                          fontSize: 32,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ color: "white", textAlign: { xs: "center", md: "left" } }}>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="h5" sx={{ opacity: 0.9, mb: 2 }}>
                    {user.jobTitle}
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent={{ xs: "center", md: "flex-start" }} mb={2}>
                    <Chip icon={<Work />} label={user.company} sx={{ bgcolor: alpha("#fff", 0.2), color: "white" }} />
                    <Chip
                      icon={<LocationOn />}
                      label={user.location}
                      sx={{ bgcolor: alpha("#fff", 0.2), color: "white" }}
                    />
                  </Stack>
                  <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 500 }}>
                    {user.about}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Stack spacing={2} alignItems="center">
                  <Button
                    onClick={() => navigate('/chat')}
                    variant="contained"
                    size="large"
                    startIcon={<Message />}
                    fullWidth
                    sx={{
                      bgcolor: "white",
                      color: theme.palette.primary.main,
                      "&:hover": { bgcolor: alpha("#fff", 0.9) },
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Add />}
                    fullWidth
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": { borderColor: "white", bgcolor: alpha("#fff", 0.1) },
                    }}
                  >
                    Connect
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, lg: 8 }}>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Grid size={{ xs: 6, md: 3 }} key={index}>
                    <Card
                      sx={{
                        textAlign: "center",
                        background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                        border: `1px solid ${stat.color}30`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 12px 24px ${stat.color}20`,
                        },
                      }}
                    >
                      <CardContent sx={{ py: 3 }}>
                        <IconComponent sx={{ fontSize: 48, color: stat.color, mb: 1 }} />
                        <Typography variant="h4" fontWeight="bold" color={stat.color}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>

            {/* Skills Section */}
            <Card sx={{ mb: 4, overflow: "visible" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Psychology color="primary" />
                  Skills & Expertise
                </Typography>

                {skillCategories.length > 0 && (
                  <Grid container spacing={3}>
                    {skillCategories.map((categoryItem, index) => (
                      <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            borderRadius: 3,
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {categoryItem.category}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Stack direction="row" justifyContent="space-between" mb={1}>
                              <Typography variant="body2">Proficiency</Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {categoryItem.level}%
                              </Typography>
                            </Stack>

                            <Box sx={{ position: "relative" }}>
                              <CircularProgress
                                variant="determinate"
                                value={100}
                                size={60}
                                thickness={4}
                                sx={{ color: alpha(theme.palette.primary.main, 0.1) }}
                              />
                              <CircularProgress
                                variant="determinate"
                                value={categoryItem.level}
                                size={60}
                                thickness={4}
                                sx={{
                                  position: "absolute",
                                  left: 0,
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  right: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography variant="caption" fontWeight="bold">
                                  {categoryItem.level}%
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {categoryItem.skills.map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill}
                                size="small"
                                sx={{
                                  bgcolor: theme.palette.primary.main,
                                  color: "white",
                                  "&:hover": { bgcolor: theme.palette.primary.dark },
                                }}
                              />
                            ))}
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>

            {/* Experience Timeline */}
            <Card sx={{ mb: 4, overflow: "visible" }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Psychology color="primary" />
                  Career journey
                </Typography>
                <Timeline>
                  {timelineData.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Fresher — No career journey added yet.
                    </Typography>
                  ) : (
                    timelineData.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            color={item.type === "work" ? "primary" : "secondary"}
                            sx={{ p: 1 }}
                          >
                            {item.type === "work" ? <Work /> : <School />}
                          </TimelineDot>
                          {index < timelineData.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: "12px", px: 2 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.company} • {item.year}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  )}
                </Timeline>
              </CardContent>
            </Card>

          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* Contact Card */}
            <Card sx={{ mb: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Email sx={{ opacity: 0.8 }} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Phone sx={{ opacity: 0.8 }} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CalendarToday sx={{ opacity: 0.8 }} />
                    <Typography variant="body2">{user.age} years old</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <School sx={{ opacity: 0.8 }} />
                    <Typography variant="body2">{user.education}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Social Links
                </Typography>
                <Stack spacing={1}>
                  {[
                    { icon: GitHub, label: "GitHub", url: user.socialLinks.github, color: "#333" },
                    { icon: LinkedIn, label: "LinkedIn", url: user.socialLinks.linkedin, color: "#0077B5" },
                    { icon: Twitter, label: "Twitter", url: user.socialLinks.twitter, color: "#1DA1F2" },
                    { icon: Language, label: "Portfolio", url: user.socialLinks.website, color: "#4CAF50" },
                  ]
                    .filter((social) => social.url) // 👈 only show if the link is available
                    .map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <Button
                          key={index}
                          href={social.url}
                          target="_blank"
                          startIcon={<IconComponent />}
                          fullWidth
                          sx={{
                            justifyContent: "flex-start",
                            color: social.color,
                            textTransform: "none",
                            "&:hover": { bgcolor: alpha(social.color, 0.1) },
                          }}
                        >
                          {social.label}
                        </Button>
                      );
                    })}
                </Stack>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Achievements
                </Typography>

                {achievements.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No achievements added yet.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <Paper
                          key={index}
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            bgcolor: `${achievement.color}20`,
                            border: `1px solid ${achievement.color}40`,
                          }}
                        >
                          <IconComponent sx={{ color: achievement.color, fontSize: 28 }} />
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {achievement.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {achievement.date}
                            </Typography>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Stack>
                )}
              </CardContent>
            </Card>


            {/* Activity Stats */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Activity Overview
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Profile Views</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        2,847
                      </Typography>
                    </Stack>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Visibility fontSize="small" color="primary" />
                      <Typography variant="caption" color="text.secondary">
                        +12% this week
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Connections</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        456
                      </Typography>
                    </Stack>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <People fontSize="small" color="success" />
                      <Typography variant="caption" color="text.secondary">
                        +8 new this month
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">Endorsements</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        127
                      </Typography>
                    </Stack>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Favorite fontSize="small" color="error" />
                      <Typography variant="caption" color="text.secondary">
                        Highly rated
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Download />
      </Fab>
    </Box>

  )
}

export default UserProfile
