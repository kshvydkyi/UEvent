// import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Auth/Layout';

import Login from './Auth/Login';
import Register from './Auth/Register';

function App() {
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
				<Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;