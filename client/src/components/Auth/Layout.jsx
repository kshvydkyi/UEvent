import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Translation } from "react-i18next";
import '../../App.css';
import '../../App.scss';
import React, { useState } from 'react';
import Footer from '../Other/Footer';

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
            <footer><Footer /></footer>

        </div>
    )
}

export default Layout