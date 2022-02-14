import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UserList from "./UserList";
import Form from "./Form";

export default function Dashboard() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography
          variant="h3"
          align="left"
          gutterBottom
          sx={{ pt: 2 }}
        >
          Dashboard
        </Typography>
        <UserList />
        <Form />
      </Container>
    </React.Fragment>
  );
}
