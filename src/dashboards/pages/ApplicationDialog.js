"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Wc as GenderIcon,
  Cake as AgeIcon,
  BusinessCenter as BusinessCenterIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  Star as SkillIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

const ApplicationDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedApplication,
  handleStatusChange,
  getInitials,
  getStatusColor,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const InfoItem = ({ icon, label, value, fullWidth = false }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1,
        ...(fullWidth && { gridColumn: "span 2" }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: "primary.light",
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      {selectedApplication && (
        <>
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {getInitials(selectedApplication.applicantName)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    {selectedApplication.applicantName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {selectedApplication.applicantEmail}
                    </Typography>
                  </Box>
                  <Chip
                    label={selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    sx={{
                      ...getStatusColor(selectedApplication.status),
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </Box>
              <Tooltip title="Close">
                <IconButton onClick={() => setDialogOpen(false)} sx={{ color: "text.secondary" }}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ px: 3, pb: 2 }}>
            <Grid container spacing={3}>
              {/* Application Overview */}
              <Grid size={{xs:12}} >
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <WorkIcon color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Application Overview
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid size={{xs:12, sm:6}}>
                        <InfoItem
                          icon={<PersonIcon fontSize="small" />}
                          label="Applied to"
                          value={selectedApplication.applicantName}
                        />
                      </Grid>
                      <Grid size={{xs:12, sm:6}}>
                        <InfoItem
                          icon={<CalendarIcon fontSize="small" />}
                          label="Applied on"
                          value={formatDate(selectedApplication.appliedDate)}
                        />
                      </Grid>
                      <Grid size={{xs:12}}>
                        <InfoItem
                          icon={<BusinessCenterIcon fontSize="small" />}
                          label="Experience"
                          value={selectedApplication.experience}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Personal Information */}
              <Grid size={{xs:12, sm:6}}>
                <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <PersonIcon color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Personal Information
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <InfoItem
                        icon={<PersonIcon fontSize="small" />}
                        label="Full Name"
                        value={selectedApplication.userName}
                      />
                      <InfoItem
                        icon={<EmailIcon fontSize="small" />}
                        label="Email"
                        value={selectedApplication.userEmail}
                      />
                      <InfoItem icon={<PhoneIcon fontSize="small" />} label="Phone" value={selectedApplication.phone} />
                      <InfoItem
                        icon={<GenderIcon fontSize="small" />}
                        label="Gender"
                        value={selectedApplication.gender}
                      />
                      <InfoItem icon={<AgeIcon fontSize="small" />} label="Age" value={selectedApplication.age} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Professional Information */}
              <Grid size={{xs:12, sm:6}}>
                <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <BusinessCenterIcon color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Professional Details
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <InfoItem
                        icon={<WorkIcon fontSize="small" />}
                        label="Work Preference"
                        value={selectedApplication.workPreference}
                      />
                      <InfoItem
                        icon={<SchoolIcon fontSize="small" />}
                        label="Education"
                        value={selectedApplication.education}
                      />
                      <InfoItem
                        icon={<ScheduleIcon fontSize="small" />}
                        label="Availability"
                        value={selectedApplication.availability}
                      />
                      <InfoItem
                        icon={<LocationIcon fontSize="small" />}
                        label="Location"
                        value={selectedApplication.location}
                      />
                      <InfoItem
                        icon={<MoneyIcon fontSize="small" />}
                        label="Expected Salary"
                        value={selectedApplication.expectedSalary}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Skills */}
              {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                <Grid size={{xs:12}}>
                  <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <SkillIcon color="primary" />
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Skills & Expertise
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {selectedApplication.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            variant="outlined"
                            sx={{
                              borderColor: "primary.main",
                              color: "primary.main",
                              "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* About Section */}
              <Grid size={{xs:12}}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <InfoIcon color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        About the Applicant
                      </Typography>
                    </Box>
                    <Paper
                      sx={{
                        bgcolor: "grey.50",
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          color: "text.primary",
                        }}
                      >
                        {selectedApplication.about.length > 150
                          ? `${selectedApplication.about.substring(0, 150)}...`
                          : selectedApplication.about}
                      </Typography>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions sx={{ p: 3, gap: 1 }}>
            {selectedApplication.status === "pending" && (
              <>
                <Button
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, "accepted")
                    setDialogOpen(false)
                  }}
                  variant="contained"
                  sx={{
                    bgcolor: "#4caf50",
                    "&:hover": { bgcolor: "#45a049" },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Accept Application
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, "rejected")
                    setDialogOpen(false)
                  }}
                  variant="contained"
                  sx={{
                    bgcolor: "#f44336",
                    "&:hover": { bgcolor: "#d32f2f" },
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Reject Application
                </Button>
              </>
            )}
            <Button
              onClick={() => setDialogOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                ml: "auto",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default ApplicationDialog
