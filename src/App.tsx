import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DashboardView } from './components/Dashboard';

function App() {
  return (
    <div className="App">
      {/* <div className="App__sidebar"></div> */}
      <DashboardView />
    </div>
  );
}

export default App;
