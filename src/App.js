import { Avatar, CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import profileImage from './assets/images/profile-avatar.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [details, setDetails] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect( () => {
    getUsers();
  }, [])

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
      <Grid container spacing={3} className="container">
        <Grid item xs={12} md={6}>
          <div className="header">
            <h3>USER LIST</h3>
          </div>
          {loading && <div style={{textAlign: 'center'}}>Users coming soon...!!!</div>}
          {error ? (<div style={{textAlign: 'center'}}>Error occurred in loading...!!!</div>) : userData.length === 0 ? (!loading && (<div style={{textAlign: 'center'}}>No users to display...!!!</div>)) : Array.isArray(userData) ? (userData?.map((user) => {
            return (
              <Box display={'flex'} key={user.id}>
                <Avatar alt="Remy Sharp" src={profileImage} />
                <p>{user.profile.firstName + " " + user.profile.lastName}</p>
              </Box>
            );
          })) : (<div style={{textAlign: 'center'}}>Invalid data type</div>)}
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
  );
}

export default App;