"use client"
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Avatar,
  Button,
  Stack,
} from "@mui/material"
import {
  Close as CloseIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Schedule as DurationIcon,
  School as EducationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Groups as OpeningsIcon,
  Computer as WorkModeIcon,
  Build as SkillsIcon,
} from "@mui/icons-material"

const JobDetailsDialog = ({ open, setOpen, business }) => {
  // Ensure business data exists before rendering
  if (!business) return null

  const jobDetails = [
    { label: "Company Name", value: business.businessName || "Not specified", icon: <BusinessIcon /> },
    { label: "Job Title", value: business.jobTitle || "Not specified", icon: <WorkIcon /> },
    { label: "Location", value: business.location || "Not specified", icon: <LocationIcon /> },
    { label: "Salary", value: business.salary || "Not specified", icon: <SalaryIcon /> },
    { label: "Job Type", value: business.jobType || "Not specified", icon: <CategoryIcon /> },
    { label: "Work Mode", value: business.workMode || "Not specified", icon: <WorkModeIcon /> },
    { label: "Duration", value: business.duration || "Not specified", icon: <DurationIcon /> },
    { label: "Openings", value: business.openings || "Not specified", icon: <OpeningsIcon /> },
    { label: "Education", value: business.education || "Not specified", icon: <EducationIcon /> },
  ]

  const contactDetails = [
    { label: "Owner Name", value: business.ownerName || "Not specified", icon: <PersonIcon /> },
    { label: "Email", value: business.email || "Not specified", icon: <EmailIcon /> },
    { label: "Phone", value: business.phone || "Not specified", icon: <PhoneIcon /> },
  ]

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          m: 2,
          borderRadius: 3,
          maxHeight: "90vh",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
          p: 0,
          overflow: "auto",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                width: 56,
                height: 56,
              }}
            >
              <WorkIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {business.jobTitle || "Job Position"}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {business.businessName || "Company Name"}
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {business.jobCategory && (
              <Chip
                label={business.jobCategory}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            )}
            {business.jobType && (
              <Chip
                label={business.jobType}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            )}
            {business.workMode && (
              <Chip
                label={business.workMode}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Content Section */}
        <Box sx={{ p: 3 }}>
          {/* Job Description */}
          {business.description && (
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                  Job Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {business.description}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Job Details Grid */}
          <Card sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                Job Details
              </Typography>
              <Grid container spacing={2}>
                {jobDetails.map((detail, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
                      <Box sx={{ color: "primary.main" }}>{detail.icon}</Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold">
                          {detail.label}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {detail.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Skills Required */}
          {business.skillsRequired && (
            <Card sx={{ mb: 3, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <SkillsIcon color="primary" />
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    Skills Required
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {business.skillsRequired}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                Contact Information
              </Typography>
              <Grid container spacing={2}>
                {contactDetails.map((contact, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
                      <Box sx={{ color: "primary.main" }}>{contact.icon}</Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="bold">
                          {contact.label}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {contact.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setOpen(false)}
              sx={{
                minWidth: 120,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default JobDetailsDialog
