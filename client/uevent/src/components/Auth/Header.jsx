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
  function langChange(e)  {
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
				checkToken(currentUser.accessToken, setAuth);
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
      <div className={`Header${localStorage.getItem("theme")}`}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container >
            {/* <img src={logo} height={40} alt='logo' /> */}
            <Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            {auth.user ?
								<>
									<div className='float-right'>
										<div className='d-flex '>
											<Nav.Link className='link-header' href={`/user/${currentUser.userId}`}>{currentUser.user}</Nav.Link>
											<img src={userAvatar && userAvatar !== 'undefined' && userAvatar !== undefined ? `${route.serverURL}/avatars/${userAvatar}` : `${route.serverURL}/avatars/default_avatar.png`} className='link-header border border-secondary rounded-circle' height={40} width={40} alt='avatar' />
										</div>
											

									</div>
								</>
								:
								<>
									<Nav.Link href="/login">{localStorage.getItem("lang") === 'ua' ? 'Вхід' : 'Login'}</Nav.Link>
									<Nav.Link eventKey={2} href="/registration">
                  {localStorage.getItem("lang") === 'ua' ? 'Реєстрація' : 'Register'}
									</Nav.Link>
								</>}
            </Navbar.Collapse>
            <select
              className="selectBox"
              onChange={langChange}
              name="lang"
              value={localStorage.getItem("lang")}
            >
              
                <option className="optionsMenu" value="ua">
                  Українська
                </option>
              <option className="optionsMenu" value="en">
                English
              </option>
            </select>

            {/* <div class="toggle-button-cover">
            <div class="button-cover">
              <div class="button r" id="button-1">
                <input type="checkbox" class="checkbox" onChange={changeTheme}/>
                <div class="knobs"></div>
                <div class="layer"></div>
              </div>
            </div>
          </div> */}

          </Container>
        </Navbar>
      </div>
    )
  }
export default Header;