import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "./userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid rgba(0, 0, 0, 0.12)",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ open, close, user }) {
  const dispatch = useDispatch();

  return (
    <Modal open={open} onClose={() => close()}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Are you sure you want to delete user {user && user.username}?
        </Typography>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            dispatch(deleteUser(user));
            close();
          }}
          sx={{ mt: 2 }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}
