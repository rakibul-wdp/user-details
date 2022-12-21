import { Avatar, CircularProgress, Grid, List, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import profileImage from './assets/images/profile-avatar.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const getUsers = async () => {
    setLoading(true);
    try {
      const  {data}  = await axios.get(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const setUserDetails = (id) => {
    const singleUser = userData.filter((user) => user.id === id);
    setDetails(singleUser);
  }

  useEffect( () => {
    getUsers();
  }, [])

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Box style={{ textAlign: "center" }}>
        {loading && (
          <>
            <h3>Loading...!!!</h3>
            <CircularProgress size={50} />
          </>
        )}
        {error && <h3>Error in Laoding Data</h3>}
      </Box>
      <Grid container spacing={12} sx={{ p: 17 }}>
        <Grid item xs={12} md={6}>
          <div className="header">
            <h3>USER LIST</h3>
          </div>
          {loading && (
            <div style={{ textAlign: "center" }}>Users coming soon...!!!</div>
          )}
          {error ? (
            <div style={{ textAlign: "center" }}>
              Error occurred in loading...!!!
            </div>
          ) : userData.length === 0 ? (
            !loading && (
              <div style={{ textAlign: "center" }}>
                No users to display...!!!
              </div>
            )
          ) : Array.isArray(userData) ? (
            userData?.map((user) => {
              return (
                <Box onClick={() => setUserDetails(user.id)} key={user.id}>
                  <List>
                    <ListItemButton
                      sx={{ backgroundColor: "#ececec", borderRadius: "5px" }}
                      selected={selectedIndex === user.id}
                      onClick={(event) => handleListItemClick(event, user.id)}
                    >
                      <Avatar alt="profile pic" src={profileImage} />
                      <Typography
                        sx={{ ml: 1.5, fontWeight: "bold", fontSize: 18 }}
                      >
                        {user.profile.firstName + " " + user.profile.lastName}
                      </Typography>
                    </ListItemButton>
                  </List>
                </Box>
              );
            })
          ) : (
            <div style={{ textAlign: "center" }}>Invalid data type</div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="header">
            <h3>USER DETAILS</h3>
          </div>
          {details.length === 0 ? (
            <div className="contact-details">No user selected</div>
          ) : (
            <Box sx={{mt: 5}}>
              <Avatar
                alt="profile pic details"
                sx={{ width: 200, height: 200, margin: "auto" }}
                src={profileImage}
              />
              <Typography
                sx={{ fontWeight: "bold", mb: 3, mt: 2, textAlign: "center" }}
              >
                {details[0].profile.username}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#DBDBDB",
                  borderRadius: "5px",
                  fontWeight: 500,
                  width: "50%",
                  margin: "auto",
                  p: 1.5,
                  pb: 3,
                  mb: 5,
                  border: 1,
                }}
              >
                <Typography>{details[0].Bio}</Typography>
              </Box>
              <Box>
                <Typography sx={{ width: "50%", margin: "auto" }}>
                  Full Name
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "#DBDBDB",
                    borderRadius: "5px",
                    fontWeight: 500,
                    width: "50%",
                    margin: "auto",
                    p: 1,
                    mb: 2,
                    border: 1,
                  }}
                >{`${details[0].profile.firstName} ${details[0].profile.lastName}`}</Typography>
              </Box>
              <Box>
                <Typography sx={{ width: "50%", margin: "auto" }}>
                  Job Title
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "#DBDBDB",
                    borderRadius: "5px",
                    fontWeight: 500,
                    width: "50%",
                    margin: "auto",
                    p: 1,
                    mb: 2,
                    border: 1,
                  }}
                >
                  {details[0].jobTitle}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ width: "50%", margin: "auto" }}>
                  Email
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "#DBDBDB",
                    borderRadius: "5px",
                    fontWeight: 500,
                    width: "50%",
                    margin: "auto",
                    p: 1,
                    mb: 2,
                    border: 1,
                  }}
                >
                  {details[0].profile.email}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;