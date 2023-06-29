import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import { Container } from '@mui/material';
import Register from './Components/Register/Register';

function App() {
  
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Login />
    </Container>
  );
}



export default App;
