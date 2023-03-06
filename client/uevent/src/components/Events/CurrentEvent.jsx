import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
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


const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;




const CurrentEvent = () => {
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
    
  }, [])


  const normalFormat = moment(events.dateStart, moment.defaultFormat).toDate();
  const formatedDate = moment(normalFormat).format('D MMMM, h:mm');

  const normalFormatEnd = moment(events.dateEnd, moment.defaultFormat).toDate();
  const formatedDateEnd = moment(normalFormatEnd).format('D MMMM, h:mm');

  function toRedirect(id) {
    navigate(`/createEventItem/${id}`)
  };







  return (
    <>
      { events ? 
      <div className='d-flex justify-content-center' style = {{overflow:'auto', width: '700px'}}>
        <div>
        <section>
                      <div  className="events" >
                        <ul>
                          <li>
                            <div className="time">  
                              <img  src={`${route.serverURL}/event-pic/${events.event_pic}`} className="rounded" width='250px' height="350px"  alt='Шарікс'
                              style={{cursor: 'pointer'}} onClick={() => window.location=`/event/${events.id}`}></img>
                            </div>
                            <div className="details">
                              <div style={{ float: 'right' }}>
                              </div>
                              <h3 style={{ color: 'black' }}>{events.title}</h3>
                              <p style={{ color: 'black' }}>{events.description}</p>
                              <p style={{ color: 'black' }}>{formatedDate}  -  {formatedDateEnd}</p>
                              {
                                events.price !== 0 ? 
                                <p style={{ color: 'black' }}>{lang === 'ua' ? 'Ціна: ' : 'Price: '}{events.price}{lang === 'ua' ? 'грн. ' : 'grn.'}</p>
                                :
                                <p style={{ color: 'black' }}>{lang === 'ua' ? 'Вхід безкоштовний' : 'Entrance is free'}</p>
              
                              }
                              <p className="text-black">{lang === 'ua' ? 'Місце проведеня: ' : 'Location: '}{`${events?.location?.title} - ${events?.location?.country},
                              ${events?.location?.city}, ${lang === 'ua' ? 'вул. ' : 'st. '}${events?.location?.street} ${events?.location?.house}`}</p>
                         
                              {
                                events?.themes?.map((theme) => {
                                  
                                  return(
                                   <p className="text-black">{theme.title}</p>
                                    // <ul><li className="text-black">{theme.title}</li></ul>
                                   
                                    
                                  )

                                })
                              }
                              <p style={{ color: 'black' }}>{events.formatName}</p>
                              <a href={`/company/${events.company_id}`}>{events.companyName}</a>
                              <br />
                              <br />
                              <button className="button-28">{lang === 'ua' ? 'Записатися' : 'Sign up for the event'}</button>
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </li>
                        </ul>
                      </div>
                    </section>
              </div>
      </div>   
      :
      <p>Loading...</p>
    }
    </>
  )
}

export default CurrentEvent;