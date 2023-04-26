import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import Form from 'react-bootstrap/Form';
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const RESETPASS_URL = '/api/auth/password-reset';

const ResetPassword = () => {
    const errRef = useRef();
    const lang  = localStorage.getItem('lang');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const resetPassword = async (e) =>{
        e.preventDefault();
        const v = EMAIL_REGEX.test(email);
        if (!v) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            setLoading(true);
            console.log(email)
            const response = await axios.post(RESETPASS_URL, 
                JSON.stringify({email: email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data.status, response?.data.values.message);
            setSuccess(true);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            if (!err?.response) {
                setErrMsg(lang === 'ua' ? "Сервер спить" : 'Server is busy');
            }
            else if(err.response.data.values.message === `User with email - ${email} does not exist`){
                setErrMsg(lang === 'ua' ? "Email не існує" : 'Email does not exist');
            }
            else{
                setErrMsg(lang === 'ua' ? "Щось пішло не так" : 'Something wrong');
            }
            errRef.current.focus();
        }
    }

    return(
        <>
        <div className="form-background p-5 d-flex justify-content-center text-white">
        {success ? (
                <section className="reset-passSection email-reg  bg-dark text-white rounded d-flex flex-column p-3 justify-content-center">
                    <h1 className="text-center">{lang === 'ua' ? "Відновлення паролю" : 'Reset password'}</h1>
                    
                    <p className="reset-msg">{lang === 'ua' ? "Посилання на відновлення паролю було відправлено на ваш email." : 'The message to reset password was sent to your email'}</p>
                </section>       
            ) : (
        <section  className='registration bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>{lang === 'ua' ? "Відновлення паролю" : 'Reset password'}</h1>
            <form onSubmit={resetPassword}>
             <Form.Label className="form_label" htmlFor="email">
             {lang === 'ua' ? "Електрона пошта:" : 'Email:'}
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
                            {lang === 'ua' ? "Ваша пошта для відновлення паролю" : 'Your email to reset password'}
                        </p>
                        <Button  type="submit" variant="secondary" className="login-btn rounded"  disabled={isLoading}>{isLoading ? <SpinnerLoading /> : 'Відновити пароль'}</Button>
                    </form>
        </section>
            )}
            </div>
        </>
    )

}
export default ResetPassword;