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
} from "@mui/icons-material"
import JobDetailsDialog from "./JobDetailsDialog"
import { UserContext } from "../context/UserContext"

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
    localStorage.setItem("appliedBusinesses", JSON.stringify(updatedApplications))

    // Update state
    setAppliedBusinesses(updatedApplications)
    setBusinesses((prev) => [...prev]);

    // mark this button as disabled
    setSelectedCardIndex((prev) => [...prev, index]);

    alert(`Application submitted successfully to ${businessToApply.jobTitle}!`)
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

  return (
    <Box
      sx={{ minHeight: "100vh", paddingTop: "10px", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
    >
      {/* Header */}
      <Button
        onClick={handleMenuOpen}
        sx={{ display: "flex", alignItems: "center", gap: 1, textTransform: "none", marginLeft: "30px" }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}> {signUpData?.email ? signUpData.email[0].toUpperCase() : "U"}</Avatar>
        <Typography sx={{ display: { xs: "none", md: "block" } }}>{signUpData.email}</Typography>
      </Button>

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
            <Grid item xs={12} sm={4}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {businesses.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Available Opportunities
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {appliedBusinesses.filter((app) => app.userEmail === signUpData.email).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Applications Sent
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {Math.floor(appliedBusinesses.filter((app) => app.userEmail === signUpData.email).length * 0.3)}
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
            <Grid item xs={12} md={10}>
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
            <Grid item xs={12} md={2}>
              <Button variant="outlined" fullWidth startIcon={<FilterIcon />} sx={{ height: "56px", bgcolor: "white" }}>
                Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Business Opportunities Grid */}
        {filteredBusinesses.length > 0 ? (
          <Grid container spacing={2}>
            {filteredBusinesses.map((business, index) => {
              // Check if THIS specific business is applied by current user
              const isApplied = isBusinessApplied(business)
              const isOwnBusiness = business.email === signUpData.email
              const rating = getRandomRating()

              return (
                <Grid container size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                  <Card
                    onClick={() => setSelectedCardIndex(index)}
                    sx={{
                      height: "100%",
                      width: "300px",
                      display: "flex",
                      margin: "0 auto",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Header */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              fontWeight: "bold",
                            }}
                          >
                            {getInitials(business.jobTitle || "Business")}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
                              {business.jobTitle || "Unnamed Business"}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <UserIcon sx={{ fontSize: 14, color: "#666" }} />
                              <Typography variant="body2" color="text.secondary">
                                {business.ownerName || "Business Owner"}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Chip
                          icon={<StarIcon sx={{ fontSize: 14, color: "#ffc107" }} />}
                          label={rating}
                          size="small"
                          variant="outlined"
                        />
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
                        }}
                      >
                        {business.description ||
                          "Exciting business opportunity to gain valuable experience and grow your professional skills."}
                      </Typography>

                      {/* Details */}
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BusinessIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.jobCategory || "Various Industries"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.location || "Location Flexible"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ClockIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.duration || "3-6 months"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <UsersIcon sx={{ fontSize: 16, color: "#666" }} />
                          <Typography variant="body2" color="text.secondary">
                            {business.openings || Math.floor(Math.random() * 8) + 2} positions available
                          </Typography>
                        </Box>
                      </Box>

                      {/* Status Chips */}
                      <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {isApplied && (
                          <Chip
                            label="✓ Applied"
                            size="small"
                            sx={{ bgcolor: "#e8f5e8", color: "#2e7d32", fontWeight: "bold" }}
                          />
                        )}
                        {isOwnBusiness && (
                          <Chip
                            label="Your Business"
                            size="small"
                            sx={{ bgcolor: "#e3f2fd", color: "#1976d2", fontWeight: "bold" }}
                          />
                        )}
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color={isApplied ? "inherit" : "success"}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApply(business, index)
                        }}

                        disabled={appliedBusinesses.some(app => app.idx === index && app.userEmail === signUpData.email) || isOwnBusiness}
                        endIcon={!isApplied && !isOwnBusiness ? <ChevronRightIcon /> : null}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:disabled": {
                            opacity: 0.6,
                            backgroundColor: isApplied ? "#e8f5e8" : "#f5f5f5",
                            color: isApplied ? "#2e7d32" : "#666",
                          },
                        }}
                      >
                        {isApplied ? "Applied ✓" : isOwnBusiness ? "Your Business" : "Apply Now"}
                      </Button>

                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleJobDetailsClick(business)
                        }}
                        sx={{
                          textTransform: "none",
                          width: "252px",
                          fontWeight: "bold",
                          ml: 1,
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#115293" },
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
