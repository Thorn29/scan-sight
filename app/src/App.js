import { useState, useEffect } from 'react';
import axios from 'axios';
import Particles from 'react-tsparticles';
import particledata from './assets/particles';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Loader from './components/main/Loader';
import './App.css';

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const addUser = (inp) => setUser(inp);
  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) return signOut();
      axios.get('/user', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => {
        setUser({ id: res.data.id, name: res.data.name });
        setLoading(false);
      })
      .catch(err => signOut());
  }, []);


  if (loading) return <Loader big >Loading...</Loader>;
  return (
    <div className="App">
    <div className='particles-container'><Particles options={particledata} /></div>
    {user ? <Home user={user} signOut={signOut} /> : <Auth addUser={addUser} />}
    </div>
  );
}

export default App;
