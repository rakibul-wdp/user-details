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
      <Grid container spacing={12} sx={{p: 17}}>
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
            <div className="contact-details">
              <Avatar alt="profile pic details" src={profileImage} />
              <p className="username">{details[0].profile.username}</p>
              <div className="text description">
                <p>{details[0].Bio}</p>
              </div>
              <div className="text">
                Full Name
                <p>{`${details[0].profile.firstName} ${details[0].profile.lastName}`}</p>
              </div>
              <div className="text">
                Job Title
                <p>{details[0].jobTitle}</p>
              </div>
              <div className="text">
                Email
                <p>{details[0].profile.email}</p>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;