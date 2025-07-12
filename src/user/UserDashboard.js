"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Avatar,
  Chip,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material"
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Schedule as ClockIcon,
  People as UsersIcon,
  Star as StarIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as UserIcon,
  ChevronRight as ChevronRightIcon,
  Message as MessageIcon,
} from "@mui/icons-material"
import JobDetailsDialog from "./JobDetailsDialog"
import { UserContext } from "../context/UserContext"
import ChatIcon from "@mui/icons-material/Chat";


const UserDashboard = () => {
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [signUpData, setSignUpData] = useState("")
  const [appliedBusinesses, setAppliedBusinesses] = useState([])
  const [, setAnchorEl] = useState(null)
  const [selectedCardIndex, setSelectedCardIndex] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [acceptedApplications, setAcceptedApplications] = useState({});
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("signUpData") || "{}")

    if (!userData || userData.userType !== "user") {
      navigate("/signup")
      return
    }
    setSignUpData(userData)

    const businessData = JSON.parse(localStorage.getItem("businessData") || "[]")
    setBusinesses(businessData)

    const appliedData = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")
    setAppliedBusinesses(appliedData)

  }, [navigate])

  const goChat = () => {
    navigate('/chat')
  }

  const handleApply = (businessToApply, index) => {
    if (!signUpData || !signUpData.email) {
      alert("Please log in to apply for jobs.")
      return
    }

    // Create unique business identifier for THIS specific business
    const businessId = `${businessToApply.jobTitle}_${businessToApply.ownerName}`

    // Get current applications from localStorage (fresh data)
    const currentApplications = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")

    // Check if user has already applied to THIS specific business
    const alreadyApplied = currentApplications.some(
      (entry) => entry.businessId === businessId && entry.userEmail === signUpData.email,
    )

    console.log("Already applied?", alreadyApplied)

    if (alreadyApplied) {
      alert("You have already applied to this business.")
      return
    }

    // Check if it's user's own business
    if (businessToApply.email === signUpData.email) {
      alert("You cannot apply to your own business.")
      return
    }

    // Create new application entry for ONLY this specific business
    const newApplication = {
      idx: index,
      businessId: businessId,
      userEmail: signUpData.email,
      appliedDate: new Date().toISOString(),
      jobTitle: businessToApply.jobTitle,
      about: userData.about,
      age: userData.age,
      availability: userData.availability,
      education: userData.education,
      expectedSalary: userData.expectedSalary,
      experience: userData.experience,
      userName: `${userData.firstName} ${userData.lastName}`,
      gender: userData.gender,
      interest: userData.interest,
      location: userData.location,
      phone: userData.phone,
      preferredIndustry: userData.preferredIndustry,
      workPreference: userData.workPreference,
    }
    // Add ONLY this new application to the existing list
    const updatedApplications = [...currentApplications, newApplication]

    // Save to localStorage
    if (window.confirm(`Application submitted successfully to ${businessToApply.jobTitle}!`)) {
      localStorage.setItem("appliedBusinesses", JSON.stringify(updatedApplications))
      // Update state
      setAppliedBusinesses(updatedApplications)
      setBusinesses((prev) => [...prev]);

      // mark this button as disabled
      setSelectedCardIndex((selectedCardIndex) => [...selectedCardIndex, index]);
    }
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleJobDetailsClick = (business) => {
    setSelectedBusiness(business)
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setTimeout(() => {
      setSelectedBusiness(null)
    }, 300)
  }

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Generate initials for avatar
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "B"
    )
  }

  // Generate random rating for businesses
  const getRandomRating = () => {
    return (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)
  }

  // Check if current user has applied to a specific business
  const isBusinessApplied = (business) => {
    const businessId = `${business.jobTitle}_${business.ownerName}`
    return appliedBusinesses.some((entry) => entry.businessId === businessId && entry.userEmail === signUpData.email)
  }

  useEffect(() => {
    const appliedStatus = JSON.parse(localStorage.getItem("applicationStatuses") || "{}");
    console.log(appliedStatus);
    setAcceptedApplications(appliedStatus);
  }, [appliedBusinesses, signUpData])

  return (
    <Box
      sx={{ minHeight: "100vh", paddingTop: "10px", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Button variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: "30px", gap: 10 }}>
          <Box onClick={() => navigate("/user/profile")}
            sx={{ display: "flex", alignItems: "center", gap: 1, textTransform: "none" }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}> {signUpData?.email ? signUpData.email[0].toUpperCase() : "U"}</Avatar>
            <Typography sx={{ display: { xs: "none", md: "block" } }}>{signUpData.email}</Typography>
          </Box>
        </Button>

        <Button variant="outlined" onClick={goChat} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '30px', gap: 10 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: '5px', textTransform: "none" }}>
            <ChatIcon />
            <Typography sx={{ display: { xs: "none", md: "block" } }}>Chat</Typography>
          </Box>
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Paper
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 4,
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Welcome back, {signUpData.email?.split("@")[0]}! 👋
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Discover amazing business experience opportunities and kickstart your career journey.
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {businesses.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Available Opportunities
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {appliedBusinesses.filter((app) => app.userEmail === signUpData.email).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Applications Sent
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {Object.entries(acceptedApplications || {}).filter(
                    ([key, value]) =>
                      key.endsWith(userData.email)
                  ).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Responses Received
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 10 }}>
              <TextField
                fullWidth
                placeholder="Search by company name, owner, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button variant="outlined" fullWidth startIcon={<FilterIcon />} sx={{ height: "56px", bgcolor: "white" }}>
                Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Business Opportunities Grid */}
        {filteredBusinesses.length > 0 ? (
          <Grid container spacing={3} sx={{ p: 2 }}>
            {filteredBusinesses.map((business, index) => {
              // Check if THIS specific business is applied by current user
              const isApplied = isBusinessApplied(business)
              const isOwnBusiness = business.email === signUpData.email
              const ApKey = `${business.jobTitle}_${business.ownerName}_${signUpData.email}`
              const appStatus = acceptedApplications[ApKey];

              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                  <Card
                    onClick={() => setSelectedCardIndex(index)}
                    sx={{
                      height: "100%",
                      maxWidth: 400,
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Header */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                            }}
                          >
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                color: "#1a1a1a",
                                fontSize: "1.1rem",
                                lineHeight: 1.2,
                              }}
                            >
                              {business.jobTitle || "Unnamed Business"}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                              <UserIcon sx={{ fontSize: 14, color: "#666" }} />
                              <Typography variant="body2" color="text.secondary">
                                {business.ownerName || "Business Owner"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.5,
                        }}
                      >
                        {business.description ||
                          "Exciting business opportunity to gain valuable experience and grow your professional skills."}
                      </Typography>

                      {/* Details */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BusinessIcon sx={{ fontSize: 18, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.jobCategory || "Various Industries"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 18, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.location || "Location Flexible"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ClockIcon sx={{ fontSize: 18, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.duration || "3-6 months"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <UsersIcon sx={{ fontSize: 18, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.openings || Math.floor(Math.random() * 8) + 2} positions available
                          </Typography>
                        </Box>
                      </Box>

                      {/* Status Chips */}
                      <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {appStatus === "accepted" && (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              width: "100%",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#2e7d32",
                                fontWeight: "bold",
                                textAlign: "center",
                                bgcolor: "#e8f5e8",
                                py: 1,
                                px: 2,
                                borderRadius: 1,
                              }}
                            >
                              🎉 Your Application was Accepted!
                            </Typography>
                          </Box>
                        )}
                        {isApplied && (
                          appStatus === "accepted" || appStatus === "rejected" ? ''
                            :
                            <Chip
                              label="✓ Applied"
                              size="small"
                              sx={{
                                bgcolor: "#e8f5e8",
                                color: "#2e7d32",
                                fontWeight: "bold",
                              }}
                            />
                        )}
                        {isOwnBusiness && (
                          <Chip
                            label="Your Business"
                            size="small"
                            sx={{
                              bgcolor: "#e3f2fd",
                              color: "#1976d2",
                              fontWeight: "bold",
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2, gap: 1 }}>

                      {appStatus === "accepted" ? (
                        // Show Message Button when application is accepted
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation()
                            goChat()
                          }}
                          startIcon={<MessageIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            bgcolor: "#1976d2",
                            "&:hover": { bgcolor: "#115293" },
                          }}
                        >
                          Send Message
                        </Button>
                      ) : (
                        // Show Apply Button when not accepted yet
                        <Button
                          fullWidth
                          variant="contained"
                          color={appStatus === "accepted" ? "success" :
                            appStatus === "rejected" ? "error" :
                              isApplied ? "inherit" :
                                "success"}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApply(business, index)
                          }}
                          disabled={
                            appliedBusinesses.some((app) => app.idx === index && app.userEmail === signUpData.email) ||
                            isOwnBusiness
                          }
                          endIcon={!isApplied && !isOwnBusiness ? <ChevronRightIcon /> : null}
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:disabled": {
                              opacity: 0.6,
                              backgroundColor: appStatus === "rejected" ? "#f5e0e0" : "#f5f5f5",
                              color: appStatus === "rejected" ? "#d32f2f" : "#666",
                            },
                          }}
                        >
                          {appStatus === "accepted"
                            ? "Applied ✓"
                            : appStatus === "rejected"
                              ? "Rejected"
                              : isOwnBusiness
                                ? "Your Business"
                                : "Apply Now"}
                        </Button>
                      )}

                      <Button
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleJobDetailsClick(business)
                        }}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          borderColor: "#1976d2",
                          color: "#1976d2",
                          "&:hover": {
                            borderColor: "#115293",
                            color: "#115293",
                            bgcolor: "rgba(25, 118, 210, 0.04)",
                          },
                        }}
                      >
                        Job Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <Paper sx={{ textAlign: "center", py: 8 }}>
            <BusinessIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#666", mb: 1 }}>
              {businesses.length === 0 ? "No business opportunities available" : "No opportunities found"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {businesses.length === 0
                ? "Check back later for new business opportunities or encourage businesses to register on the platform."
                : "Try adjusting your search criteria or check back later for new opportunities."}
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Job Details Dialog */}
      {selectedBusiness && <JobDetailsDialog open={open} setOpen={handleCloseDialog} business={selectedBusiness} />}
    </Box>
  )
}

export default UserDashboard
