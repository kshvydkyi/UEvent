// import logo from '../../assets/images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next'
import React from "react";
import i18n from "i18next";
import { useLocation } from 'react-router-dom';

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
    const { t } = this.props;
    const { lang } = localStorage.getItem("lang");


    return (
      <div>
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
          </Container>
        </Navbar>
      </div>
    )
  }
}
export default Header;