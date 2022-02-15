import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  selectPanelState,
  cancelUserAction,
  addUser,
  editUser,
} from "./userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
  const panelState = useSelector(selectPanelState);
  const dispatch = useDispatch();

  const nameRef = React.useRef();
  const usernameRef = React.useRef();
  const emailRef = React.useRef();
  const cityRef = React.useRef();

  return (
    <Paper elevation={3} sx={{ px: 1, py: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 2,
          mx: 1,
        }}
      >
        <Typography variant="h6">Form</Typography>
      </Box>
      <Divider />

      <Box sx={{ py: 4, mx: 4 }}>
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid item xs={2}>
            <Typography variant="h6">Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={Boolean(panelState.errors.name)}
              helperText={panelState.errors.name}
              sx={{ width: "100%" }}
              size="small"
              defaultValue={panelState.user.name}
              inputRef={nameRef}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Username</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={Boolean(panelState.errors.username)}
              helperText={panelState.errors.username}
              sx={{ width: "100%" }}
              size="small"
              defaultValue={panelState.user.username}
              inputRef={usernameRef}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={Boolean(panelState.errors.email)}
              helperText={panelState.errors.email}
              sx={{ width: "100%" }}
              size="small"
              defaultValue={panelState.user.email}
              inputRef={emailRef}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">City</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              error={Boolean(panelState.errors.city)}
              helperText={panelState.errors.city}
              sx={{ width: "100%" }}
              size="small"
              defaultValue={panelState.user.address.city}
              inputRef={cityRef}
              required
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: 6,
        }}
      >
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => dispatch(cancelUserAction())}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const payload = {
              name: nameRef.current.value,
              username: usernameRef.current.value,
              email: emailRef.current.value,
              address: {
                city: cityRef.current.value,
              },
            };
            dispatch(
              panelState.mode === "add"
                ? addUser(payload)
                : editUser({ id: panelState.user.id, ...payload })
            );
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
