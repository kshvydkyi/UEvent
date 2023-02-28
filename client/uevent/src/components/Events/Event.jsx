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
import './Event.css'
import moment from 'moment';
import route from "../../api/route";

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;


const Event = () => {
  const lang = localStorage.getItem('lang');
  const [events, setEvents] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [companyName, setCompanyName] = useState('');
  const [validCompanyName, setValidCompanyName] = useState(false);

  const [companyDescr, setCompanyDescr] = useState('');
  const [validcompanyDescr, setValidCompanyDescr] = useState(false);

  const [companyId, setCompanyId] = useState();

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidCompanyName(COMPANY_REGEX.test(companyName));
  }, [companyName]);

  useEffect(() => {
    setValidCompanyDescr(DESCR_REGEX.test(companyDescr));
  }, [companyDescr]);

  const [openModal, setOpenModal] = useState(false);

  async function openTheModal(id) {
    setCompanyId(id)
    setOpenModal(true);
  }

  async function closeTheModal() {
    setOpenModal(false);
  }



  const getEvents = async () => {
    const response = await axios.get(`/api/events/`);
    setEvents(response.data.values.values);
    const getNameCompany = await axios.get(`/api/companies/`)
    setAllCompanies(getNameCompany.data.values.values)
    for(let i = 0; i < events.length; i++) {
        for(let j = 0; j < allCompanies.length; j++) {
            if(events[i].company_id === allCompanies[j].id) {
                // events[i].user_id = allCompanies[j].user_id;

                // setEvents(...events,
                //     events.map((item) => 
                //         item.user_id = allCompanies[j].user_id
                // ))
            }
        }
    }
  }

  useEffect(() => {
    getEvents();
    console.log(events)
  }, [])


  async function toDeleteCompany(id) {
    const answer = window.confirm("Ви впевнені, що хочете видалити дану компанію?")
    if (answer) {
      const response = await axios.delete(`/api/companies/${id}/${currentUser.accessToken}`)
      document.location.reload();
    }
  }

  async function updateCompany(id) {
    console.log(companyDescr, companyName, id)
    const response = await axios.patch(`/api/companies/${companyId}/${currentUser.accessToken}`, JSON.stringify({ description: companyDescr, title: companyName }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    document.location.reload();
  }

  function toRedirect() {
    navigate('/createEvent')
  };

  return (
    <>
      <br />
      <section>
        <div className="leftBox">
          <div className="content">
            <h1>{lang === 'ua' ? 'Події Кампуса' : 'Campus Events'}</h1>
            <p>
              {lang === 'ua' ?
                'На даній сторінці будуть викладатися усі події, що відбуваються у закладі Innovation Campus, який знаходиться за адресою - вулиця Алчевських, 48а, м.Харків. Сподіваємось ви залишетесь задоволеними після подій' :
                'On this page, all events taking place at the Innovation Campus institution, which is located at 48a Alchevskih Street, Kharkiv, will be presented. We hope you will be satisfied after the events'}
            </p>
          </div>
        </div>
      </section>
      {


        (events.length !== 0) && (Array.isArray(events))
          ?
          events.map((event) => {
            // console.log(event)
            const normalFormat = moment(event.dateStart, moment.defaultFormat).toDate();
            const formatedDate = moment(normalFormat).format('D MMMM, h:mm');
            return (
              <>
                <div>
                  <section>
                    <div className="events">
                      <ul>
                        <li>
                          <div className="time">
                            <img src={`${route.serverURL}/event-pic/${event.event_pic}`} width='400px' height='250px' alt='Шарікс'></img>
                            {/* <h2>{event.event_pic}<br/><span></span></h2> */}
                          </div>
                          <div className="details">
                            <h3 style={{ color: 'black' }}>{event.title}</h3>
                            <p style={{ color: 'black' }}>{event.description}</p>
                            <p style={{ color: 'black' }}>{formatedDate}</p>
                            <p style={{ color: 'black' }}>{event.format_id}</p>
                            <p style={{ color: 'black' }}>user_id {event.user_id}</p>
                            <a href="/">{event.company_id}</a>
                            <br />
                            <br />
                            <button className="button-28">{lang === 'ua' ? 'Записатися' : 'Sign up for the event'}</button>
                          </div>
                          <div style={{ clear: "both" }}></div>
                        </li>
                      </ul>
                    </div>
                  </section>



                  <Modal show={openModal} onHide={() => closeTheModal()}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-black">{lang === 'ua' ? 'Зміна даних' : 'Change company'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Label className="form_label text-black" htmlFor="compName">{lang === 'ua' ? 'Назва Компанії' : 'Company Name'}
                        <FontAwesomeIcon icon={faCheck} className={validCompanyName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validCompanyName || !companyName ? "hide" : "invalid"} />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="bg-dark text-white mb-3"
                        id="compName"
                        autoComplete="off"
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                      />

                      <Form.Label className="form_label text-black" htmlFor="compDescr">{lang === 'ua' ? 'Опис Компанії' : 'Company Description'}
                        <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !companyDescr ? "hide" : "invalid"} />
                      </Form.Label>
                      <textarea
                        className="bg-dark text-white mb-3"
                        id="compDescr" 
                        rows="3"
                        autoComplete="off"
                        onChange={(e) => setCompanyDescr(e.target.value)}
                        value={companyDescr}
                      >
                      </textarea>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button disabled={!validCompanyName || !validcompanyDescr ? true : false} variant="primary" style={{ textAlign: 'center' }} onClick={() => updateCompany(event.id)}>{lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                    </Modal.Footer>
                  </Modal>

                </div>
                <br />
              </>
            )
          }

          )
          :
          <h1>{lang === 'ua' ? 'Подій поки що немає' : 'No events exist'}</h1>
      }



    </>
  )
}

export default Event;