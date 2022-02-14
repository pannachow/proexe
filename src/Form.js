import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function Form() {
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
        <Grid container spacing={4} sx={{ alignItems: "center"}}>
          <Grid item xs={2} >
            <Typography variant="h6">Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField sx={{ width: "100%" }} size="small"/>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Email</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField sx={{ width: "100%" }}size="small" />
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
        <Button variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained">Submit</Button>
      </Box>
    </Paper>
  );
}
