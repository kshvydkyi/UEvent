import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Translation } from "react-i18next";

const Layout = () => {
    return (
        <>
        <header>
            <Translation>{t => <Header t={t} />}</Translation>
        </header>
        <main>
                <Outlet />
        </main>
        </>
    )
}

export default Layout