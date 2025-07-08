import "./App.css"
import Navbar from "./component/Navbar"
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from "./component/Signup"
import Home from "./component/Home"
import BusinessDashboard from "./dashboards/BusinessDashboard"
import UserDashboard from "./user/UserDashboard"
import User from "./user/User"
import UserInterest from "./user/UserInterest"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import Chat from "./user/Chat"
import UserProfile from "./user/UserProfile"

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      50: "#e3f2fd",
      800: "#1565c0",
    },
    success: {
      main: "#388e3c",
      50: "#e8f5e8",
    },
    secondary: {
      main: "#9c27b0",
      50: "#f3e5f5",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/businessDashboard/*" element={<BusinessDashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/userInterest" element={<UserInterest />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
