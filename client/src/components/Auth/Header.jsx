// import logo from '../../assets/images/icon.png'
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Collapse, Alert } from 'react-bootstrap';
import i18n from "i18next";
import '../../App.css';
import React, { useState } from 'react';
import axios from '../../api/axios';
import route from '../../api/route';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Select from 'react-select'
// const checkToken = async (token, setAuth) => {
//   try {
//     const response = await axios.get(`/api/users/check-token/${token}`);
//   }
//   catch (e) {
//     if (e?.response.data.status === 401) {
//       localStorage.removeItem('autorized');
//       setAuth(false);
//     }
//   }
// }
const langOptions = [{value: 'ua', label: 'UA'}, {value: 'en', label: 'ENG'}]
function Header() {
  function langChange(option) {
    localStorage.setItem("lang", option.value);
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang);
    document.location.reload();

  };
  const lang = localStorage.getItem("lang");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const [userAvatar, setUserAvatar] = useState();
  const [tickets, setTickets] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);


  const getTickets = async () => {
    const response = await axios.get(`/api/notifications/user-notifications/${currentUser.userId}`);
    setTickets(response.data.values.values);
  }

  useEffect(() => {
    getTickets();
  }, [])

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
      if (currentUser.currentUser !== 'guest') {
      const response = await axios.get(`/api/users/${currentUser.userId}`);
      // console.log('userAvatar', response);
      setUserAvatar(response.data.values.values.profile_pic);
      }
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

  async function toLogOut() {
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

  async function makeAsReadNotif(idTicket) {
    const response = await axios.delete(`/api/notifications/${idTicket}/${currentUser.accessToken}`)

    const res = await axios.get(`/api/notifications/user-notifications/${currentUser.userId}`);
    setTickets(res.data.values.values);

    // document.location.reload();
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'none',
      boxShadow: state.isFocused ? `` : '',
      transition: 'box-shadow 0.1s ease-in-out',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),

    input: (provided) => ({
      ...provided,
      color: 'white',
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'grey'
        : 'transparent',
      transition: '0.3s',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white'
    }),
    singleValueLabel: (provided) => ({
      ...provided,
      color: 'white'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(45, 45, 45)',
    }),
  }
  return (
    <div className='wrapper-navbar'>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className='d-flex'>
        <Container className='d-flex justify-content-around'>
          {/* <img src={logo} height={40} alt='logo' /> */}

          <Navbar.Brand className="" href="/events/?page=1" data-value="Kvitochok">KVIT😊CHOK</Navbar.Brand>
          {/* <Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand> */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}

          {auth.user ?
            <>
               <Navbar.Collapse className="justify-content-around"id="responsive-navbar-nav">
            
             
              <Nav.Link href="/tickets">{lang === 'ua' ? 'Мої квитки' : 'Tickets'}</Nav.Link>

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


              <Select 
              className='w-25 bg-dark'
              options={langOptions}
              styles={customStyles}
              value={lang==='ua' ? langOptions[0] : langOptions[1]}
              onChange={(option) => langChange(option)}

              />
              <div className='d-flex align-items-center ms-2'>
                <div className='d-flex align-items-center'>
                  <Nav.Link className='link-header' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
                  <img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
                  <Nav.Link onClick={() => setOpenNotif(!openNotif)} className='icon-button'>
                    <span title="Notification" className='p-1 mb-1 bg-dark text-white' style={{ outline: 'none', border: '0px black' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" fill="white">
                        </path>
                      </svg>
                    </span>
                    <span className="icon-button__badge text-white">{tickets.length}</span>
                  </Nav.Link>
                  <button title="Log Out" onClick={() => toLogOut()} className='p-1 mb-1 bg-dark text-white' style={{ outline: 'none', border: '0px black' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                  </button>

                </div>
              </div>
              </Navbar.Collapse>
            </>
            :
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link style={{ marginLeft: '30px' }} href="/login">{lang === 'ua' ? 'Вхід' : 'Login'}</Nav.Link>
                <Nav.Link eventKey={2} href="/registration" style={{ marginLeft: '20px' }}>
                  {lang === 'ua' ? 'Реєстрація' : 'Register'}
                </Nav.Link>
              </Navbar.Collapse>
              <Select 
              className='w-25 bg-dark'
              options={langOptions}
              styles={customStyles}
              value={lang==='ua' ? langOptions[0] : langOptions[1]}
              onChange={(option) => langChange(option)}

              />
            </>
          }



        </Container>
      </Navbar>

      {/* Notifications */}

      <Collapse className='ms-3 w-25 fixed-bottom' in={openNotif}>
        <div>
          <Alert variant="dark">
            <Alert.Heading >{lang === 'ua' ? 'Повідомлення' : 'Notifications'}</Alert.Heading>
            <>
              {
                (tickets.length !== 0) && (Array.isArray(tickets))
                  ?
                  tickets.map((ticket) => {
                    return (
                      <div className='border border-dark rounded mt-2 overflow-auto'>
                        <p className='mx-2'>{lang === 'ua' ? 'Ви купили квиток' : 'You have just bought a ticket'} - {ticket.title}
                          <span onClick={() => makeAsReadNotif(ticket.id)} role="button" title='Make as read' className="bi bi-x bg-danger text-white mx-2"></span>
                        </p>
                      </div>
                    )
                  })
                  :
                  <p>{lang === 'ua' ? 'Повідомлень немає' : 'No notifications'}</p>

              }
            </>

          </Alert>
        </div>
      </Collapse>
    </div>
  )
}
export default Header;