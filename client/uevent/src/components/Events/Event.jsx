import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import { Modal, Button, Form, ListGroup, ListGroupItem, } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import '../../App.css'
import './Event.css'
import moment from 'moment';
import route from "../../api/route";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select'
import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate'
const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;

const Event = () => {
  const lang = localStorage.getItem('lang');
  const [events, setEvents] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [eventName, setEventName] = useState('');
  const [validCompanyName, setValidCompanyName] = useState(false);

  const [eventDescr, setEventDescr] = useState('');
  const [validcompanyDescr, setValidCompanyDescr] = useState(false);

  const [eventPosterPath, setEventPosterPath] = useState('');

  const [allCompanies, setAllCompanies] = useState([]);
  const [chosenCompany, setChosenCompany] = useState('');

  const [allFormat, setAllFormats] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [chosenFormat, setChosenFormat] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([])
  const [startAt, setStartDate] = useState('');

  const [eventId, setEventId] = useState();

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const response = await axios.post(`/api/events/add-image/${currentUser.accessToken}`, formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      )
      setEventPosterPath(response.data.values.values.pathFile);
    } catch (e) {
      console.log(e);
    }
  }

  const getCompanies = async () => {
    const response = await axios.get(`/api/companies/user-companies/${currentUser.userId}`);
    setAllCompanies(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data;
    }));
  }

  useEffect(() => {
    getCompanies();
  }, [])


  const getFormat = async () => {
    const response = await axios.get(`/api/formats/`);
    setAllFormats(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data;
    }));
  }
  const getThemes = async () => {
    const response = await axios.get(`/api/themes/`);
    setAllThemes(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data;
    }));
  }
  useEffect(() => {
    getThemes();
  }, []);

  useEffect(() => {
    getFormat();
  }, []);

  useEffect(() => {
    setValidCompanyName(COMPANY_REGEX.test(eventName));
  }, [eventName]);

  useEffect(() => {
    setValidCompanyDescr(DESCR_REGEX.test(eventDescr));
  }, [eventDescr]);

  const [openModal, setOpenModal] = useState(false);


  async function openTheModal(id) {
    setEventId(id)
    setOpenModal(true);
  }

  async function closeTheModal() {
    setOpenModal(false);
  }

  const [eventIdToDelete, setEventIdToDelete] = useState();
  const [companyIdToDelete, setCompanyIdToDelete] = useState();
  const [openModalToDelete, setOpenModalToDelete] = useState(false);

  async function openTheModalToDelete(eventId, companyId) {
    setEventIdToDelete(eventId);
    setCompanyIdToDelete(companyId);
    setOpenModalToDelete(true);
  }

  async function closeTheModalToDelete() {
    setOpenModalToDelete(false);
  }



  const getEvents = async () => {
    const response = await axios.get(`/api/events/?page=1`);
    console.log(response);
    setEvents(response.data.values.data);
    setPageCount(response.data.values.meta.totalPages);
    console.log(pageCount)
  }

  useEffect(() => {
    getEvents();
  }, [])


  async function toDeleteEvent() {
    console.log('aboba')
    const response = await axios.delete(`/api/events/${eventIdToDelete}/${companyIdToDelete}/${currentUser.accessToken}`)
    document.location.reload();
  }


  const updateEvent = async (e) => {
    try {
      setLoading(true);
      const themesId = selectedThemes.map((theme) => theme.value);
      const response = await axios.patch(`/api/events/${eventId}/${currentUser.accessToken}`, JSON.stringify({
        title: eventName,
        description: eventDescr,
        company_id: +chosenCompany.value,
        format_id: +chosenFormat.value,
        dateStart: startAt,
        event_pic: eventPosterPath.length < 1 ? 'default_event.png' : eventPosterPath,
        themes_id: themesId
      }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      console.log('ku')
      console.log(response);
      setLoading(false);
      navigate(`/events`);
      document.location.reload();
    }
    catch (err) {
      setLoading(false);
      console.log(err)
      // if (err?.response.data.status === 404) {
      //     navigate('/404');
      // }
      // else {
      //     console.log(err)
      //     // navigate('/500')
      // }
    }
  }


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'none',
      boxShadow: state.isFocused ? `0 0 0 2px rgb(90, 20, 152), 0 0 #0000` : '',
      transition: 'box-shadow 0.1s ease-in-out',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),

    input: (provided) => ({
      ...provided,
      color: 'white',
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgb(90, 20, 152)'
        : 'transparent',
      transition: '0.3s',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white'
    }),
    singleValueLabel: (provided) => ({
      ...provided,
      color: 'white'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(45, 45, 45)',
    }),
  }

  function toRedirect() {
    navigate('/createEvent')
  };



  // pagination

  const [pageCount, setPageCount] = useState(0);

  const paginatePosts = async (currentPage) => {
    console.log(currentPage)
    const response = await axios.get(`/api/events/?page=${currentPage}`);
    return response;
  }

  const handlePageClick = async (data) => {
    const response = await axios.get(`/api/events/?page=${data.selected + 1}`);
    console.log(response);
    setEvents(response.data.values.data);
  }

  return (
    <>
    <div className="container-xxl d-flex  mt-3 ">
      <div className='d-flex flex-wrap'>
        {


          (events.length !== 0) && (Array.isArray(events))
            ?
            events.map((event) => {

              // console.log(event)
              const normalFormatStart = moment(event.dateStart, moment.defaultFormat).toDate();
              const formatedDateStart = moment(normalFormatStart).format('D MMMM, h:mm');
              const normalFormatEnd = moment(event.dateEnd, moment.defaultFormat).toDate();
              const formatedDateEnd = moment(normalFormatEnd).format('D MMMM, h:mm');
              return (
                <>


                  <div className="p-3 me-3">
                    <ListGroup>
                      <div className="card bg-dark">
                        <div className=" text-center">
                          <img src={`${route.serverURL}/event-pic/${event.event_pic}`} className="rounded-top" width='270px' height="370px" alt='Шарікс'
                            style={{ cursor: 'pointer' }} onClick={() => window.location = `/event/${event.id}`}></img>
                      
                        </div>
                        <div className="card-body">
                          <p className="">{formatedDateStart} - {formatedDateEnd}</p>
                          <h5 className=" card-title">{event.title.length < 24 ? event.title : <>
                            {event.title.slice(0, 24)}
                            <a className="text-decoration-none text-white" href={`/events/${event.id}`} target={`_blank`}>...</a>
                          </>}</h5>
                          

                          <p>{lang === 'ua' ? 'Де: ' : 'Location: '}{event.location.title}</p>

                          <p>{event.formatName}</p>
                          <Nav.Link href={`/company/${event.company_id}`}>{event.companyName}</Nav.Link>
                          <div className='d-flex justify-content-between'>
                            <Button onClick={() => window.location = `/event/${event.id}`} className="btn btn-secondary">{lang === 'ua' ? 'Читати більше...' : 'Read more...'}</Button>
                            <div>
                              {
                                currentUser.role === 'admin' && currentUser.userId === event.companyOwner ?
                                  <>
                                    <Button onClick={() => openTheModal(event.id)} type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg></Button>
                                    <Button onClick={() => openTheModalToDelete(event.id, event.company_id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}><svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                    </svg></Button>

                                  </>
                                  :
                                  <></>
                              }

                            </div>
                            </div>
                          </div>
                        </div>
                    
                    </ListGroup>




                    <Modal style={{ backgroundColor: 'black' }} show={openModal} onHide={() => closeTheModal()}>
                      <Modal.Header style={{ backgroundColor: 'grey' }} closeButton>
                        <Modal.Title className="text-black">{lang === 'ua' ? 'Зміна даних' : 'Change Event'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ backgroundColor: 'grey' }}>
                        <Form.Label className="form_label text-black" htmlFor="compName">{lang === 'ua' ? 'Назва Події' : 'Event Name'}
                          <FontAwesomeIcon icon={faCheck} className={validCompanyName ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validCompanyName || !eventName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="bg-dark text-white mb-3"
                          id="compName"
                          autoComplete="off"
                          onChange={(e) => setEventName(e.target.value)}
                          value={eventName}
                        />

                        <Form.Label className="form_label text-black" htmlFor="compDescr">{lang === 'ua' ? 'Опис Компанії' : 'Company Description'}
                          <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                          <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !eventDescr ? "hide" : "invalid"} />
                        </Form.Label>
                        <textarea
                          className="bg-dark text-white mb-3"
                          id="compDescr"
                          rows="3"
                          autoComplete="off"
                          onChange={(e) => setEventDescr(e.target.value)}
                          value={eventDescr}
                        >
                        </textarea>

                        <Form.Label className="form_label" htmlFor="posteer">{lang === 'ua' ? 'Постер' : 'Poster'}
                        </Form.Label>
                        <Form.Control
                          type="file"
                          className="bg-dark text-white mb-3"
                          id="posteer"
                          autoComplete="off"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={addImage}
                        // value={eventPoster}
                        />

                        <label className="form_label" htmlFor="companies">{lang === 'ua' ? 'Вибрати компанію' : 'Choose Company'}</label>
                        <Select
                          placeholder={lang === 'ua' ? 'Вибрати компанію' : 'Choose Company'}
                          value={chosenCompany}
                          styles={customStyles}
                          id='companies'
                          options={allCompanies}
                          onChange={(option) => {
                            setChosenCompany(option);
                          }}
                        />




                        <label className="form_label" htmlFor="formats">{lang === 'ua' ? 'Оберіть Формат' : 'Choose Format'}</label>
                        <Select
                          style={{ color: 'black' }}
                          placeholder={lang === 'ua' ? 'Оберіть Формат' : 'Choose Format'}
                          value={chosenFormat}
                          styles={customStyles}
                          id='formats'
                          options={allFormat}
                          onChange={(option) => {
                            setChosenFormat(option);
                          }}
                        />
                        <label className="form_label" htmlFor="themes">{lang === 'ua' ? 'Оберіть теми' : 'Choose themes'}</label>

                        <Select
                          styles={customStyles}
                          placeholder={lang === 'ua' ? 'Оберіть теми' : 'Choose themes'}
                          id="themes"
                          options={allThemes}
                          onChange={(option) => {
                            setSelectedThemes(option);
                          }}
                          isMulti
                        // isClearable
                        />

                        <label style={{ margin: "10px" }}> {lang === 'ua' ? 'Початок події' : 'Start of Event'}</label>
                        <DatePicker
                          style={{ margin: "10px" }}
                          selected={startAt}
                          timeFormat="HH:mm"
                          minDate={moment().toDate()}
                          onChange={date => setStartDate(date)}
                          timeIntervals={15}
                          dateFormat="d MMMM yyyy, HH:mm "
                          timeCaption="time"
                          showTimeInput
                          required
                        />

                      </Modal.Body>
                      <Modal.Footer style={{ backgroundColor: 'grey' }}>
                        <Button disabled={!validCompanyName || !validcompanyDescr ? true : false} variant="primary" style={{ textAlign: 'center' }} onClick={() => updateEvent(event.id)}>{lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                      </Modal.Footer>
                    </Modal>


                    <Modal style={{ backgroundColor: 'black' }} show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                      <Modal.Header style={{ backgroundColor: 'grey' }} closeButton>
                        <Modal.Title className="text-black">{lang === 'ua' ? 'Видалення події' : 'Deleting event'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ backgroundColor: 'grey' }}>
                        <h1>{lang === 'ua' ? 'Ви впевнені що хочете видалити подію?' : 'Are you sure to delete event?'}</h1>
                      </Modal.Body>
                      <Modal.Footer style={{ backgroundColor: 'grey' }}>

                        <Button variant="primary" style={{ float: 'right', backgroundColor: 'red' }} onClick={() => toDeleteEvent()}>{lang === 'ua' ? 'Видалити' : 'Delete'}</Button>
                        <Button variant="primary" style={{ float: 'left' }} onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                      </Modal.Footer>
                    </Modal>

                  </div>
                  

                </>
              )
            }

            )
            :
            <h1>{lang === 'ua' ? 'Подій поки що немає' : 'No events exist'}</h1>
        }
      </div>
      </div>
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

export default Event;