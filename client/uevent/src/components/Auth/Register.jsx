import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FULLNAME_REGEX = /^['а-яА-ЯїЇґҐіІєЄa-zA-Z\s]{2,24}$/
const REGISTER_URL = '/api/auth/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const lang  = localStorage.getItem('lang');
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [fullName, setFullName] = useState('');
    const [validFullName, setValidFullName] = useState(false);
    const [fullNameFocus, setFullNameFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidFullName(FULLNAME_REGEX.test(fullName));
    }, [fullName]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = FULLNAME_REGEX.test(fullName);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            setLoading(true);
            console.log( user, email, fullName, pwd, matchPwd);
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ login: user, email: email, fullName: fullName, password: pwd, confirmPassword: matchPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response);
            setSuccess(true);
            setLoading(false);
            console.log(success)
        }
        catch (err) {
            setLoading(false);
            console.log(err)
            if (!err?.response) {
                setErrMsg('Сервер спить, вибачте');
            }
            else if (err.response.data.values.message === `User with login - ${user} already exist`) {
                setErrMsg('Такий логін вже існує');
            }
            else if (err.response.data.values.message === `Email - ${email} invalid`) {
                setErrMsg('Якийсь дивний email');
            }
            else if (err.response.data.values.message === `User with email - ${email} already exist`) {
                setErrMsg('Цей email вже використовується');
            } else {
                setErrMsg('Шось не так');
            }
            errRef.current.focus();
        }
    }
    return (
        <>
        <div className="form-background p-5 d-flex justify-content-center text-white">
            {success ? (
                <section className="email-reg text-center  bg-dark text-white rounded d-flex flex-column p-3 justify-content-center">
                    <h1>{ lang === 'ua' ? 'Дякуємо за реєстрацію' : 'Thank you for being registered' }</h1>
                    <p>
                    { lang === 'ua' ? 'На ваш email було відправлено лист з підтвердженням. Коли ви підтверите email, ви зможете залогінитись' : 
                    'The message to approve your email was sent, then you will be able to sign in' }
                    </p> 
                </section>
            ) : (
                <section className='registration bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-center">{ lang === 'ua' ? 'Реєстрація' : 'Sign Up' }</h1>
                    <form onSubmit={handleSubmit} >
                        <Form.Label className="form_label" htmlFor="username">
                        { lang === 'ua' ? 'Логін:' : 'Login:' }
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            className="bg-dark text-white"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            
                            { lang === 'ua' ? '4-24 символи. Починається з літери. Дозволено: літери, числа, _ , -:' 
                            : '4-24 symbols' }
                        </p>
                        <Form.Label className="form_label" htmlFor="email">
                        { lang === 'ua' ? 'Електрона пошта:' 
                            : 'Email:' }
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            className="bg-dark text-white"
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            
                            { lang === 'ua' ? 'Ваша пошта для підтвердження' 
                            : 'Your mail to approve' }
                        </p>
                        <Form.Label className="form_label" htmlFor="full-name">
                            
                            { lang === 'ua' ? 'Ваше ім\'я або нікнейм:' 
                            : 'Your name or nickname' }
                            <FontAwesomeIcon icon={faCheck} className={validFullName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFullName || !fullName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                           className="bg-dark text-white"
                            type="text"
                            id="full-name"
                            autoComplete="off"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            required
                            aria-invalid={validFullName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFullNameFocus(true)}
                            onBlur={() => setFullNameFocus(false)}
                        />
                        <p id="uidnote" className={fullNameFocus && fullName && !validFullName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            
                            { lang === 'ua' ? 'Тут напишіть як до вас звертатись.' 
                            : 'How to name you' }
                        </p>
                        <Form.Label className="form_label" htmlFor="password">
                        { lang === 'ua' ? 'Пароль:' 
                            : 'Password:' }
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            className="bg-dark text-white"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            
                            { lang === 'ua' ? '8-24 символи. Містить маленькі і великі літери, число, і:' 
                            : '8-24 symbols. Lower and upper case letters, numbers and' }

                            <span aria-label="exclamation mark"> ! </span>
                            <span aria-label="at symbol">@ </span>
                            <span aria-label="hashtag"># </span>
                            <span aria-label="dollar sign">$ </span>
                            <span aria-label="percent">%</span>
                        </p>


                        <Form.Label className="form_label" htmlFor="confirm_pwd">
                            { lang === 'ua' ? 'Підтвердіть пароль:' 
                            : 'Repeat passord:' }
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                           className="bg-dark text-white"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            { lang === 'ua' ? ' Повинен збігатись з полем вище.' 
                            : 'Must be same as a password' }
                        </p>
                        <Button  type="submit" variant="secondary" className="w-100" disabled={!validName || !validPwd || !validMatch || !validEmail || !validFullName || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : 
                                                     lang === 'ua' ? 'Зареєструватись' 
                                                    : 'Sign Up' }</Button>
                    </form>
                    <div  className="d-flex">
                    <p className="m-1"> 
                   { lang === 'ua' ? 'Вже зареєстровані?' 
                            : 'Already hav an account?' }</p> 
                    <Nav.Link className="m-1" href="/login">                            
                    { lang === 'ua' ? 'Залогінітись' 
                            : 'Sign in' }</Nav.Link>
                    </div>
                </section>
            )}
            </div>
        </>
    )
}
export default Register;