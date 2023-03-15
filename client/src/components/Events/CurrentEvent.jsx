import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import './Event.css'
import moment from 'moment';
import route from "../../api/route";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select'
import StripeCheckout from 'react-stripe-checkout'
import Toast from 'react-bootstrap/Toast';
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'


const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;




const CurrentEvent = () => {
  // toast.configure()

  const location = useLocation().pathname.split('/');
  const currentId = location[2];
  const lang = localStorage.getItem('lang');
  const [events, setEvents] = useState([]);
  const [eventLocation, setEventLocation] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [eventName, setEventName] = useState('');
  const [validCompanyName, setValidCompanyName] = useState(false);

  const [eventDescr, setEventDescr] = useState('');
  const [validcompanyDescr, setValidCompanyDescr] = useState(false);


  const [eventId, setEventId] = useState();

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    setValidCompanyName(COMPANY_REGEX.test(eventName));
  }, [eventName]);

  useEffect(() => {
    setValidCompanyDescr(DESCR_REGEX.test(eventDescr));
  }, [eventDescr]);


  const getEvents = async () => {
    const response = await axios.get(`/api/events/${currentId}`);
    setEvents(response.data.values.values);
  }

  useEffect(() => {
    getEvents();
    console.log('evnt1s', events)
  }, [])


  const normalFormat = moment(events.dateStart, moment.defaultFormat).toDate();
  const formatedDate = moment(normalFormat).format('D MMMM, HH:mm');

  const normalFormatEnd = moment(events.dateEnd, moment.defaultFormat).toDate();
  const formatedDateEnd = moment(normalFormatEnd).format('D MMMM, HH:mm');

  function toRedirect(id) {
    navigate(`/createEventItem/${id}`)
  };

  const [succesPurchase, setSuccesPurchase] = useState(false);

  async function handleToken(token, email) {
    const response = await axios.post(`/api/events/checkout`,
      JSON.stringify({
        name: events.title,
        eventId: events.id,
        price: events.price,
        token: token,
        user_id: currentUser.userId,
        startDate: formatedDate,
        endDate: formatedDateEnd,
        location: events.location,
        event_pic: events.event_pic,
        user_login: currentUser.user
      }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    console.log(response);
    setSuccesPurchase(response.data.status === 200 ? true : false)
    console.log(succesPurchase);
    document.location.reload();
  }




  return (
    <>
      {events ?

        <div className='w-100 d-flex justify-content-center text-align-center'>
          {/* {
          succesPurchase ? 
          <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..."/>
            <strong className="me-auto">Kvitochok</strong>
            <small>11 mins ago</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div> : <></>
        
          } */}

          <div className="mt-5 container" >
            <div className="card mb-3 bg-dark">
              <div className="d-flex">
                <div className="">
                  <img src={`${route.serverURL}/event-pic/${events.event_pic}`} className="rounded d-block" width='300px' height="500px" alt='Шарікс'
                    onClick={() => window.location = `/event/${events.id}`}>

                  </img>
                </div>
                <div className="">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <h3 className="d-block">{events.title}</h3>
                      <p className="h6 ms-3">{events.formatName}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="bi bi-calendar-date">
                        <span className="ms-1">{formatedDate} - {formatedDateEnd}</span>
                      </span>
                      <span className="bi bi-geo ms-3">
                        <span className=" ms-1">
                          {`${events?.location?.title} - ${events?.location?.country},
                        ${events?.location?.city}, ${lang === 'ua' ? 'вул. ' : 'st. '}${events?.location?.street} ${events?.location?.house}`}
                        </span>
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="bi bi-card-text">
                        <span className="ms-1">{events.description}</span>
                      </span>
                    </div>
                    <div className="mt-3">
                    {
                      events.price !== 0 ?
                        
                          <span className="bi bi-cash-stack mt-3">
                            <span className="ms-1">{events.price} {lang === 'ua' ? 'грн. ' : 'UAH.'}</span>
                          </span>
                        
                        :
                        <span className="mt-3">{lang === 'ua' ? 'Вхід безкоштовний' : 'Entrance is free'}</span>
                    }
                    <span className="bi bi-ticket-perforated ms-5">
                      <span className="ms-1">{events.ticketsCount}</span>
                    </span>
                    </div>

                    <div className="d-flex mt-3">
                      {
                        events?.themes?.map((theme) => {
                          return (
                            <div>
                              <p className="badge rounded-pill bg-secondary fs-6 me-3">{theme.title}</p>
                            </div>
                          )
                        })
                      }
                    </div>

                    <Button variant="outline-light" className="mb-3" onClick={() => navigate(`/company/${events.company_id}`)}>{events.companyName}</Button>
                    <div>
                      <p>{events.ticketsCount === 0 ? lang === 'ua' ? 'Усі квитки продані' : 'All tickets are sold' : ''}</p>
                    </div>
                    <div>
                      {events.price === 0 ?
                        <Button onClick={() => handleToken()} className="" disabled={events.ticketsCount === 0 ? true : false}>
                          {lang === 'ua' ? 'Записатися' : 'Sign up for the event'}
                        </Button>
                        :
                        <StripeCheckout
                          disabled={events.ticketsCount === 0 ? true : false}
                          className="text-black mb-5"
                          panelLabel="Pay"
                          image={`${route.serverURL}/event-pic/${events.event_pic}`}
                          stripeKey='pk_test_51Mixi5EPLqByaBcpL2haakXv0c55d86UjBgpP7F9KxWVYE1mnedNH9PoCDftvaAfUAaBRcALgfODpCdWJERP8eH200XPb8qa6m'
                          amount={+events.price * 100}
                          name={events.title}
                          currency="UAH"
                          token={handleToken}
                        >
                          <Button variant="secondary" className="" disabled={events.ticketsCount === 0 ? true : false}>
                            {lang === 'ua' ? 'Купити квиток' : 'Buy ticket'}
                          </Button>
                        </StripeCheckout>
                      }
                      <Toast className='position-absolute top-0 end-0' onClose={() => setSuccesPurchase(false)} show={succesPurchase} delay={4000} autohide>
                        <Toast.Header>
                          <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt="123"
                          />
                          <strong className="me-auto">{lang === 'ua' ? 'Успішно!' : 'Sucess!'}</strong>
                        </Toast.Header>
                        <Toast.Body className='dark'>{lang === 'ua' ? 'Ви успішно записалися на подію!' : 'You\'ve been successfully signed up at the event!'}</Toast.Body>
                      </Toast>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <p>Loading...</p>
      }
    </>
  )
}

export default CurrentEvent;