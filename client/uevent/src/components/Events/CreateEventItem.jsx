import { useEffect, useRef, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select'
import moment from 'moment';


const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,_!?%$#@^&*\\\.();:`~"/\s/\.]{10,200}$/;

const PRICE_REGEX = /^[0-9]{1,5}$/;
const COUNT_REGEX = /^[0-9]{1,4}$/;



const CreateEventItem = () => {


    const lang = localStorage.getItem('lang');
    const location = useLocation().pathname.split('/');
    const currentId = location[2];

    const errRef = useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    const [mainEventName, setMainEventName] = useState('');
    const [mainEventStartDate, setMainEventStartDate] = useState('');
    const [minDateEvent, setMinDateEvent] = useState('');

    const [eventItemName, setEventItemName] = useState('');
    const [validCompanyName, setValidCompanyName] = useState(false);

    const [eventItemDescr, setEventItemDescr] = useState('');
    const [validcompanyDescr, setValidCompanyDescr] = useState(false);

    const [eventPosterPath, setEventPosterPath] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const [chosenCompany, setChosenCompany] = useState('');

    const [priceOfEvent, setPriceOfEvent] = useState(''); 
    const [validPrice, setValidPrice] = useState(false);

    const [countOfPeople, setCountOfPeople] = useState(''); 
    const [validCount, setValidCount] = useState(false);


    const [allFormat, setAllFormats] = useState([]);
    const [allThemes, setAllThemes] = useState([]);
    const [chosenFormat, setChosenFormat] = useState('');
    const [selectedThemes, setSelectedThemes] = useState([])
    const [endAt, setEndDate] = useState('');

    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    useEffect(() => {
        setValidCompanyName(COMPANY_REGEX.test(eventItemName));
    }, [eventItemName]);

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(priceOfEvent));
    }, [priceOfEvent]);

    useEffect(() => {
        setValidCompanyDescr(DESCR_REGEX.test(eventItemDescr));
    }, [eventItemDescr]);

    useEffect(() => {
        setValidCount(COUNT_REGEX.test(countOfPeople));
    }, [countOfPeople]);


    // const setHidden = () => {
    //     setTimeout(() => setErrMsg(''), 5000);
    // }

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
    const createEvent = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(selectedThemes);
            const themesId = selectedThemes.map((theme) => theme.value);
            const response = await axios.post(`/api/events-items/${currentUser.accessToken}`, JSON.stringify({
                title: eventItemName,
                description: eventItemDescr,
                company_id: +chosenCompany.value,
                format_id: +chosenFormat.value,
                event_id: currentId,
                dateStart: minDateEvent,
                dateEnd:endAt,
                event_pic: eventPosterPath.length < 1 ? 'default_event.png' : eventPosterPath,
                themes_id: themesId,
                price: +priceOfEvent,
                count: countOfPeople
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            console.log(response);
            setLoading(false);
            navigate(`/events`);
            document.location.reload();
        }
        catch (err) {
            setLoading(false);
            if (err?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                console.log(err)
                // navigate('/500')
            }
        }
    }

    const getNameOfEvent = async () => {
        const response = await axios.get(`/api/events/${currentId}`);
        setMainEventName(response.data.values.values.title);
        setMinDateEvent(response.data.values.values.dateStart)
        const normalFormat = moment(response.data.values.values.dateStart, moment.defaultFormat).toDate();
        const formatedDate = moment(normalFormat).format('D MMMM, h:mm');
        setMainEventStartDate(formatedDate)
    }

    useEffect(() => {
        getNameOfEvent();
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



    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
     componentRestrictions: { country: "ng" },
     fields: ["address_components", "geometry", "icon", "name"],
     types: ["establishment"]
    };
    useEffect(() => {
     autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
     );
    }, []);

  
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2>{lang === 'ua' ? 'Подія - ' : 'Event - '}{mainEventName}</h2>
                    <h2 className="text-center">{lang === 'ua' ? 'Створити Подію' : 'Create Event'}</h2>
                    <form className="d-flex flex-column  justify-content-center" onSubmit={createEvent}>
                        <Form.Label className="form_label" htmlFor="compName">{lang === 'ua' ? 'Назва Події' : 'Event Title'}
                            <FontAwesomeIcon icon={faCheck} className={validCompanyName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCompanyName || !eventItemName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="compName"
                            autoComplete="off"
                            onChange={(e) => setEventItemName(e.target.value)}
                            value={eventItemName}
                        />

                        <Form.Label className="form_label" htmlFor="compDescr">{lang === 'ua' ? 'Опис Події' : 'Event Description'}
                            <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !eventItemDescr ? "hide" : "invalid"} />
                        </Form.Label>
                        <textarea
                            className="bg-dark text-white mb-3"
                            class="bg-dark text-white mb-3" id="compDescr" rows="3"
                            autoComplete="off"
                            onChange={(e) => setEventItemDescr(e.target.value)}
                            value={eventItemDescr}
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
                     
                        <p>{lang === 'ua' ? 'Початок події' : 'Start of Event'} - {mainEventStartDate}</p>
                        <label style={{ margin: "10px" }}> {lang === 'ua' ? 'Кінець події' : 'End of Event'}</label>
                        <DatePicker
                            style={{ margin: "10px" }}
                            selected={endAt}
                            timeFormat="HH:mm"
                            minDate={new Date(minDateEvent)}
                            onChange={date => setEndDate(date)}
                            timeIntervals={15}
                            dateFormat="d MMMM yyyy, HH:mm "
                            timeCaption="time"
                            showTimeInput
                            required
                        />

                        <Form.Label className="form_label" htmlFor="price">
                            {lang === 'ua' ? 'Ціна ( в грівнах ) ( Оберіть 0 якщо хочете зробити подію безкоштовною ) ' : 'Price ( grivnah ) ( Choose 0 if you want to make event free )'}
                        <FontAwesomeIcon icon={faCheck} className={validPrice ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPrice || !priceOfEvent ? "hide" : "invalid"} />
                       </Form.Label>
                        <Form.Control
                            type="number"
                            className="bg-dark text-white mb-3"
                            id="price"
                            autoComplete="off"
                            onChange={(e) => setPriceOfEvent(e.target.value)}
                            value={priceOfEvent}
                            min={0}
                            max={10000}
                        />

                            <Form.Label className="form_label" htmlFor="countPeople">
                            {lang === 'ua' ? 'Максимальна кількість людей на подію' : 'Msximum amount of people on the event'}
                        <FontAwesomeIcon icon={faCheck} className={validCount ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validCount || !countOfPeople ? "hide" : "invalid"} />
                       </Form.Label>
                        <Form.Control
                            type="number"
                            className="bg-dark text-white mb-3"
                            id="countPeople"
                            autoComplete="off"
                            onChange={(e) => setCountOfPeople(e.target.value)}
                            value={countOfPeople}
                            min={1}
                            max={1000}
                        />

                        <label>enter address :</label>
                        <input ref={inputRef} />

                        
                        <Button variant="secondary" type="submit" disabled={!validCompanyName || !validcompanyDescr || !validPrice || !validCount || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : lang === 'ua' ? 'Створити' : 'Create'}</Button>
                    </form>
                </div>
            </div>
            {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDuwtC_l4ZMEaQPTSirUq5kbJJu9R_JT3o&libraries=places&callback=initMap"async></script> */}
        </>
    )
}

export default CreateEventItem;