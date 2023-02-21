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


const checkToken = async (token, setAuth) => {
	try {
		const response = await axios.get(`/api/users/check-token/${token}`);
		console.log(response.data.status, response.data.values.message);
	}
	catch (e) {
		// console.log(e);
		if (e?.response.data.status === 401) {
			localStorage.removeItem('autorized');
			setAuth(false);
		}
	}
}

class Header extends React.Component {

  
  state = {
    lang: "ua"
  };
  langChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      localStorage.setItem("lang", this.state.lang);
      const lang = localStorage.getItem("lang");
      i18n.changeLanguage(lang);
      document.location.reload();
    });
  };




  render() {
    function changeTheme(e) {
      e.target.checked === false ? localStorage.setItem("theme", 'dark') : localStorage.setItem("theme", 'light');
    }

    

    return (
      <div className={`Header${localStorage.getItem("theme")}`}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container >
            {/* <img src={logo} height={40} alt='logo' /> */}
            <Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href="/login">{localStorage.getItem("lang") === 'ua' ? 'Вхід' : 'Login'}</Nav.Link>
                <Nav.Link eventKey={2} href="/registration">
                  {localStorage.getItem("lang") === 'ua' ? 'Реєстрація' : 'Register'}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <select
              className="selectBox"
              onChange={this.langChange}
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
}
export default Header;