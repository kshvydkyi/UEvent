import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import i18n from "./components/LangConfig";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
	<AuthProvider >
       <Routes>
        <Route path='/*' element={<App />} />
        </Routes>
    </AuthProvider>
	</BrowserRouter>
);



