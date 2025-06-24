"use client"

import { useEffect, useState } from "react"
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
    IconButton,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
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
    Work as BriefcaseIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Notifications as BellIcon,
    Person as UserIcon,
    Logout as LogOutIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"

const UserDashboard = () => {
    const navigate = useNavigate()
    const [businesses, setBusinesses] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [signUpData, setSignUpData] = useState(null)
    const [appliedBusinesses, setAppliedBusinesses] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        // Check user authentication
        const userData = JSON.parse(localStorage.getItem("signUpData") || "{}")
        if (!userData || userData.userType !== "user") {
            navigate("/signup")
            return
        }
        setSignUpData(userData)

        // Load business data from localStorage
        const businessData = JSON.parse(localStorage.getItem("businessData") || "[]")
        setBusinesses(businessData)

        // Load applied businesses from localStorage
        const appliedData = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")
        setAppliedBusinesses(appliedData)
    }, [navigate])

    const handleApply = (business) => {
        // Add to applied businesses
        const newAppliedBusinesses = [...appliedBusinesses, business.email]
        setAppliedBusinesses(newAppliedBusinesses)
        localStorage.setItem("appliedBusinesses", JSON.stringify(newAppliedBusinesses))

        alert(`Application submitted to ${business.businessName}! You'll hear back within 2-3 business days.`)
    }

    const handleLogout = () => {
        localStorage.removeItem("signUpData")
        navigate("/login")
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const filteredBusinesses = businesses.filter(
        (business) =>
            business.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.about?.toLowerCase().includes(searchTerm.toLowerCase()),
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

    if (!signUpData) return null

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            {/* Header */}
            <Button
                onClick={handleMenuOpen}
                sx={{ display: "flex", alignItems: "center", gap: 1, textTransform: "none", marginLeft:"30px", paddingTop: "20px" }}
            >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
                    {signUpData.email?.charAt(0).toUpperCase()}
                </Avatar>
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
                                    {appliedBusinesses.length}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Applications Sent
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    {Math.floor(appliedBusinesses.length * 0.3)}
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
                            const isApplied = appliedBusinesses.includes(business.email)
                            const rating = getRandomRating()

                            return (
                                <Grid container size={{xs:12, sm:6, lg:4}}key={index} >
                                    <Card
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
                                                        {getInitials(business.businessName || "Business")}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1a1a1a" }}>
                                                            {business.businessName || "Unnamed Business"}
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
                                                {business.about ||
                                                    "Exciting business opportunity to gain valuable experience and grow your professional skills."}
                                            </Typography>

                                            {/* Details */}
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <BusinessIcon sx={{ fontSize: 16, color: "#666" }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {business.industry || "Various Industries"}
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
                                                        {business.positions || Math.floor(Math.random() * 8) + 2} positions available
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {isApplied && (
                                                <Chip label="✓ Applied" size="small" sx={{ mt: 2, bgcolor: "#e8f5e8", color: "#2e7d32" }} />
                                            )}
                                        </CardContent>

                                        <Divider />

                                        <CardActions sx={{ p: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={() => handleApply(business)}
                                                disabled={isApplied || business.email === signUpData.email}
                                                endIcon={!isApplied && business.email !== signUpData.email ? <ChevronRightIcon /> : null}
                                                sx={{
                                                    textTransform: "none",
                                                    fontWeight: "bold",
                                                    "&:disabled": { opacity: 0.5 },
                                                }}
                                            >
                                                {isApplied ? "Applied" : business.email === signUpData.email ? "Your Business" : "Apply Now"}
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
        </Box>
    )
}

export default UserDashboard
