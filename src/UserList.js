import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, fetchUsers } from "./userSlice";

export default function UserList() {
  const users = useSelector(selectUsers);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
        <Typography variant="h6">User List</Typography>
        <Button variant="contained" size="small">
          Add new
        </Button>
      </Box>
      <Divider sx={{my: 2}}/>

      {/* <Paper elevation={1} sx={{ p: 2, border: 1 }}> */}
        <Table size="medium" sx={{ border: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color="warning">
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      {/* </Paper> */}
    </Paper>
  );
}
