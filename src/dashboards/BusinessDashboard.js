import { Navigate, Route, Router, Routes } from "react-router";
import DashboardHome from "./pages/DashboardHome";
import BusinessList from "./pages/BusinessList";
import RegisterBusiness from "./pages/RegisterBusiness";
import Sidebar from "./pages/Sidebar";
import Box from "@mui/material/Box";
import JobApplied from "./pages/JobApplied";

export default function BusinessDashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                    <Route path='/' element={<Navigate to={'dashboard'} />}/>
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route path="business-list" element={<BusinessList />} />
                    <Route path="register" element={<RegisterBusiness />} />
                    <Route path="jobapplied" element={<JobApplied/>} />
                </Routes>
            </Box>  
        </Box>
    )
}