import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

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
    <div className="App">
      {userData.map(user => <h3 key={user.id}>{user.id}</h3>)}
    </div>
  );
}

export default App;
