// import logo from '../../assets/images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
import '../../App.css';
import React, { useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';

const checkToken = async (token, setAuth) => {
  try {
    const response = await axios.get(`/api/users/check-token/${token}`);
  }
  catch (e) {
    if (e?.response.data.status === 401) {
      localStorage.removeItem('autorized');
      setAuth(false);
    }
  }
}

function Header() {
  function langChange(e) {
    localStorage.setItem("lang", e.target.value);
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang);
    document.location.reload();

  };
  const lang = localStorage.getItem("lang");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    if (currentUser.currentUser !== 'guest') {
      if (auth) {
        // checkToken(currentUser.accessToken, setAuth);
        if (currentUser) {
          setAuth({ ...currentUser });
        } else {
          setAuth(false);
        }
      }
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`/api/users/${currentUser.userId}`);
      // console.log('userAvatar', response);
      setUserAvatar(response.data.values.result);
    }
    catch (e) {
      console.log(e)
      navigate('/500');
    }
  }
  useEffect(() => {
    if (currentUser.currentUser !== 'guest') {
      getUserInfo();
    }
  }, []);

  async function toLogOut()  {
    try {
        localStorage.removeItem('autorized');
        setAuth(false);
        navigate('/');
        document.location.reload();

    }
    catch (e) {
        navigate('/500');
    }
}

  return (
    <div className='wrapper-navbar'>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className='d-flex'>
        <Container className='d-flex justify-content-around'>
          {/* <img src={logo} height={40} alt='logo' /> */}

          <Navbar.Brand className="" href="/" data-value="Kvitochok">Kvitochok</Navbar.Brand>
          {/* <Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand> */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}

          {auth.user ?
            <>

              <Nav.Link href="/tickets">{lang === 'ua' ? 'Мої квитки' : 'Tickets'}</Nav.Link>


              <Nav.Link href="/notifications">{lang === 'ua' ? 'Повідомлення' : 'Notifications'}</Nav.Link>


              <NavDropdown title={lang === 'ua' ? 'Компанії' : 'Companies'} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/companies">{lang === 'ua' ? 'Мої компанії' : 'My companies'}</NavDropdown.Item>
                <NavDropdown.Item href="/createCompany">{lang === 'ua' ? 'Створити Компанію' : 'Create Company'}</NavDropdown.Item>
                <NavDropdown.Item href="/createEvent">{lang === 'ua' ? 'Створити Подію' : 'Create Event'}</NavDropdown.Item>

              </NavDropdown>
              <NavDropdown title={lang === 'ua' ? 'Локації' : 'Locations'}>
                <NavDropdown.Item href="/locations">{lang === 'ua' ? 'Усі локації' : 'All locations'}</NavDropdown.Item>
                {
                  currentUser.role === 'admin' ?
                    <NavDropdown.Item href='/createLocation'>{lang === 'ua' ? 'Створити Локацію' : 'Create Location'}</NavDropdown.Item>
                    : <> </>
                }
              </NavDropdown>



              <select
                className="form-select bg-dark text-white"
                onChange={langChange}
                name="lang"
                style={{ minWidth: '7%', maxWidth: '8%' }}
                value={lang}
              >
                <option className="" value="ua">
                  UA
                </option>
                <option className="" value="en">
                  EN
                </option>
              </select>

              <div className='d-flex align-items-center' style={{ marginLeft: '20px' }}>
                <div className='d-flex align-items-center'>
                  <Nav.Link className='link-header' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
                  <img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
                  
                  <button title="Log Out" onClick = {() => toLogOut()} className = 'p-1 mb-1 bg-dark text-white' style = {{outline: 'none', border: '0px black'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                  </button>

                </div>
              </div>

            </>
            :
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link style={{ marginLeft: '30px' }} href="/login">{lang === 'ua' ? 'Вхід' : 'Login'}</Nav.Link>
                <Nav.Link eventKey={2} href="/registration" style={{ marginLeft: '20px' }}>
                  {lang === 'ua' ? 'Реєстрація' : 'Register'}
                </Nav.Link>
              </Navbar.Collapse>
              <select
                className="form-select bg-dark text-white w-25"
                onChange={langChange}
                name="lang"
                value={lang}
              >
                <option className="" value="ua">
                  Українська
                </option>
                <option className="" value="en">
                  English
                </option>
              </select>
            </>
          }



        </Container>
      </Navbar>
    </div>
  )
}
export default Header;