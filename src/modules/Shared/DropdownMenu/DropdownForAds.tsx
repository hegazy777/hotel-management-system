
import { MouseEvent, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { DropdownMenuProp } from '../../../interfaces/DropMenuForAds';
import EditIcon from '@mui/icons-material/Edit';
export default function DropdownForAds({ onView, onDelete, EditButton }: DropdownMenuProp) {


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action?: () => void) => {
    handleClose();
    action?.();
  };
  return (

    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        PaperProps={{
          sx: {
            overflow: "visible",
            mt: 1.5,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: "63%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              boxShadow: "-1px -1px 1px rgba(0,0,0,0.05)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleAction(onView)}>
          <ListItemIcon>
            <VisibilityIcon
              sx={{
                color: "#203FC7",
              }}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction(EditButton)}>
          <EditIcon
            sx={{
              color: "#203FC7",
              marginRight: "1.25rem"
            }}
            fontSize="small"

          /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleAction(onDelete)}>
          <ListItemIcon>
            <DeleteIcon
              sx={{
                color: "#203FC7",
              }}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>


  )
}



