import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../api/axios';

const URL = `/api/auth/active-email/`;

const ConfirmEmail = () => {
    const lang  = localStorage.getItem('lang');
    const { token } = useParams();
    const [active, setActive] = useState(lang === 'ua' ? 'Зараз чекаємо на активацію пошти' 
    : 'Waiting for email activation' );
    const navigate = useNavigate();  
    useEffect(() => {
        const fetch = async () => {
            try {
                await axios.post(URL + token);  
                setActive( lang === 'ua' ? "Активація пошти успішна, ви зможете залогінитись через декілька секунд" 
                : 'Email activation is successfull');
                setTimeout(() => navigate('/login'), 5000);
            } 
            catch (e) {
                setActive(lang === 'ua' ? "Скоріш за все, ви не встигли активувати пошту. Спробуйте знову" : 'Token expired. Try again');
                setTimeout(() => navigate('/registration'), 5000);

            }

        }
        fetch();

    }, []);
    return (
        <div className="form-background p-5 d-flex justify-content-center">
            <section className="email-reg text-white">
                <h1 className="text-center">{ lang === 'ua' ? "Результат реєстрації" : 'Result of registration' }</h1>
                <p className="text-center">{active}</p>
            </section>
        </div>   
    )
}

export default ConfirmEmail;