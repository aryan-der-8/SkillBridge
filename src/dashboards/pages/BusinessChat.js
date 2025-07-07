"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Menu,
  MenuItem,
  Paper,
  IconButton,
  Chip,
  InputAdornment,
  Fade,
  Tooltip,
} from "@mui/material"
import {
  Send as SendIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"

const BusinessChat = () => {
  const [acceptedApplicants, setAcceptedApplicants] = useState([])
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null)
  const [editModeIndex, setEditModeIndex] = useState(null)
  const [editMessage, setEditMessage] = useState("")

  useEffect(() => {
    const businessData = JSON.parse(localStorage.getItem("BusinessRegister") || "{}")
    const businessEmail = businessData.email
    const appliedBusinesses = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")
    const statuses = JSON.parse(localStorage.getItem("applicationStatuses") || "{}")
    const accepted = appliedBusinesses.filter((app) => {
      const key = `${app.businessId}_${app.userEmail}`
      return statuses[key] === "accepted" && app.email === businessEmail
    })
    setAcceptedApplicants(accepted)
  }, [])

  useEffect(() => {
    if (selectedApplicant) {
      const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
      setMessages(chatData[selectedApplicant.businessId] || [])
    }
  }, [selectedApplicant])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedApplicant) return
    const chatKey = selectedApplicant.businessId
    const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
    const newMsg = {
      sender: "business",
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    }
    const updatedMsgs = [...(chatData[chatKey] || []), newMsg]
    chatData[chatKey] = updatedMsgs
    localStorage.setItem("chatMessages", JSON.stringify(chatData))
    setMessages(updatedMsgs)
    setNewMessage("")
  }

  const handleEditSubmit = () => {
    if (editMessage.trim() === "") return
    const chatKey = selectedApplicant.businessId
    const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
    const updatedMsgs = [...messages]
    updatedMsgs[editModeIndex].text = editMessage.trim()
    updatedMsgs[editModeIndex].timestamp = new Date().toISOString()
    chatData[chatKey] = updatedMsgs
    localStorage.setItem("chatMessages", JSON.stringify(chatData))
    setMessages(updatedMsgs)
    setEditModeIndex(null)
    setEditMessage("")
  }

  const handleDeleteMessage = () => {
    if (selectedMessageIndex === null) return
    const chatKey = selectedApplicant.businessId
    const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
    const updatedMsgs = messages.filter((_, i) => i !== selectedMessageIndex)
    chatData[chatKey] = updatedMsgs
    localStorage.setItem("chatMessages", JSON.stringify(chatData))
    setMessages(updatedMsgs)
    setAnchorEl(null)
    setSelectedMessageIndex(null)
  }

  const handleContextMenu = (event, index) => {
    // Only allow context menu for business messages
    if (messages[index].sender !== "business") return

    event.preventDefault()
    setSelectedMessageIndex(index)
    setAnchorEl(event.currentTarget)
  }

  const handleDoubleClick = (index) => {
    // Only allow editing business messages
    if (messages[index].sender !== "business") return

    setEditModeIndex(index)
    setEditMessage(messages[index].text)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (editModeIndex !== null) {
        handleEditSubmit()
      } else {
        handleSendMessage()
      }
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f5f5",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Left Sidebar - Applicants List */}
      <Paper
        elevation={3}
        sx={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            m:3,
            p: 1,
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <BusinessIcon />
          <Typography variant="h6" fontWeight="bold">
            Applicant Chats
          </Typography>
          <Chip
            label={acceptedApplicants.length}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              ml: "auto",
            }}
          />
        </Box>

        <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
          {acceptedApplicants.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No accepted applicants yet
              </Typography>
            </Box>
          ) : (
            acceptedApplicants.map((app, idx) => (
              <ListItem
                key={idx}
                button
                onClick={() => setSelectedApplicant(app)}
                selected={selectedApplicant?.businessId === app.businessId}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: "1px solid #f0f0f0",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.Mui-selected": {
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>{getInitials(app.userName)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {app.userName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {app.jobTitle}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* Right Side - Chat Window */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
        }}
      >
        {selectedApplicant ? (
          <>
            {/* Chat Header */}
            <Paper
              elevation={1}
              sx={{
                p: 3,
                bgcolor: "white",
                borderBottom: "1px solid #e0e0e0",
                borderRadius: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>{getInitials(selectedApplicant.userName)}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedApplicant.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied for: {selectedApplicant.jobTitle}
                  </Typography>
                </Box>
                <Chip label="Accepted" color="success" size="small" sx={{ ml: "auto" }} />
              </Box>
            </Paper>

            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                bgcolor: "#fafafa",
                backgroundImage:
                  "linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            >
              {messages.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <ChatIcon sx={{ fontSize: 64, color: "text.disabled" }} />
                  <Typography variant="h6" color="text.secondary">
                    Start the conversation
                  </Typography>
                  <Typography variant="body2" color="text.disabled" textAlign="center">
                    Send a message to {selectedApplicant.userName} to begin chatting
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {messages.map((msg, i) => (
                    <Fade in={true} key={i} timeout={300}>
                      <Box
                        onContextMenu={(e) => handleContextMenu(e, i)}
                        onDoubleClick={() => handleDoubleClick(i)}
                        sx={{
                          alignSelf: msg.sender === "business" ? "flex-end" : "flex-start",
                          maxWidth: "75%",
                          cursor: msg.sender === "business" ? "pointer" : "default",
                        }}
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            bgcolor: msg.sender === "business" ? "primary.main" : "white",
                            color: msg.sender === "business" ? "white" : "text.primary",
                            px: 2,
                            py: 1.5,
                            borderRadius: msg.sender === "business" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            position: "relative",
                            "&:hover": {
                              transform: msg.sender === "business" ? "scale(1.02)" : "none",
                              transition: "transform 0.2s ease",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            {msg.sender !== "business" && (
                              <Avatar sx={{ width: 24, height: 24, bgcolor: "secondary.main" }}>
                                <PersonIcon sx={{ fontSize: 16 }} />
                              </Avatar>
                            )}
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                {msg.text}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  textAlign: "right",
                                  mt: 0.5,
                                  opacity: 0.8,
                                }}
                              >
                                {formatTime(msg.timestamp)}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </Fade>
                  ))}
                </Box>
              )}
            </Box>

            {/* Input Area */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 0,
              }}
            >
              {editModeIndex !== null ? (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Edit your message..."
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EditIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Tooltip title="Save changes">
                    <IconButton
                      onClick={handleEditSubmit}
                      color="primary"
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel editing">
                    <IconButton
                      onClick={() => {
                        setEditModeIndex(null)
                        setEditMessage("")
                      }}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${selectedApplicant.userName}...`}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                      },
                    }}
                  />
                  <Tooltip title="Send message">
                    <span>
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        sx={{
                          bgcolor: newMessage.trim() ? "primary.main" : "grey.300",
                          color: "white",
                          "&:hover": {
                            bgcolor: newMessage.trim() ? "primary.dark" : "grey.400",
                          },
                          "&:disabled": {
                            color: "white",
                          },
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              )}
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 3,
              bgcolor: "#fafafa",
            }}
          >
            <BusinessIcon sx={{ fontSize: 80, color: "text.disabled" }} />
            <Typography variant="h5" color="text.secondary" fontWeight="medium">
              Business Chat Center
            </Typography>
            <Typography variant="body1" color="text.disabled" textAlign="center">
              Select an applicant from the sidebar to start chatting
            </Typography>
          </Box>
        )}

        {/* Context Menu - Only for business messages */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 8,
            sx: {
              borderRadius: 2,
              minWidth: 120,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              if (selectedMessageIndex !== null) {
                setEditModeIndex(selectedMessageIndex)
                setEditMessage(messages[selectedMessageIndex].text)
              }
              setAnchorEl(null)
            }}
            sx={{ gap: 1 }}
          >
            <EditIcon fontSize="small" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteMessage} sx={{ gap: 1, color: "error.main" }}>
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default BusinessChat
