import React from 'react';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import Hello from './Hello';

function App() {
  return (
    <div className="App">
      <Hello name='Adi' enthusiasmLevel={2}></Hello>
    </div>
  );
}

export default App;
