import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Translation } from "react-i18next";
import '../../App.css';
import '../../App.scss';
import React, { useState,useEffect  } from 'react';

const Layout = () => {
    // localStorage.setItem("theme", 'dark')
    const [theme, setTheme] = useState(localStorage.getItem("theme"));


    return (
        <div className={`App${theme}`}>
        <header>
            <Translation>{t => <Header t={t}> </Header>}</Translation>
        </header>
        <main>
                <Outlet />
        </main>
        </div>
    )
}

export default Layout