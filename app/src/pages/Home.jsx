import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/main/Header';
import MainInput from '../components/main/MainInput';
import Output from '../components/main/Output';
import Loader from '../components/main/Loader';
import PinnedList from '../components/main/PinnedList';
import './Home.css';

const Home = ({ user, signOut }) => {

  const [ input, setInput ] = useState('');
  const [ output, setOutput ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ pinned, setPinned ] = useState([]);
  const [ pinErr, setPinErr ] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    axios.get('/pinned', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      if (res.data.length > 0) {
        setPinned(res.data);
      }})
    .catch(err => console.log(err));
    }, []);

  const currentHour = (new Date()).getHours();
  const greeting = currentHour >= 4 && currentHour < 13 ? 'morning' : currentHour >= 13 && currentHour < 19 ? 'afternoon' : 'evening';

  const inputChange = (e) => {
      setError('');
      setInput(e.target.value)
  }

  const scanImage = () => {
      if (input.trim().length <= 0) return;
      setOutput('');
      setLoading(true);
      axios.post('/scan', { input: input })
      .then(res => {
        if (res.data.length <= 0) {
          setLoading(false);
          return setError('This image does not contain any text, or the text is unintelligible');
        }
        const final = res.data.join('\n');
        setLoading(false);
        setOutput(final);
      })
      .catch(err => {
        if (err.response.data.code === 13) {
          setLoading(false);
          return setError(err.response.data.details);
        }
        setLoading(false);
        setError(err.response.data);
      });
  }

  const pinText = (textdata) => {
    const token = JSON.parse(localStorage.getItem('token'));
    axios.post('/pinned', { content: textdata }, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => setPinned(prev => {
      return [...prev, res.data]
    }))
    .catch(err => setPinErr("Unable to pin (make sure this text isn't already pinned)"));
  }

  const deletePin = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    axios.delete(`/pinned/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
      const newPinned = pinned.filter(item => item.id !== id);
      setPinned(newPinned);
    }).catch(err => setPinErr('Error: unable to delete this pin'));
  }

  return(
    <div className='home'>
      <Header signOut={signOut} />
      <h4 className='home__welcome'>Good {greeting}, {user.name}</h4>
      <p className='home__desc'>ScanSight uses artificial intelligence to detect letters/symbols in your images and convert them to plain text that you can copy and use on your computer. <br /><br /> The process is simple, just paste your link into the field below, click "Scan", and we'll take care of the rest!</p>
      <MainInput change={inputChange} val={input} submit={scanImage} />
      {loading && <Loader>Scanning...</Loader>}
      {error && <p className='home__error'>Error: {error}</p>}
      <Output text={output} pin={pinText} />
      {pinErr && <p className='home__error'>{pinErr}</p>}
      {pinned.length > 0 && <PinnedList posts={pinned} deleteText={(inp) => deletePin(inp)} />}
    </div>
  );
}

export default Home;
