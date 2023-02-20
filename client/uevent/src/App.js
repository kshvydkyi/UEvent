import logo from './logo.svg';
import './App.css';
import React from "react";
import { Translation } from "react-i18next";
import ChangeLang from "./components/ChangeLang";

function App() {
  return (
    <div className="App">
      <Translation>{t => <ChangeLang t={t} />}</Translation>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}



export default function App() {
  return (
    <div className="App">
      <Translation>{t => <ChangeLang t={t} />}</Translation>
    </div>
  );
}


export default App;
