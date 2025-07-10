import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditProfileDialog({ open, handleClose, user, onSave }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userLoginData", JSON.stringify(formData));
    onSave(formData); // pass updated data back to parent
    handleClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative", background: "#764ba2" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Edit Profile
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Stack spacing={2} sx={{ p: 3 }}>
        <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
        <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
        <TextField name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} />
        <TextField name="company" label="Company" value={formData.company} onChange={handleChange} />
        <TextField name="location" label="Location" value={formData.location} onChange={handleChange} />
        <TextField name="about" label="About" multiline rows={4} value={formData.about} onChange={handleChange} />
        {/* Add more fields as needed */}
      </Stack>
    </Dialog>
  );
}

export default EditProfileDialog;
