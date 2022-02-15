import * as React from "react";
import Link from "@mui/material/Link";
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
import {
  selectUsers,
  deleteUser,
  beginAddUser,
  beginEditUser,
} from "./userSlice";

export default function UserList() {
  const users = useSelector(selectUsers);
  const [sorting, setSorting] = React.useState({
    by: null,
    ascending: true,
  });

  const dispatch = useDispatch();

  function updateSorting(by) {
    setSorting({
      by,
      // if user tries to sort by already sorted column, reverse the sorting direction
      ascending: by === sorting.by ? !sorting.ascending : true,
    });
  }

  const sortedUsers = sorting.by
    ? [...users].sort((a, b) => {
        if (!sorting.ascending) {
          [b, a] = [a, b];
        }
        return accessObject(a, sorting.by)
          .toString()
          .localeCompare(accessObject(b, sorting.by).toString(), "en", {
            // enables sorting numeric values such as id correctly
            numeric: true,
          });
      })
    : users;

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
        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(beginAddUser())}
        >
          Add new
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Table size="medium" sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link href="#" onClick={() => updateSorting("id")}>
                Id
              </Link>
            </TableCell>
            <TableCell>
              <Link href="#" onClick={() => updateSorting("name")}>
                Name
              </Link>
            </TableCell>
            <TableCell>
              <Link href="#" onClick={() => updateSorting("username")}>
                Username
              </Link>
            </TableCell>
            <TableCell>
              <Link href="#" onClick={() => updateSorting("address.city")}>
                City
              </Link>
            </TableCell>
            <TableCell>
              <Link href="#" onClick={() => updateSorting("email")}>
                Email
              </Link>
            </TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={() => dispatch(beginEditUser(user))}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => dispatch(deleteUser(user))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function accessObject(obj, key) {
  // access object with a nested key such as "address.city"
  for (const field of key.split(".")) {
    obj = obj[field];
  }
  return obj;
}
