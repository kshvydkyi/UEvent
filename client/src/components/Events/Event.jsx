import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import '../../App.css'
import './Event.css'
import moment from 'moment';
import route from "../../api/route";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select from 'react-select'
import ReactPaginate from 'react-paginate'

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,50}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,-=_!?%$#@^&*\\\.();:`~"/\s/\.]{10,10000}$/;

const PRICE_REGEX = /^[0-9]{1,5}$/;
const COUNT_REGEX = /^[0-9]{1,4}$/;
const Event = () => {
  const lang = localStorage.getItem('lang');
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
  const { search } = useLocation();
  const page = search.split('=');
  // console.log(page);
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState('');


  const [eventName, setEventName] = useState('');

  const [locations, setAllLocations] = useState([])

  const [locationsFilter, setAllLocationsFilter] = useState([])

  const [themesFilter, setAllThemesFilter] = useState([])

  const [chosenLocation, setChosenLocation] = useState('')

  const [chosenLocationFilter, setChosenLocationFilter] = useState('All')
  const [chosenThemesFilter, setChosenThemesFilter] = useState('All')

  const dateOptions = [{ value: 'ASC', label: 'Скоро початок' }, { value: 'DESC', label: 'Початок нескоро' }]

  const [dateFilter, setDateFilter] = useState();


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

  const [showSignedInUsers, setShowSignedInUsers] = useState(false);

  const [startAt, setStartDate] = useState('');
  const [endAt, setEndDate] = useState('');

  const [eventId, setEventId] = useState();

  const [priceOfEvent, setPriceOfEvent] = useState('');
  const [validPrice, setValidPrice] = useState(false);

  const [countOfPeople, setCountOfPeople] = useState('');
  const [validCount, setValidCount] = useState(false);

  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setValidPrice(PRICE_REGEX.test(priceOfEvent));
  }, [priceOfEvent]);
  useEffect(() => {
    setValidCount(COUNT_REGEX.test(countOfPeople));
  }, [countOfPeople]);

  const getLocations = async () => {
    const response = await axios.get(`/api/location/`);
    setAllLocations(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data
    }))

    setAllLocationsFilter(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data
    }))
    setAllLocationsFilter(locationsFilter => [...locationsFilter, { value: 'All', label: 'All' }]);
  }

  useEffect(() => {
    getLocations()
  }, [])


  const getThemes1 = async () => {
    const response = await axios.get(`/api/themes/`);
    setAllThemes(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data
    }))

    setAllThemesFilter(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.title }
      return data
    }))
    setAllThemesFilter(themesFilter => [...themesFilter, { value: 'All', label: 'All' }]);
  }

  useEffect(() => {
    getThemes1()
  }, [])


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

  const getEvents = async (dateFilter, locationFilter, themeFilter, pageNumber) => {
    navigate(`/events/?page=${pageNumber}`)
    setIsLoadingPage(true);
    setChosenLocationFilter(locationFilter);
    setDateFilter(dateFilter);

    setChosenThemesFilter(themeFilter)

    const response = await axios.get(`/api/events/?page=${pageNumber}&filter=${dateFilter.value}&filterL=${locationFilter.value}&filterT=${themeFilter.value}&filterND=${searchEvents}`)
    setEvents(response.data.values.data);
    setPageCount(response.data.values.meta.totalPages);
    setIsLoadingPage(false);
  }

  useEffect(() => {
    if (page[0] !== '?page') {
      navigate('/not-found');
    }
    getEvents(dateOptions[0], { value: 'All', label: 'All' }, { value: 'All', label: 'All' }, page[1]);
  }, [])



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

  // 💩💩💩💩💩 УВАГА В ДАНОМІ УЧАСТКЕ КОДІ НАСРАНО
  async function openTheModal(id) {

    setEventId(id)
    setOpenModal(true);
    try {
      setIsModalLoading(true);
      const response = await axios.get(`/api/events/${id}`)
      setEventName(response.data.values.values.title)
      setEventDescr(response.data.values.values.description)
      setChosenCompany({ value: response.data.values.values.company_id, label: response.data.values.values.companyName })
      setChosenFormat({ value: response.data.values.values.format_id, label: response.data.values.values.formatName })
      const themes = response.data.values.values.themes.map((value) => {
        const data = {
          value: value.theme_id
          , label: value.title
        }
        return data;
      })
      setSelectedThemes(themes);
      const normalFormatStart = moment(response.data.values.values.dateStart, moment.defaultFormat).toDate();
      const normalFormatEnd = moment(response.data.values.values.dateEnd, moment.defaultFormat).toDate();
      setStartDate(normalFormatStart);
      setEndDate(normalFormatEnd);
      setPriceOfEvent(response.data.values.values.price);
      setCountOfPeople(response.data.values.values.ticketsCount);
      setChosenLocation({ value: response.data.values.values.location.id, label: response.data.values.values.location.title });
      setShowSignedInUsers(response.data.values.values.showUserList === 1 ? 1 : 0);
      setEventPosterPath(response.data.values.values.event_pic)
      setIsModalLoading(false);
    }

    catch (e) {
      console.log(e)
    }

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






  async function toDeleteEvent() {
    // console.log('aboba')
    try {
      setLoading(true);
      await axios.delete(`/api/events/${eventIdToDelete}/${companyIdToDelete}/${currentUser.accessToken}`);
      setLoading(false);
      document.location.reload();
    }
    catch (e) {
      setLoading(false);
      console.log(e)
    }

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
        dateEnd: endAt,
        event_pic: eventPosterPath,
        themes_id: themesId,
        price: +priceOfEvent,
        count: +countOfPeople,
        userlist_public: +showSignedInUsers,
        location_id: +chosenLocation.value
      }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      console.log(response);
      setLoading(false);
      navigate(`/events/?page=1`);
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
      boxShadow: state.isFocused ? `` : '',
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
        ? 'grey'
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

  const handlePageClick = async (data) => {
    navigate(`/events/?page=${data.selected + 1}`);
    window.scrollTo(0, 0)
    setTimeout(async () => {
      setIsLoadingPage(true);

      const response = await axios.get(`/api/events/?page=${data.selected + 1}&filter=${dateFilter.value}&filterL=${chosenLocationFilter.value}&filterT=${chosenThemesFilter.value}&filterND=${searchEvents}`);
      // console.log(response);
      setEvents(response.data.values.data);
      setIsLoadingPage(false);
    }, 600)
  }

  return isLoadingPage ? <SpinnerLoading style={{ style: 'page-loading' }} /> : (
    <>

      <div className="container-xxl d-flex flex-column mt-3 ">
        <div className="d-flex flex-wrap align-items-center justify-content-between ms-3 me-5">
          <Select
            // placeholder={lang === 'ua' ? 'Час' : 'Date'}
            value={dateFilter}
            options={dateOptions}
            className='select-filers-width bg-dark'
            id='dateFilter'
            onChange={(option) => getEvents(option, chosenLocationFilter, { value: 'All', label: 'All' }, page[1])}
            styles={customStyles}
          />

          <Select
            placeholder={lang === 'ua' ? 'Оберіть локацію' : 'Choose location'}
            value={chosenLocationFilter}
            className='select-filers-width bg-dark'
            styles={customStyles}
            id='location'
            options={locationsFilter}
            onChange={(option) => getEvents(dateFilter, option, { value: 'All', label: 'All' }, '1')}
          />

          {/* <Form.Label className="" htmlFor="themes">{lang === 'ua' ? 'Оберіть тему' : 'Choose theme'}</Form.Label> */}
          <Select
            placeholder={lang === 'ua' ? 'Оберіть тему' : 'Choose theme'}
            value={chosenThemesFilter}
            className='select-filers-width bg-dark '
            styles={customStyles}
            id='themes'
            options={themesFilter}
            onChange={(option) => getEvents(dateFilter, { value: 'All', label: 'All' }, option, '1')}
          />

          <Form className="d-flex select-filers-width mt-3 mb-3">
            <Form.Control
              type="input"
              placeholder="Search"
              className="bg-dark me-2 text-white"
              aria-label="Search"
              value={searchEvents}
              onChange={(e) => setSearchEvents(e.target.value)}
            />
            <Button variant="secondary" onClick={() => getEvents(dateFilter, { value: 'All', label: 'All' }, chosenLocationFilter, '1')}>Search</Button>
          </Form>

        </div>


        <div className='d-flex flex-wrap'>

          {

            (events.length !== 0) && (Array.isArray(events))
              ?
              events.map((event) => {

                // console.log(event)
                const normalFormatStart = moment(event.dateStart, moment.defaultFormat).toDate();
                const formatedDateStart = moment(normalFormatStart).format('D MMMM, HH:mm');
                return (
                  <>


                    <div className="p-3 me-3">
                      <ListGroup>
                        <div className="card bg-dark">
                          <div className="position-relative text-center text-black">
                            {
                              new Date() > new Date(event.dateEnd) ?
                                <>
                                  <img id="blurred" src={`${route.serverURL}/event-pic/${event.event_pic}`} className="rounded-top" width='270px' height="370px" alt='Шарікс'
                                    style={{ cursor: 'pointer' }} onClick={() => navigate(`/event/${event.id}`)}></img> <div className="centered">{lang === 'ua' ? 'Подія закінчилась' : 'The event is over'}</div> </>
                                :
                                <img src={`${route.serverURL}/event-pic/${event.event_pic}`} className="rounded-top" width='270px' height="370px" alt='Шарікс'
                                  style={{ cursor: 'pointer' }} onClick={() => navigate(`/event/${event.id}`)}></img>

                            }

                          </div>
                          <div className="card-body">
                            <span className="bi bi-book">
                              <span className="card-title px-2 fs-5">{event.title.length < 20 ? event.title : <>
                                {event.title.slice(0, 20)}
                                <a className="text-decoration-none text-white" href={`/events/${event.id}`} target={`_blank`}>...</a>
                              </>}</span>
                            </span> <br />
                            <span className="bi bi-calendar-date">
                              <span className='px-2'>{formatedDateStart}</span>
                            </span> <br />


                            <span className="bi bi-geo">
                              <span className="px-2">{event.location.title.length < 25 ? event.location.title :
                                <>
                                  <a className="text-decoration-none text-white">{event.location.title.slice(0, 25)}...</a>
                                </>
                              }
                              </span>
                            </span> <br />

                            <span className="bi bi-card-list">
                              <span className="px-2">{event.formatName}</span>
                            </span> <br />



                            <span className="bi bi-building">
                              <span className="mb-3 px-2" style={{ cursor: 'pointer' }} onClick={() => navigate(`/company/${event.company_id}`)} >{event.companyName}</span>
                            </span>
                            <div className='d-flex justify-content-between'>
                              <Button onClick={() => navigate(`/event/${event.id}`)} className="btn btn-secondary">{lang === 'ua' ? 'Читати більше...' : 'Read more...'}</Button>
                              <div>
                                {
                                  currentUser.role === 'admin' || currentUser.userId === event.companyOwner ?
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

                      <Modal className="bg-dark" show={openModal} onHide={() => closeTheModal()}>
                        <div className="border border-secondary rounded">
                          <Modal.Header className="bg-dark" closeButton closeVariant='white'>
                            <Modal.Title className="text-white">{lang === 'ua' ? 'Зміна даних' : 'Change Event'}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="bg-dark text-white">
                            {isModalLoading ? <div className='d-flex justify-content-center'> <SpinnerLoading style={{ style: 'modal-loading' }} /> </div> :
                              <Form className="d-flex flex-column  justify-content-center">
                                <Form.Label className="form_label text-white" htmlFor="compName">{lang === 'ua' ? 'Назва Події' : 'Event Name'}
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

                                <Form.Label className=" text-White" htmlFor="compDescr">{lang === 'ua' ? 'Опис Події' : 'Event Description'}
                                  <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                                  <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !eventDescr ? "hide" : "invalid"} />
                                </Form.Label>
                                <textarea
                                  className="bg-dark text-white mb-3 p-2"
                                  id="compDescr"
                                  rows="3"
                                  autoComplete="off"
                                  onChange={(e) => setEventDescr(e.target.value)}
                                  value={eventDescr}
                                >
                                </textarea>

                                <Form.Label className="" htmlFor="posteer">{lang === 'ua' ? 'Постер' : 'Poster'}</Form.Label>
                                <Form.Control
                                  type="file"
                                  className="bg-dark text-white mb-3"
                                  id="posteer"
                                  autoComplete="off"
                                  accept="image/jpeg,image/png,image/jpg"
                                  onChange={addImage}

                                />

                                <Form.Label className="mt-2" htmlFor="location">{lang === 'ua' ? 'Оберіть локацію' : 'Choose location'}</Form.Label>
                                <Select

                                  placeholder={lang === 'ua' ? 'Оберіть локацію' : 'Choose location'}
                                  value={chosenLocation}
                                  styles={customStyles}
                                  id='location'
                                  options={locations}
                                  onChange={(option) => {
                                    setChosenLocation(option);
                                  }}
                                />
                                <Form.Label className="mt-2" htmlFor="companies">{lang === 'ua' ? 'Вибрати компанію' : 'Choose Company'}</Form.Label>
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
                                <Form.Label className="mt-2" htmlFor="formats">{lang === 'ua' ? 'Оберіть Формат' : 'Choose Format'}</Form.Label>
                                <Select

                                  placeholder={lang === 'ua' ? 'Оберіть Формат' : 'Choose Format'}
                                  value={chosenFormat}
                                  styles={customStyles}
                                  id='formats'
                                  options={allFormat}
                                  onChange={(option) => {
                                    setChosenFormat(option);
                                  }}
                                />
                                <Form.Label className="mt-2" htmlFor="themes">{lang === 'ua' ? 'Оберіть теми' : 'Choose themes'}</Form.Label>
                                <Select
                                  styles={customStyles}
                                  placeholder={lang === 'ua' ? 'Оберіть теми' : 'Choose themes'}
                                  id="themes"
                                  options={allThemes}
                                  onChange={(option) => {
                                    setSelectedThemes(option);
                                  }}
                                  isMulti
                                  value={selectedThemes}
                                // isClearable
                                />
                                <Form.Label className="mt-2"> {lang === 'ua' ? 'Початок події' : 'Start of Event'}</Form.Label>
                                <DatePicker
                                  className="rounded w-100 p-1 me-1 mb-2 bg-dark text-white border"
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
                                <Form.Label className="mt-2"> {lang === 'ua' ? 'Кінець події' : 'End of Event'}</Form.Label>
                                <DatePicker
                                  className="rounded w-100 p-1 bg-dark text-white border"
                                  selected={endAt}
                                  timeFormat="HH:mm"
                                  minDate={new Date(startAt)}
                                  onChange={date => setEndDate(date)}
                                  timeIntervals={15}
                                  dateFormat="d MMMM yyyy, HH:mm "
                                  timeCaption="time"
                                  showTimeInput
                                  required
                                />
                                <Form.Label className="mt-2" htmlFor="price">
                                  {lang === 'ua' ? 'Ціна у грн.' : 'Price ₴'}
                                  <FontAwesomeIcon icon={faCheck} className={validPrice ? "valid" : "hide"} />
                                  <FontAwesomeIcon icon={faTimes} className={validPrice || !priceOfEvent ? "hide" : "invalid"} />
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className="bg-dark text-white"
                                  id="price"
                                  autoComplete="off"
                                  onChange={(e) => setPriceOfEvent(e.target.value)}
                                  value={priceOfEvent}
                                  min={0}
                                  max={10000}
                                />
                                <Form.Label className="mt-2" htmlFor="countPeople">
                                  {lang === 'ua' ? 'Кількість квитків' : 'Amount of tickets'}
                                  <FontAwesomeIcon icon={faCheck} className={validCount ? "valid" : "hide"} />
                                  <FontAwesomeIcon icon={faTimes} className={validCount || !countOfPeople ? "hide" : "invalid"} />
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className="bg-dark text-white"
                                  id="countPeople"
                                  autoComplete="off"
                                  onChange={(e) => setCountOfPeople(e.target.value)}
                                  value={countOfPeople}
                                  min={1}
                                  max={3000}
                                />
                                <Form.Label className="mt-2" htmlFor="isShow">{lang === 'ua' ? 'Показувати користувачів, що записались на подію?' : 'Show users that signed in at the event?'}</Form.Label>
                                <Form.Check id="isShow" className="mb-2" type='switch' checked={showSignedInUsers} onChange={(e) => setShowSignedInUsers(e.target.checked)} />

                              </Form>

                            }</Modal.Body>
                          <Modal.Footer className="bg-dark">

                            <Button disabled={!validCompanyName || !validcompanyDescr || isLoading || isModalLoading ? true : false} variant="secondary" onClick={() => updateEvent(event.id)}>{isLoading ? <SpinnerLoading style={{ style: 'd-flex justify-content-center' }} /> : lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>

                          </Modal.Footer>
                        </div>
                      </Modal>


                      <Modal className="bg-dark" centered show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                        <div className="border border-secondary rounded">
                          <Modal.Header className="bg-dark" closeButton closeVariant='white'>
                            <Modal.Title className="text-white">{lang === 'ua' ? 'Видалення події' : 'Deleting event'}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body className="bg-dark">
                            <h1 className="h5">{lang === 'ua' ? 'Ви впевнені що хочете видалити подію?' : 'Are you sure to delete event?'}</h1>
                          </Modal.Body>
                          <Modal.Footer className="bg-dark">
                            <Button variant="secondary" onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                            <Button disabled={isLoading ? true : false} variant="danger" onClick={() => toDeleteEvent()}>{isLoading ? <SpinnerLoading style={{ style: 'd-flex justify-content-center' }} /> : lang === 'ua' ? 'Видалити' : 'Delete'}</Button>

                          </Modal.Footer>
                        </div>
                      </Modal>
                    </div>
                  </>
                )
              }

              )
              :
              <h1 className="mt-2 text-center">{lang === 'ua' ? 'Подій поки що немає' : 'No events exist'}</h1>
          }
        </div>
      </div>
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
        previousLinkClassName={' '}
        nextClassItem={''}
        nextLinkClassName={' '}
        breakClassName={''}
        breakLinkClassName={''}
        activeClassName={'active'}
      />


    </>
  )
}

export default Event;