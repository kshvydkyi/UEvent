import { useRef, useState, useEffect } from "react";
import axios from '../../api/axios';
import SpinnerLoading from "../Other/Spinner";
import {useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
const LOGIN_URL = '/api/auth/login';



const Login = () => {

    // const state = {
    //     lang: "ua"
    //   };
    // const langChange = e => {
    //     this.setState({ [e.target.name]: e.target.value }, () => {
    //       localStorage.setItem("lang", this.state.lang);
    //       const lang = localStorage.getItem("lang");
    //       i18n.changeLanguage(lang);
    //     });
    //   };

    const lang  = localStorage.getItem('lang');
    console.log(lang);
    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [isLoading, setLoading] = useState(false);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user, pwd);
            setLoading(true);
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ login: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(response);
            // console.log(response?.data.status, response?.data?.values);
            const accessToken = response?.data?.values?.values?.token;
            const role = response?.data?.values?.values?.userData?.title;
            const userId = response?.data?.values?.values?.userData?.id;
            setAuth({ user, accessToken, role, userId});
            // console.log(userId)
            localStorage.setItem('autorized', JSON.stringify({user, accessToken, role, userId}))
            setUser('');
            setPwd('');
            setLoading(false);
            navigate(from, {replace: true});
            
        }
        catch (err) {
            setLoading(false);
            if (!err?.response) {
                setErrMsg('???????????? ??????????');
            } else if (err.response.data.values.message === `User with login - ${user} does not exist`) {
                setErrMsg('?????????????????????? ?? ?????????? ?????????????? ???? ??????????');
            }
            else if (err.response.data.values.message === 'Passwords do not match') {
                setErrMsg('???????????? ???? ??????????????????');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }

    }



    return (
        <div className="form-background p-5 d-flex justify-content-center">
        

        <section className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className="text-center">{ lang === 'ua' ? '????????' : 'Login' }</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
            <Form.Label className="form_label " htmlFor="login">{ lang === 'ua' ? '??????????:' : 'Login:' }</Form.Label>
            <Form.Control
                type="text"
                className="bg-dark text-white"
                id="login"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />
            <Form.Label className="login-lbl mt-3 " htmlFor="password">{ lang === 'ua' ? '????????????' : 'Password' }</Form.Label>
            <Form.Control
                type="password"
                className="bg-dark text-white"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <Button  variant="secondary" type="submit" className="w-100 mt-4" disabled={isLoading}>{isLoading ? <SpinnerLoading /> : 
            lang === 'ua' ? '????????' : 'Login' }
            </Button >
        </form>
        
        <div className="d-flex mt-3">
            <p className="m-1">{ lang === 'ua' ? '?? ???????? ?????????? ???????????????' : 'No account?' }</p> 
            <Nav.Link className="m-1" href="/registration">{ lang === 'ua' ? '??????????????????????????????' : 'Register' }</Nav.Link>
        </div>
        
        <div  className="d-flex">
            <p className="m-1">{ lang === 'ua' ? '???????????? ????????????' : 'Forget password?' }</p>  
            <Nav.Link className="m-1" href="/reset-password">{ lang === 'ua' ? '?????????????????? ????????????' : 'Reset password' }</Nav.Link>
        </div>
    </section>
    </div>
      );
}

export default Login;