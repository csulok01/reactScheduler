import React from 'react';
import './App.css';
import {Router, View} from "react-navi";
import {routes} from './core/routes/routes'

function App() {
  return (
    <Router routes={routes}>
      <View></View>
    </Router>
  );
}

export default App;
