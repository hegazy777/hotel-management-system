import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteImg from "../../../assets/Delete.svg";
import { DeleteDialogProps } from "../../../interfaces/DeleteConfirmationInterface";

export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  itemName,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle>
        <IconButton onClick={onClose} sx={{ float: "right" }}>
          <CancelOutlinedIcon color="error" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <img className="" src={DeleteImg} />
          <h3>Delete This {itemName} ?</h3>
          <p>
            Are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "20px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "none",
            boxShadow: "none",
            px: 4,
            backgroundColor: "#203FC7",
            fontFamily: "Poppins",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onConfirm();
          }}
          sx={{
            textTransform: "none",
            boxShadow: "none",
            px: 4,
            backgroundColor: "#e31414",
            fontFamily: "Poppins",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
