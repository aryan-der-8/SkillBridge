import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    Container,
    Grid,
    TextField,
    Avatar,
    Chip,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    InputAdornment,
    Paper,
    FormControl,
    InputLabel,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import {
    Work as BriefcaseIcon,
    Search as SearchIcon,
    Person as UserIcon,
    Logout as LogOutIcon,
    Email as EmailIcon,
    CalendarToday as CalendarIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Visibility as VisibilityIcon,
    Assignment as AssignmentIcon,
} from "@mui/icons-material"

const JobApplied = () => {
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [businessData, setBusinessData] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedApplication, setSelectedApplication] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(() => {
        // Check business owner authentication
        const userData = JSON.parse(localStorage.getItem("signUpData") || "{}")

        if (!userData || userData.userType !== "business") {
            navigate("/signup")
            return
        }

        setBusinessData(userData)
        loadApplications(userData.email)
    }, [navigate])

    const loadApplications = (businessOwnerEmail) => {
        // Get all businesses owned by this user email
        const allBusinessData = JSON.parse(localStorage.getItem("businessData") || "[]")
        const myBusinesses = allBusinessData.filter(business => business.email === businessOwnerEmail)
        
        console.log("All my businesses:", myBusinesses)

        if (myBusinesses.length === 0) {
            setApplications([])
            return
        }

        // Get all applied businesses from localStorage
        const appliedBusinesses = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")
        console.log("All applied businesses:", appliedBusinesses)

        // Get all business IDs that belong to the current business owner
        const myBusinessIds = myBusinesses.map(business => `${business.businessName}_${business.ownerName}`)
        console.log("My business IDs:", myBusinessIds)

        // Filter applications that are for any of my businesses
        const applicationsForMyBusinesses = appliedBusinesses.filter(app =>
            myBusinessIds.includes(app.businessId)
        )
        console.log("Applications for my businesses:", applicationsForMyBusinesses)

        // Get existing application statuses from localStorage
        const applicationStatuses = JSON.parse(localStorage.getItem("applicationStatuses") || "{}")

        // Generate full application data
        const businessApplications = []
        
        applicationsForMyBusinesses.forEach((app, index) => {
            // Find the business details for this application
            const businessDetails = myBusinesses.find(business => 
                `${business.businessName}_${business.ownerName}` === app.businessId
            )

            if (businessDetails) {
                // Generate unique application ID
                const applicationId = `${app.businessId}_${app.userEmail}`
                
                // Generate applicant name from email (simple approach)
                const applicantName = app.userEmail.split('@')[0].replace('.', ' ').split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

                // Get status from localStorage or default to "pending"
                const status = applicationStatuses[applicationId] || "pending"

                businessApplications.push({
                    id: applicationId,
                    applicantEmail: app.userEmail,
                    applicantName: applicantName,
                    businessName: businessDetails.businessName,
                    businessId: app.businessId,
                    appliedDate: new Date(Date.now()).toISOString(),
                    status: status,
                    coverLetter: `Dear ${businessDetails.ownerName}, I am very interested in joining ${businessDetails.businessName} and believe my skills would be a great fit for your team. I have experience in ${businessDetails.industry || "various fields"} and am excited about the opportunity to contribute to your organization.`,
                    experience: `${Math.floor(Math.random() * 5) + 1} years of relevant experience in ${businessDetails.industry || "the field"}`,
                    skills: ["Communication", "Teamwork", "Problem Solving", "Leadership", "Technical Skills"].slice(
                        0,
                        Math.floor(Math.random() * 3) + 2,
                    ),
                })
            }
        })

        console.log("Generated applications:", businessApplications)
        setApplications(businessApplications)
    }

    const handleStatusChange = (applicationId, newStatus) => {
        // Update applications state
        setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))

        // Save status change to localStorage
        const applicationStatuses = JSON.parse(localStorage.getItem("applicationStatuses") || "{}")
        applicationStatuses[applicationId] = newStatus
        localStorage.setItem("applicationStatuses", JSON.stringify(applicationStatuses))

        // Show confirmation message
        const applicant = applications.find((app) => app.id === applicationId)
        if (applicant) {
            alert(`Application from ${applicant.applicantName} has been ${newStatus}!`)
        }
    }

    const handleViewDetails = (application) => {
        setSelectedApplication(application)
        setDialogOpen(true)
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        localStorage.removeItem("signUpData")
        navigate("/signup")
    }

    const getInitials = (name) => {
        return (
            name
                ?.split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"
        )
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return { bgcolor: "#e8f5e8", color: "#2e7d32" }
            case "rejected":
                return { bgcolor: "#ffebee", color: "#c62828" }
            default:
                return { bgcolor: "#fff3e0", color: "#ef6c00" }
        }
    }

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.businessName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || app.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const pendingCount = applications.filter((app) => app.status === "pending").length
    const acceptedCount = applications.filter((app) => app.status === "accepted").length
    const rejectedCount = applications.filter((app) => app.status === "rejected").length

    if (!businessData) return null

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>{getInitials(businessData.email)}</Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Business Dashboard
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        onClick={handleMenuOpen}
                        sx={{ display: "flex", alignItems: "center", gap: 1, textTransform: "none" }}
                    >
                        <UserIcon />
                        <Typography sx={{ display: { xs: "none", md: "block" } }}>{businessData.email}</Typography>
                    </Button>
                </Toolbar>
            </AppBar>

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
                        Job Applications Dashboard 📋
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                        Manage applications for all your business opportunities and connect with talented candidates.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    {pendingCount}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Pending Review
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    {acceptedCount}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Accepted
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 2, textAlign: "center" }}>
                                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                    {rejectedCount}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Rejected
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Search and Filter */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                placeholder="Search by applicant name, email, or business..."
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
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
                                <InputLabel>Filter by Status</InputLabel>
                                <Select value={statusFilter} label="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
                                    <MenuItem value="all">All Applications</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="accepted">Accepted</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                {/* Applications List */}
                {filteredApplications.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredApplications.map((application) => (
                            <Grid item xs={12} key={application.id}>
                                <Card
                                    sx={{
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flexGrow: 1 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {getInitials(application.applicantName)}
                                                </Avatar>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                            {application.applicantName}
                                                        </Typography>
                                                        <Chip
                                                            label={application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                            size="small"
                                                            sx={getStatusColor(application.status)}
                                                        />
                                                    </Box>

                                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 2 }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <EmailIcon sx={{ fontSize: 16, color: "#666" }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {application.applicantEmail}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <BriefcaseIcon sx={{ fontSize: 16, color: "#666" }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Applied to: {application.businessName}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <CalendarIcon sx={{ fontSize: 16, color: "#666" }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Applied on {new Date(application.appliedDate).toLocaleDateString()}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <UserIcon sx={{ fontSize: 16, color: "#666" }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {application.experience}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {application.skills && (
                                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                                                            {application.skills.map((skill, index) => (
                                                                <Chip key={index} label={skill} size="small" variant="outlined" />
                                                            ))}
                                                        </Box>
                                                    )}

                                                    <Paper sx={{ bgcolor: "#f8f9fa", p: 2, borderRadius: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {application.coverLetter.length > 150
                                                                ? `${application.coverLetter.substring(0, 150)}...`
                                                                : application.coverLetter}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 2 }}>
                                                {application.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            startIcon={<CheckCircleIcon />}
                                                            onClick={() => handleStatusChange(application.id, "accepted")}
                                                            sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#45a049" } }}
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            startIcon={<CancelIcon />}
                                                            onClick={() => handleStatusChange(application.id, "rejected")}
                                                            sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#da190b" } }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                    onClick={() => handleViewDetails(application)}
                                                >
                                                    View Details
                                                </Button>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper sx={{ textAlign: "center", py: 8 }}>
                        <AssignmentIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#666", mb: 1 }}>
                            {applications.length === 0 ? "No applications received yet" : "No applications found"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {applications.length === 0
                                ? "When candidates apply to your business opportunities, their applications will appear here."
                                : "Try adjusting your search criteria or status filter to find applications."}
                        </Typography>
                    </Paper>
                )}
            </Container>

            {/* Application Details Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
                {selectedApplication && (
                    <>
                        <DialogTitle>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "#1976d2" }}>{getInitials(selectedApplication.applicantName)}</Avatar>
                                <Box>
                                    <Typography variant="h6">{selectedApplication.applicantName}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedApplication.applicantEmail}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                                    sx={getStatusColor(selectedApplication.status)}
                                />
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    Application Details
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Applied to: {selectedApplication.businessName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Applied on: {new Date(selectedApplication.appliedDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Experience: {selectedApplication.experience}
                                </Typography>
                            </Box>

                            {selectedApplication.skills && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                        Skills
                                    </Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        {selectedApplication.skills.map((skill, index) => (
                                            <Chip key={index} label={skill} variant="outlined" />
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                                    Cover Letter
                                </Typography>
                                <Paper sx={{ bgcolor: "#f8f9fa", p: 2 }}>
                                    <Typography variant="body2">{selectedApplication.coverLetter}</Typography>
                                </Paper>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            {selectedApplication.status === "pending" && (
                                <>
                                    <Button
                                        startIcon={<CheckCircleIcon />}
                                        onClick={() => {
                                            handleStatusChange(selectedApplication.id, "accepted")
                                            setDialogOpen(false)
                                        }}
                                        sx={{ color: "#4caf50" }}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        startIcon={<CancelIcon />}
                                        onClick={() => {
                                            handleStatusChange(selectedApplication.id, "rejected")
                                            setDialogOpen(false)
                                        }}
                                        sx={{ color: "#f44336" }}
                                    >
                                        Reject
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => setDialogOpen(false)}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    )
}

export default JobApplied
