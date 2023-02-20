import logo from './logo.svg';
import './App.css';
import React from "react";
import { Translation } from "react-i18next";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Translation>{t => <Header t={t} />}</Translation>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </div>
  );
}




export default App;
