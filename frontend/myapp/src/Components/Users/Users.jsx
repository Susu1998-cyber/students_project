import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [currentuser, setCurrentUser] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
    phone: "",
  });

  console.log("====currentuser====", currentuser);

  // console.log("====USERS=====", users);

  const API_URL = "http://localhost:5000/user";

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_URL);
      // console.log("===response===", response);

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editmode) {
        await axios.post(`${API_URL}/update/${currentuser._id} `, currentuser);
        fetchUser();
      } else {
        const response = await axios.post(`${API_URL}/add`, currentuser);
        setUsers([...users, response.data]);
      }
      setCurrentUser({
        name: "",
        username: "",
        age: "",
        email: "",
        password: "",
        phone: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleOpen = (user = null) => {
    if (user) {
      setCurrentUser(user);
      console.log("===users===", user);
      setEditmode(true);
    } else {
      setCurrentUser({
        name: "",
        username: "",
        age: "",
        email: "",
        password: "",
        phone: "",
      });
      setEditmode(false);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {

    {console.log("====id===",id);
    }
    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      fetchUser()
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div style={{ padding: "5px" }}>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => handleOpen()}
      >
        ADD USER
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell>UserName:</TableCell>
              <TableCell>Age:</TableCell>
              <TableCell>Email:</TableCell>
              <TableCell>Password:</TableCell>
              <TableCell>Phone:</TableCell>
              <TableCell>Actions:</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.username}</TableCell>
                <TableCell>{item?.age}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.password}</TableCell>
                <TableCell>{item?.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open}>
        <DialogTitle>{editmode ? "Edit user" : "Add user"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentuser.name}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, name: e.target.value })
            }
          />

          <TextField
            label="UserName"
            fullWidth
            margin="dense"
            value={currentuser.username}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, username: e.target.value })
            }
          />
          <TextField
            label="Age"
            fullWidth
            margin="dense"
            value={currentuser.age}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, age: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={currentuser.email}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            fullWidth
            margin="dense"
            value={currentuser.password}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, password: e.target.value })
            }
          />
          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            value={currentuser.phone}
            onChange={(e) =>
              setCurrentUser({ ...currentuser, phone: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
