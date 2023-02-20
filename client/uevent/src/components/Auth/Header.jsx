// import logo from '../../assets/images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useTranslation} from 'react-i18next'
import React from "react";
import i18n from "i18next";

class Header extends React.Component {
      state = {
        lang: "en"
      };
       langChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => {
          localStorage.setItem("lang", this.state.lang);
          const lang = localStorage.getItem("lang");
          i18n.changeLanguage(lang);
        });
      };
      render() {
        const { t } = this.props;
        const { lang } = this.state;
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container >
					{/* <img src={logo} height={40} alt='logo' /> */}
					<Navbar.Brand href="/" target={'_blank'}>Concertik</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                    <Nav.Link href="/login">{ i18n.t('login') }</Nav.Link>
                    <Nav.Link eventKey={2} href="/registration">
                      { i18n.t('register') }
                    </Nav.Link>
                    </Nav>
					</Navbar.Collapse>
                    <select
                    className="selectBox"
                    onChange={this.langChange}
                    name="lang"
                    value={lang}
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