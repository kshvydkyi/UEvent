import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import moment from 'moment';

const Ticket = () => {
  const lang = localStorage.getItem('lang');
  const [tickets, setTickets] = useState([]);
  const [isPageLoading, setIsLoadingPage] = useState(true);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const { search } = useLocation();
  const page = search.split('=');
  const [isLoading, setLoading] = useState(false);


  const getTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/byUserId/${currentUser.userId}/?page=1`);
      setTickets(response.data.values.data);
      setPageCount(response.data.values.meta.totalPages);
      setIsLoadingPage(false);
    } catch (error) {
      console.log(error)
      setIsLoadingPage(false)
    }

  }

  useEffect(() => {
    getTickets();
  }, [])


  const [pageCount, setPageCount] = useState(0);


  const handlePageClick = async (data) => {
    navigate(`/tickets/?page=${data.selected + 1}`);
    window.scrollTo(0, 0)
    setIsLoadingPage(true)
    const response = await axios.get(`/api/tickets/byUserId/${currentUser.userId}/?page=${data.selected + 1}`);
    // console.log(response);
    setTickets(response.data.values.data);
    setIsLoadingPage(false)
  }





  return isPageLoading ? <SpinnerLoading style={{ style: 'page-loading' }} /> : (
    <>
      {
        (tickets.length !== 0) && (Array.isArray(tickets))
          ?
          tickets.map((ticket) => {
            const normalFormatStart = moment(ticket?.event?.dateStart, moment.defaultFormat).toDate();
            const formatedDateStart = moment(normalFormatStart).format('D MMMM, HH:mm');
            const normalFormatEnd = moment(ticket?.event?.dateEnd, moment.defaultFormat).toDate();
            const formatedDateEnd = moment(normalFormatEnd).format('D MMMM, HH:mm');

            return (
              <>
                <div className="card d-flex justify-content-center w-50 m-auto bg-dark text-white mb-3 mt-3">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <img src={`${route.serverURL}/event-pic/${ticket?.event?.event_pic}`} className="rounded" width='200px' height="300px" alt='Шарікс'></img>
                    <div className="ms-3">
                      <a className="card-title text-decoration-none text-white h4" href={`/event/${ticket?.event?.id}`} >{ticket?.event?.title}</a>
                      <div className="mt-2">
                        <span className="bi bi-calendar">
                          <span className='px-2'>{formatedDateStart} - {formatedDateEnd}</span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="bi bi-geo mt-5">
                          <span className='px-2'>{ticket?.location.title}</span>
                        </span>

                      </div>
                      <Button variant="secondary" className="mt-2" target="_blank" href={`${route.serverURL}/tickets/${ticket?.secret_code}.pdf`} >{lang === 'ua' ? 'Подивитись квиток' : "See ticket"}</Button>
                      
                    </div>
                    <img src={`${route.serverURL}/qr-codes/${ticket?.secret_code}.png`} className="rounded ms-2" width='200px' height="200px" alt='Шарікс'></img>
                    {/* <img src={`${route.serverURL}/qr-codes/${ticket?.secret_code}.png`} className="rounded" width='200px' height="200px" alt='Шарікс'></img> */}




                  </div>

                </div>

              </>
            )
          })
          :
           <h1 className="mt-2 text-center">{lang === 'ua' ? 'У вас поки що немає квитків' : 'You still have no tickets'}</h1>
      }

      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        forcePage={+page[1] - 1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={''}
        pageLinkClassName={''}
        previousClassName={''}
        previousLinkClassName={''}
        nextClassItem={''}
        nextLinkClassName={''}
        breakClassName={''}
        breakLinkClassName={''}
        activeClassName={'active'}
      />



    </>
  )
}

export default Ticket;