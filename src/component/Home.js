// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Rating,
// } from '@mui/material';
// import { useNavigate } from 'react-router';

// export default function Home() {
//   const reviews = [
//     {
//       name: 'Keval Shah',
//       feedback: 'SkillBridge helped me gain real-world experience with an interior design firm. It’s a great platform for students!',
//       rating: 5,
//     },
//     {
//       name: 'Deven Mehta',
//       feedback: 'I worked with a local startup through SkillBridge and it boosted my resume tremendously!',
//       rating: 4,
//     },
//   ];

//   const businessOwners = [
//     {
//       name: 'Mirror Interiors',
//       category: 'Home Decor and Interior Design',
//       location: 'Nikol, Ahmedabad',
//     },
//     {
//       name: 'Shree Furniture ',
//       category: 'Furniture Manufacturer and Retailer',
//       location: 'Odhav, Ahmedabad',
//     },
//   ];

//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//       {/* Hero Section */}
//       <Box textAlign="center" sx={{ mb: 8 }}>
//         <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
//           Welcome to SkillBridge
//         </Typography>
//         <Typography variant="h6" color="text.secondary" gutterBottom>
//           Bridging the gap between learning and working experience.
//         </Typography>
//         <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item>
//             <img src="https://images.unsplash.com/photo-1571573750055-39cfc5545c23?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Experience" width="300" style={{ borderRadius: '10px', height:'200px' }} />
//           </Grid>
//           <Grid item>
//             <img src="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Collaboration" width="300" style={{ borderRadius: '10px',height:'200px' }} />
//           </Grid>
//           <Grid item>
//             <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZWVyfGVufDB8fDB8fHww" alt="Career Growth" width="300" style={{ borderRadius: '10px',height:'200px' }} />
//           </Grid>
//         </Grid>
//         <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }} onClick={() => navigate('/signup') } >
//           Get Started
//         </Button>
//       </Box>

//       {/* About Section */}
//       <Box textAlign="center" sx={{ mb: 8 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Why SkillBridge?
//         </Typography>
//         <Typography variant="body1" color="text.secondary" maxWidth="md" mx="auto">
//           We connect college students and freshers directly with businesses to gain real-time experience in their fields of interest. No middlemen, just direct learning and growth.
//         </Typography>
//       </Box>

//       {/* Business Owners */}
//       <Box sx={{ mb: 8 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
//           Trusted Business Owners
//         </Typography>
//         <Grid container spacing={4} justifyContent="center">
//           {businessOwners.map((owner, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
//                 <Typography variant="h6" fontWeight="bold">{owner.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">{owner.category}</Typography>
//                 <Typography variant="body2">{owner.location}</Typography>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* User Reviews */}
//       <Box sx={{ mb: 8, marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
//           Student Reviews
//         </Typography>
//         <Grid container spacing={4}>
//           {reviews.map((review, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card sx={{ p: 3, borderRadius: 3 }}>
//                 <Box display="flex" alignItems="center" mb={2}>
//                   <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{review.name[0]}</Avatar>
//                   <Box>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       {review.name}
//                     </Typography>
//                     <Rating value={review.rating} readOnly size="small" />
//                   </Box>
//                 </Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {review.feedback}
//                 </Typography>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Call To Action */}
//       <Box textAlign="center" sx={{ py: 6, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
//         <Typography variant="h5" fontWeight="bold">
//           Join SkillBridge Today
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, margin: 'auto', mt: 1 }}>
//           Start your journey by applying to business owners in your area of interest and gain valuable professional experience.
//         </Typography>
//         <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
//           Register Now
//         </Button>
//       </Box>
//     </Container>
//   );
// }


"use client"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  Rating,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material"
import {
  Work as WorkIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Handshake as HandshakeIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"


function Home() {
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Navigation */}
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <WorkIcon sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "bold" }}>
              CareerConnect
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography sx={{ color: "text.secondary", cursor: "pointer", "&:hover": { color: "text.primary" } }}>
                Features
              </Typography>
              <Typography sx={{ color: "text.secondary", cursor: "pointer", "&:hover": { color: "text.primary" } }}>
                How It Works
              </Typography>
              <Typography sx={{ color: "text.secondary", cursor: "pointer", "&:hover": { color: "text.primary" } }}>
                Success Stories
              </Typography>
              <Button variant="outlined" sx={{ color: "text.primary", borderColor: "grey.300" }}>
                Sign In
              </Button>
              <Button variant="contained">Get Started</Button>
            </Box>
          ) : (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10, lg: 14 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Box sx={{ mb: 4 }}>
              <Chip
                label="🚀 Connecting Talent with Opportunity"
                sx={{
                  bgcolor: "primary.50",
                  color: "primary.800",
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                  lineHeight: 1.2,
                }}
              >
                Bridge the Gap Between{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Dreams
                </Box>{" "}
                and{" "}
                <Box component="span" sx={{ color: "success.main" }}>
                  Careers
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.6 }}>
                Whether you're a student seeking your first internship or a business owner looking for fresh talent, we
                connect ambition with opportunity to create meaningful career experiences.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 6 }}>
              <Button variant="contained" size="large" startIcon={<SchoolIcon />} sx={{ px: 4, py: 1.5 }}>
                Find Opportunities
              </Button>
              <Button variant="outlined" size="large" startIcon={<BusinessIcon />} sx={{ px: 4, py: 1.5 }}>
                Post Jobs
              </Button>
            </Box>

            <Grid container spacing={3} sx={{ margin: "0 auto", width: "100%" }}>
              <Grid size={4} xs={4} sx={{ width: "300px"}}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Active Students
                  </Typography>
                </Box>
              </Grid>
              <Grid size={4} xs={4} sx={{ width: "300px"}}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    500+
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Partner Companies
                  </Typography>
                </Box>
              </Grid>
              <Grid size={4} xs={4} sx={{ width: "300px"}}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    95%
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Success Rate
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="/placeholder.svg?height=600&width=600"
                alt="Students and professionals collaborating"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
              <Paper
                sx={{
                  position: "absolute",
                  bottom: -24,
                  left: -24,
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: "flex", ml: -1 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, ml: -1 }} />
                  <Avatar sx={{ bgcolor: "success.main", width: 32, height: 32, ml: -1 }} />
                  <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, ml: -1 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    1,200+ matches this week
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Students placed successfully
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Why Choose CareerConnect?
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
              We understand both sides of the equation - students need experience, businesses need fresh talent. Our
              platform makes these connections seamless and meaningful.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2, "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "primary.50",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <PeopleIcon sx={{ color: "primary.main" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    For Students & Job Seekers
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    Access thousands of internships and entry-level positions from top companies
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Personalized job matching</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Resume building tools</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Interview preparation</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2, "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "success.50",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <BusinessIcon sx={{ color: "success.main" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    For Business Owners
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    Find motivated students and fresh graduates ready to contribute to your success
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Pre-screened candidates</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Flexible hiring options</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Cost-effective recruitment</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2, "&:hover": { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "secondary.50",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <HandshakeIcon sx={{ color: "secondary.main" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Perfect Matches
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    Our AI-powered system ensures the right fit for both parties
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Smart matching algorithm</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Skill-based recommendations</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ color: "success.main", fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">Cultural fit assessment</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            How It Works
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Simple steps to connect talent with opportunity
          </Typography>
        </Box>

        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <SchoolIcon sx={{ color: "primary.main", mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                For Students
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>1</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Create Your Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Build a compelling profile showcasing your skills, education, and aspirations
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>2</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Browse Opportunities
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Explore internships and jobs tailored to your interests and qualifications
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>3</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Apply & Connect
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Apply with one click and connect directly with hiring managers
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <BusinessIcon sx={{ color: "success.main", mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                For Employers
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "success.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>1</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Post Your Opportunity
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Create detailed job postings with your requirements and company culture
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "success.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>2</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Review Candidates
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Browse pre-screened candidates matched to your specific needs
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: "success.main", width: 32, height: 32, mr: 2, fontSize: "0.875rem" }}>3</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Hire & Grow
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Connect with top talent and build your team with motivated individuals
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Success Stories
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Real experiences from students and employers who found their perfect match
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Rating value={5} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                    "CareerConnect helped me land my dream internship at a tech startup. The platform made it so easy to
                    showcase my skills and connect with the right employers."
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>S</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Sarah Chen
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Computer Science Student
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Rating value={5} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                    "As a small business owner, finding quality interns was always challenging. CareerConnect delivered
                    motivated students who became valuable team members."
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>M</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Michael Rodriguez
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Marketing Agency Owner
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: "100%", boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Rating value={5} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                    "The platform's matching system is incredible. I found an internship that perfectly aligned with my
                    career goals and gained invaluable experience."
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>E</Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Emily Johnson
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Business Administration Student
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #388e3c 100%)",
          py: 8,
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: "600px", mx: "auto", opacity: 0.9 }}>
              Join thousands of students and employers who have found success through CareerConnect. Your next
              opportunity is just a click away.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SchoolIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                Join as Student
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<BusinessIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "white" },
                }}
              >
                Post Jobs
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WorkIcon sx={{ color: "primary.light", mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  CareerConnect
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                Connecting ambitious students with forward-thinking employers to create meaningful career opportunities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                For Students
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Find Internships
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Browse Jobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Career Resources
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Resume Builder
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                For Employers
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Post Jobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Find Talent
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Pricing
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Success Stories
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Support
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Help Center
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.400", cursor: "pointer", "&:hover": { color: "white" } }}
                >
                  Terms of Service
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: "1px solid", borderColor: "grey.800", mt: 4, pt: 4, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              © 2024 CareerConnect. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home

// Main App component with Theme Provider
// export default function App() {
//   return (
//       <HomePage />
//   )
// }
