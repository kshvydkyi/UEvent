import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FULLNAME_REGEX = /^['а-яА-ЯїЇґҐіІєЄa-zA-Z\s]{2,24}$/;
const ChangeProfile = () => {
    const lang  = localStorage.getItem('lang');
    const errRef = useRef();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('autorized'));
    const [errMsg, setErrMsg] = useState('');

    const [changedLogin, setChangedLogin] = useState('');
    const [validChangedLogin, setValidChangedLogin] = useState(false);

    const [changedFullName, setChangedFullName] = useState('');
    const [validChangedFullName, setValidChangedFullName] = useState(false);

    const [changedEmail, setChangedEmail] = useState('');
    const [validChangedEmail, setValidChangedEmail] = useState(false);

    const [image, setImage] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setValidChangedLogin(USER_REGEX.test(changedLogin));
    }, [changedLogin]);

    useEffect(() => {
        setValidChangedFullName(FULLNAME_REGEX.test(changedFullName));
    }, [changedFullName]);

    useEffect(() => {
        setValidChangedEmail(EMAIL_REGEX.test(changedEmail));
    }, [changedEmail]);


    const setHidden = () => {
        setTimeout(() => setErrMsg(''), 5000);
    }

    const UpdateUserData = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.patch(`/api/users/${user.userId}/${user.accessToken}`, JSON.stringify({ login: changedLogin, email: changedEmail, full_name: changedFullName }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }) 
            localStorage.setItem('autorized', JSON.stringify({ accessToken: user.accessToken, role: user.role, user: changedLogin, userId: user.userId }))
            // console.log(response); 
            setLoading(false);
            navigate(`/user/${user.userId}`);
            document.location.reload();
        }
        catch (err) {
            setLoading(false);
            if (err?.response.data.status === 409) {
                setErrMsg(lang === 'ua' ? 'Такий логін або емейл існує' : 'Such login or email exists');
                setHidden();
            }
            else if (err?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                navigate('/500')
            }
        }
    }
    const getUserInfo = async () => {
        try {
            const response = await axios.get(`/api/users/${user.userId}`);
            console.log(response);
            setChangedLogin(response.data.values.values.login);
            setChangedFullName(response.data.values.values.full_name);
            setChangedEmail(response.data.values.values.email);


        }
        catch (e) {
            // console.log(e)
            if (e?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                navigate('/500');
            }
        }
    }
    useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2 className="text-center">{ lang === 'ua' ? 'Редагування профілю' : 'Edit Profile' }</h2>
                    <form className="d-flex flex-column  justify-content-center" onSubmit={UpdateUserData}>
                        <Form.Label className="form_label" htmlFor="change-login">{ lang === 'ua' ? 'Логін' : 'Login' }
                            <FontAwesomeIcon icon={faCheck} className={validChangedLogin ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validChangedLogin || !changedLogin ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="change-login"
                            autoComplete="off"
                            onChange={(e) => setChangedLogin(e.target.value)}
                            value={changedLogin}
                        />
                        <Form.Label className="form_label" htmlFor="change-full-name">{ lang === 'ua' ? 'Нікнейм' : 'Nickname' }
                            <FontAwesomeIcon icon={faCheck} className={validChangedFullName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validChangedFullName || !changedFullName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type='text'
                            id='change-full-name'
                            className='bg-dark text-white  mb-3'
                            autoComplete="off"
                            onChange={(e) => setChangedFullName(e.target.value)}
                            value={changedFullName}
                        />
                        <Form.Label className="form_label" htmlFor="change-email">{ lang === 'ua' ? 'Пошта' : 'Email' }
                            <FontAwesomeIcon icon={faCheck} className={validChangedEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validChangedEmail || !changedEmail ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type='text'
                            id='change-email'
                            className='bg-dark text-white  mb-3'
                            autoComplete="off"
                            onChange={(e) => setChangedEmail(e.target.value)}
                            value={changedEmail}
                        />
                        <Button  variant="secondary" type="submit"disabled={!validChangedLogin || !validChangedEmail || !validChangedFullName || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> :  lang === 'ua' ? 'Змінити' : 'Save' }</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangeProfile;