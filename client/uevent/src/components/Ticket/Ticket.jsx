import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import ReactPaginate from 'react-paginate'
import '../../App.css'
import route from "../../api/route";

const Ticket = () => {
  const lang = localStorage.getItem('lang');
  const [tickets, setTickets] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [isLoading, setLoading] = useState(false);


  const getTickets = async () => {
    const response = await axios.get(`/api/tickets/byUserId/${currentUser.userId}`);
    console.log('response',response)
    setTickets(response.data.values.values);
  }

  useEffect(() => {
    getTickets();
  }, [])


  const downloadPDF = (token) => {
    fetch(`../../../../server/assets/tickets/${token}.pdf`).then(response => {
        response.blob().then(blob => {
            const fileURL = window.URL.createObjectURL('blob');
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = `aboba.pdf`;
            alink.click();
        })
    })
}




  return (
    <>
      {
        (tickets.length !== 0) && (Array.isArray(tickets))
          ?
          tickets.map((ticket) =>
            <>
              <div className="card d-flex justify-content-center w-25 m-auto bg-dark text-white mb-3 mt-4">
                <div className="card-body">
                  <h5 className="card-title" >{lang === 'ua' ? 'UserId: ' : 'UserId: '}{ticket.user_id}</h5>
                  <p className="card-text">{lang === 'ua' ? 'EventId: ' : 'EventId: '}{ticket.event_id}</p>
                  <p className="card-text">{lang === 'ua' ? 'Token: ' : 'Token: '}{ticket.secret_code}</p>
                  <button onClick={downloadPDF(ticket.secret_code)}>
                    Download PDF
                </button>
                </div>
              </div>
            </>
          )
          :
          <h1 className="mt-4">{lang === 'ua' ? 'У вас поки що немає квитків' : 'You still have no tickets'}</h1>
      }



    </>
  )
}

export default Ticket;