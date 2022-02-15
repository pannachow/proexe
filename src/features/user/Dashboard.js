import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UserList from "./UserList";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectPanelState } from "./userSlice";

export default function Dashboard() {
  const panelState = useSelector(selectPanelState);

  const dispatch = useDispatch();

  if (panelState.mode === "loading") {
    dispatch(fetchUsers());
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography variant="h3" align="left" gutterBottom sx={{ pt: 2 }}>
          Dashboard
        </Typography>
        {panelState.mode === "view" ? (
          <UserList />
        ) : (
          ["add", "edit"].includes(panelState.mode) && <Form />
        )}
      </Container>
    </React.Fragment>
  );
}
