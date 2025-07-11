"use client"

import { useEffect, useState, useContext } from "react"
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
  Button,
} from "@mui/material"
import {
  Send as SendIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Business as BusinessIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router"

const Chat = () => {
  const { userData } = useContext(UserContext)
  const [acceptedBusinesses, setAcceptedBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null)
  const [editModeIndex, setEditModeIndex] = useState(null)
  const [editMessage, setEditMessage] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const appliedBusinesses = JSON.parse(localStorage.getItem("appliedBusinesses") || "[]")
    const statuses = JSON.parse(localStorage.getItem("applicationStatuses") || "{}")
    const accepted = appliedBusinesses.filter((b) => {
      const key = `${b.businessId}_${userData?.email}`
      return statuses[key] === "accepted"
    })
    setAcceptedBusinesses(accepted)
  }, [userData])

  useEffect(() => {
    if (selectedBusiness) {
      const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
      setMessages(chatData[selectedBusiness.businessId] || [])
    }
  }, [selectedBusiness])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedBusiness) return
    const chatKey = selectedBusiness.businessId
    const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
    const newMsg = {
      sender: "user",
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
    const chatKey = selectedBusiness.businessId
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
    const chatKey = selectedBusiness.businessId
    const chatData = JSON.parse(localStorage.getItem("chatMessages") || "{}")
    const updatedMsgs = messages.filter((_, i) => i !== selectedMessageIndex)
    chatData[chatKey] = updatedMsgs
    localStorage.setItem("chatMessages", JSON.stringify(chatData))
    setMessages(updatedMsgs)
    setAnchorEl(null)
    setSelectedMessageIndex(null)
  }

  const handleContextMenu = (event, index) => {
    // Only allow context menu for user messages
    if (messages[index].sender !== "user") return

    event.preventDefault()
    setSelectedMessageIndex(index)
    setAnchorEl(event.currentTarget)
  }

  const handleDoubleClick = (index) => {
    // Only allow editing user messages
    if (messages[index].sender !== "user") return

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

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f5f5",
        fontFamily: "Roboto, sans-serif",
      }}
    >

      {/* Left Sidebar - Business List */}
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
            m: 2,
            p: 1,
            bgcolor: "#42a5f5",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ChatIcon />
          <Typography variant="h6" fontWeight="bold">
            Chats
          </Typography>
          <Chip
            label={acceptedBusinesses.length}
            size="small"
            clickable
            onClick={() => console.log("Clicked")}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              ml: "auto",
            }}
          />

        </Box>

        <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
          {acceptedBusinesses.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No accepted applications yet
              </Typography>
            </Box>
          ) : (
            acceptedBusinesses.map((b, idx) => (
              <ListItem
                key={idx}
                button
                onClick={() => setSelectedBusiness(b)}
                selected={selectedBusiness?.businessId === b.businessId}
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
                  <Avatar sx={{ bgcolor: "#9e9e9e", color:'#fafafa' }}>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {b.jobTitle}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {b.ownerName}
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
        {selectedBusiness ? (
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
                <Avatar sx={{ bgcolor: "#9e9e9e", color:'#fafafa' }}>
                  <BusinessIcon />
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedBusiness.jobTitle}
                  </Typography>
                  <Button sx={{ position: 'absolute', right: 30, height: '30px' }} onClick={() => navigate(-1)} variant="outlined">Back</Button>
                </Box>
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
                    Start your conversation
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    Send a message to begin chatting
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
                          alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                          maxWidth: "75%",
                          cursor: msg.sender === "user" ? "pointer" : "default",
                        }}
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            bgcolor: msg.sender === "user" ? "#64b5f6" : "white",
                            color: msg.sender === "user" ? "black" : "text.primary",
                            px: 2,
                            py: 1.5,
                            borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            position: "relative",
                            "&:hover": {
                              transform: msg.sender === "user" ? "scale(1.02)" : "none",
                              transition: "transform 0.2s ease",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            {msg.sender !== "user" && (
                              <Avatar sx={{ width: 24, height: 24, bgcolor: "#b39ddb"}}>
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
                    placeholder="Type your message..."
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
              position:'relative'
            }}
          >
            <Button sx={{position:'absolute', top:12, right:15}} onClick={() => navigate(-1)} variant="contained">Go Back</Button>
            <ChatIcon sx={{ fontSize: 80, color: "text.disabled" }} />
            <Typography variant="h5" color="text.secondary" fontWeight="medium">
              Welcome to Messages
            </Typography>
            <Typography variant="body1" color="text.disabled" textAlign="center">
              Select a conversation from the sidebar to start chatting
            </Typography>
          </Box>
        )}

        {/* Context Menu - Only for user messages */}
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

export default Chat
