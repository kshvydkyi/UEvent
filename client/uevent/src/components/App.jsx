// import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Auth/Layout';
import { Translation } from "react-i18next";
import Login from './Auth/Login';
import Register from './Auth/Register';
import ConfirmEmail from './Auth/ConfirmEmail';



function App() {
	if (!localStorage.getItem("lang")) {
		localStorage.setItem('lang', 'ua')
	}
	if (!localStorage.getItem('autorized')) {
		localStorage.setItem(
			'autorized',
			JSON.stringify({ currentUser: 'guest' })
		);
	}



	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* Auth module */}
				{/* <Translation>{t => <Header t={t} />}</Translation> */}
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Register />} />
				<Route path='confirm-email/:token' element={<ConfirmEmail />} />
			</Route>
		</Routes>
	);
}

export default App;