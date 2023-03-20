import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
export const CheckTicket = () => {

   const lang  = localStorage.getItem('lang');
    const { secretCode } = useParams();
    const [active, setActive] = useState(lang === 'ua' ? 'Перевіряємо ваш квиток' 
    : 'Waiting...' );
    console.log(secretCode);
    const navigate = useNavigate();  
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.post(`/api/tickets/check-ticket/${secretCode}`);  
                console.log(response);
                setActive( lang === 'ua' ? "Квиток успішно пройшов перевірку" 
                : 'The ticket was successfully checked');
                setTimeout(() => navigate('/'), 20000);
            } 
            catch (e) {
                if(e?.response.data.status === 404){
                    setActive(lang === 'ua' ? "Цей квиток більше не активний" : 'This ticket is inactive');
                    setTimeout(() => navigate('/?page=1'), 20000);
                }
                else{
                    setActive(lang === 'ua' ? "Виникла помилка на сервеві" : 'An server error occured');
                    navigate('/500');
                }
               
                console.log(e);
                // setTimeout(() => navigate('/registration'), 5000);

            }

        }
        fetch();

    }, []);
    return (
        <div className="form-background p-5 d-flex justify-content-center">
            <section className="email-reg text-white">
                <h1 className="text-center">{ lang === 'ua' ? "Перевірка вашого квитка" : 'Checking Ticket' }</h1>
                <p className="text-center">{active}</p>
            </section>
        </div>   
    )
}
