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

  return (
    <div className='wrapper-navbar'>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className='d-flex justify-content-between'>
          {/* <img src={logo} height={40} alt='logo' /> */}

          <Navbar.Brand className="" href="/" data-value="Kvitochok">Kvitochok</Navbar.Brand>
          {/* <Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand> */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}

          {auth.user ?
            <>
              <div style={{ width: '40%', float: 'left' }}>
                <Nav.Link href="/tickets">{localStorage.getItem("lang") === 'ua' ? 'Мої квитки' : 'Tickets'}</Nav.Link>
              </div>
              <div style={{ width: '40%', float: 'left' }}>
                <Nav.Link href="/notifications">{localStorage.getItem("lang") === 'ua' ? 'Повідомлення' : 'Notifications'}</Nav.Link>
              </div>
              <div style={{ width: '40%', float: 'left', marginLeft: '20px' }}>
                <Nav.Link href="/companies">{localStorage.getItem("lang") === 'ua' ? 'Мої компанії' : 'My companies'}</Nav.Link>
              </div>
              <div style={{ width: '40%', float: 'left', marginLeft: '20px' }}>
                <Nav.Link href="/locations">{localStorage.getItem("lang") === 'ua' ? 'Усі локації' : 'All locations'}</Nav.Link>
              </div>

              <select 
                className="form-select bg-dark text-white w-25"
                onChange={langChange}
                name="lang"
                value={localStorage.getItem("lang")}
              >
                <option className="" value="ua">
                  Українська
                </option>
                <option className="" value="en">
                  English
                </option>
              </select>

              <div className='d-flex align-items-center' style={{ marginLeft: '20px' }}>
                <div className='d-flex align-items-center'>
                  <Nav.Link className='link-header' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
                  <img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
                </div>
              </div>

            </>
            :
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link style={{ marginLeft: '30px' }} href="/login">{localStorage.getItem("lang") === 'ua' ? 'Вхід' : 'Login'}</Nav.Link>
                <Nav.Link eventKey={2} href="/registration" style={{ marginLeft: '20px' }}>
                  {localStorage.getItem("lang") === 'ua' ? 'Реєстрація' : 'Register'}
                </Nav.Link>
              </Navbar.Collapse>
              <select
                className="form-select"
                onChange={langChange}
                name="lang"
                value={localStorage.getItem("lang")}
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