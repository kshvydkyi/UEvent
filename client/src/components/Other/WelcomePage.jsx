import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './WelcomPage.css'

export const WelcomePage = () => {
    const lang = localStorage.getItem('lang');
    const navigate = useNavigate();
    return (
        <div className="welcome-image">
            <div className='d-flex flex-column w-50 m-auto '>
                <h1 className=' welcome-page-name margin text-center'>KVITOCHOK</h1>
                <Button variant="outline-light" className='p-3 fs-1 outline-shadow' onClick={() => navigate(`/events?page=1`)}>{lang === 'ua' ? 'Почати свій тур' : 'Start your tour'}</Button>
            </div>
        </div>
    )
}
