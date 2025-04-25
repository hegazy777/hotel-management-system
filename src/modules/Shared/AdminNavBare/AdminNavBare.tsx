import { Avatar, IconButton, InputBase, Paper, Badge } from "@mui/material";
import { Search, KeyboardArrowDown, NotificationsNone } from "@mui/icons-material";

export const AdminNavBare = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      backgroundColor: "#f9fafc",
      boxShadow: "0px 1px 0px rgba(0,0,0,0.05)"
    }}>
  
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          maxWidth: 600,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "6px 12px",
          boxShadow: "none"
        }}
      >
        <Search sx={{ color: "#A0A3BD" }} />
        <InputBase 
          placeholder="Search Here" 
          sx={{ ml: 1, flex: 1, color: "#6E7191" }} 
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>

    
      <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "24px" }}>
  
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar alt="User" src="https://i.pravatar.cc/300" />
          <span style={{ fontWeight: "500", color: "#14142B" }}>Upskilling</span>
          <KeyboardArrowDown sx={{ color: "#6E7191" }} />
        </div>

       
        <IconButton>
          <Badge 
            variant="dot" 
            color="error"
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <NotificationsNone sx={{ color: "#4E4B66" }} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};
