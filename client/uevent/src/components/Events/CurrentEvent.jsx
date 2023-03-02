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

  function toRedirect(id) {
    navigate(`/createEventItem/${id}`)
  };







  return (
    <>
      <br />
      <section>

      </section>
      <div className='d-flex justify-content-center  flex-wrap'>
        {
                <>
                  <div>
                    <br/>
                  <div class="upload-btn-wrapper">
                      <button onClick={() => toRedirect(events.id)} id="btn_create_event" class="btn_create_event">{lang === 'ua' ? `Створити Подію для ${events.title}` : `Create Event for ${events.title}`}</button>
                      <input type="button" name="myfile" />
                    </div>
                    <section>
                      <div  className="events">
                        <ul>
                          <li>
                            <div className="time">  
                              <img  src={`${route.serverURL}/event-pic/${events.event_pic}`} width='300px' height="400" alt='Шарікс'
                              style={{cursor: 'pointer'}} onClick={() => window.location=`/event/${events.id}`}></img>
                            </div>
                            <div className="details">
                              <div style={{ float: 'right' }}>
                              </div>
                              <h3 style={{ color: 'black' }}>{events.title}</h3>
                              <p style={{ color: 'black' }}>{events.description}</p>
                              <p style={{ color: 'black' }}>{formatedDate}</p>
                              <p style={{ color: 'black' }}>{events.formatName}</p>
                              <a href="/">{events.companyName}</a>
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
                  <br />
                </>
        }
      </div>


    </>
  )
}

export default CurrentEvent;