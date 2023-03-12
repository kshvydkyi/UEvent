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
import Pagination from 'react-bootstrap/Pagination';



const Ticket = () => {
  const lang = localStorage.getItem('lang');
  const [tickets, setTickets] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [isLoading, setLoading] = useState(false);


  const getTickets = async () => {
    const response = await axios.get(`/api/tickets/byUserId/${currentUser.userId}/?page=1`);
    console.log('response',response)
    setTickets(response.data.values.data);
    setPageCount(response.data.values.meta.totalPages);
  }

  useEffect(() => {
    getTickets();
  }, [])


const [pageCount, setPageCount] = useState(0);


const handlePageClick = async (data) => {
  const response = await axios.get(`/api/tickets/?page=${data.selected + 1}`);
  console.log(response);
  setTickets(response.data.values.data);
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
                  <h5 className="card-title" >{lang === 'ua' ? 'Ваш квиток було відправлено на вашу пошту' : 'Your ticket was sent to your email'}</h5>
                  <img src={`${route.serverURL}/qr-codes/${ticket.secret_code}.png`} className="rounded" width='200px' height="200px" alt='Шарікс'></img>
     

                </div>
              </div>
            </>
          )
          :
          <h1 className="mt-4">{lang === 'ua' ? 'У вас поки що немає квитків' : 'You still have no tickets'}</h1>
      }

<ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassItem={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />



    </>
  )
}

export default Ticket;