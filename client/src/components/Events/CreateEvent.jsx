import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import route from "../../api/route";
import StripeCheckout from "react-stripe-checkout";

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,55}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,_!?%$#@^&\-*\\\.();:`~"/\s/\.]{10,300}$/;

const PRICE_REGEX = /^[0-9]{1,5}$/;
const COUNT_REGEX = /^[0-9]{1,4}$/;

const CreateEvent = () => {
    const lang = localStorage.getItem('lang');
    const errRef = useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [validCompanyName, setValidCompanyName] = useState(false);

    const [companyDescr, setCompanyDescr] = useState('');
    const [validcompanyDescr, setValidCompanyDescr] = useState(false);

    const [eventPosterPath, setEventPosterPath] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const [chosenCompany, setChosenCompany] = useState('');

    const [allFormat, setAllFormats] = useState([]);
    const [allThemes, setAllThemes] = useState([]);
    const [chosenFormat, setChosenFormat] = useState('');
    const [selectedThemes, setSelectedThemes] = useState([])
    const [startAt, setStartDate] = useState('');


    const [locations, setAllLocations] = useState([])
    const [chosenLocation, setChosenLocation] = useState('')
    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    const [showSignedInUsers, setShowSignedInUsers] = useState(false);

    const [priceOfEvent, setPriceOfEvent] = useState('');
    const [validPrice, setValidPrice] = useState(false);

    const [countOfPeople, setCountOfPeople] = useState('');
    const [validCount, setValidCount] = useState(false);

    const [endAt, setEndDate] = useState('');

    useEffect(() => {
        setValidCompanyName(COMPANY_REGEX.test(companyName));
    }, [companyName]);

    useEffect(() => {
        setValidCompanyDescr(DESCR_REGEX.test(companyDescr));
    }, [companyDescr]);

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(priceOfEvent));
    }, [priceOfEvent]);


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
    // const createEvent = async (e) => {
    //     e.preventDefault();
    //     console.log(countOfPeople)
    //     try {
    //         setLoading(true);
    //         // console.log(selectedThemes);
    //         const themesId = selectedThemes.map((theme) => theme.value);
    //         // console.log(themesId)
    //         // console.log(chosenLocation)
    //         const response = await axios.post(`/api/events/${currentUser.accessToken}`, JSON.stringify({
    //             title: companyName,
    //             description: companyDescr,
    //             company_id: +chosenCompany.value,
    //             format_id: +chosenFormat.value,
    //             dateStart: startAt,
    //             dateEnd: endAt,
    //             event_pic: eventPosterPath.length < 1 ? 'default_event.png' : eventPosterPath,
    //             themes_id: themesId,
    //             price: +priceOfEvent,
    //             count: +countOfPeople,
    //             userlist_public: showSignedInUsers,
    //             location_id: +chosenLocation.value
    //         }), {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         })
    //         console.log(response);
    //         setLoading(false);
    //         navigate(`/events`);
    //         document.location.reload();
    //     }
    //     catch (err) {
    //         setLoading(false);
    //         if (err?.response.data.status === 404) {
    //             navigate('/404');
    //         }
    //         else {
    //             console.log(err)
    //             // navigate('/500')
    //         }
    //     }
    // }
    async function handleToken(token, email) {
        // const response = await axios.post(`/api/events/checkout`,
        //   JSON.stringify({
        //     name: events.title,
        //     eventId: events.id,
        //     price: events.price,
        //     token: token,
        //     user_id: currentUser.userId,
        //     startDate: formatedDate,
        //     endDate: formatedDateEnd,
        //     location: events.location,
        //     event_pic: events.event_pic,
        //     user_login: currentUser.user
        //   }), {
        //   headers: { 'Content-Type': 'application/json' },
        //   withCredentials: true
        // })
        // console.log(response);
        // setSuccesPurchase(response.data.status === 200 ? true : false)
        // console.log(succesPurchase);
        // document.location.reload();
        // e.preventDefault();
        console.log(countOfPeople)
        try {
            setLoading(true);
            // console.log(selectedThemes);
            const themesId = selectedThemes.map((theme) => theme.value);
            // console.log(themesId)
            // console.log(chosenLocation)
            const response = await axios.post(`/api/events/${currentUser.accessToken}`, JSON.stringify({
                title: companyName,
                description: companyDescr,
                company_id: +chosenCompany.value,
                format_id: +chosenFormat.value,
                dateStart: startAt,
                dateEnd: endAt,
                event_pic: eventPosterPath.length < 1 ? 'default_event.png' : eventPosterPath,
                themes_id: themesId,
                price: +priceOfEvent,
                count: +countOfPeople,
                userlist_public: showSignedInUsers,
                location_id: +chosenLocation.value
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            // console.log(response);
            // console.log('Розміщеня вдалось')
            setLoading(false);
            navigate(`/events`);
            // document.location.reload();
        }
        catch (err) {
            setLoading(false);
            // console.log('Розміщення не вдалось')
            if (err?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                console.log(err)
                navigate('/500')
            }
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
    // 💩💩💩💩💩 УВАГА В ДАНОМІ УЧАСТКЕ КОДІ НАСРАНО
    useEffect(() => {
        getThemes();
    }, []);

    useEffect(() => {
        getFormat();
    }, []);

    const getLocations = async () => {
        const response = await axios.get(`/api/location/`);
        setAllLocations(response.data.values.values.map((value) => {
            const data = { value: value.id, label: value.title }
            return data
        }))
    }
    useEffect(() => {
        getLocations()
    }, [])
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
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2 className="text-center">{lang === 'ua' ? 'Створити Подію' : 'Create Event'}</h2>
                    <div className="d-flex flex-column  justify-content-center">
                        <Form.Label className="form_label" htmlFor="compName">{lang === 'ua' ? 'Назва Події' : 'Event Title'}
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

                        <Form.Label className="form_label" htmlFor="compDescr">{lang === 'ua' ? 'Опис Події' : 'Event Description'}
                            <FontAwesomeIcon icon={faCheck} className={validcompanyDescr ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validcompanyDescr || !companyDescr ? "hide" : "invalid"} />
                        </Form.Label>
                        <textarea
                            className="bg-dark text-white mb-3 p-2"
                            id="compDescr" rows="3"
                            autoComplete="off"
                            onChange={(e) => setCompanyDescr(e.target.value)}
                            value={companyDescr}
                        >
                        </textarea>

                        <Form.Label htmlFor="posteer">{lang === 'ua' ? 'Постер' : 'Poster'}
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
                        // isClearable
                        />

                        <Form.Label className="mt-2"> {lang === 'ua' ? 'Початок події' : 'Start of Event'}</Form.Label>
                        <DatePicker
                            className="rounded w-100 p-1 bg-dark text-white border"
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
                        <Form.Check id="isShow" className="mb-2" type='switch' onChange={(e) => setShowSignedInUsers(e.target.checked)} />


                        <StripeCheckout
                            disabled={!validCompanyName || !validcompanyDescr || !validPrice || !validCount || isLoading ? true : false}
                            className="text-black mb-5"
                            panelLabel="Pay"
                            image={`${route.serverURL}/event-pic/logo.png`}
                            stripeKey='pk_test_51Mixi5EPLqByaBcpL2haakXv0c55d86UjBgpP7F9KxWVYE1mnedNH9PoCDftvaAfUAaBRcALgfODpCdWJERP8eH200XPb8qa6m'
                            amount={100 * 100}
                            name={lang === 'ua' ? 'Розмістити івент' : "Publish event"}
                            currency="UAH"
                            token={handleToken}
                        >
                            <Button variant="secondary" type="submit" disabled={!validCompanyName || !validcompanyDescr || !validPrice || !validCount || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : lang === 'ua' ? 'Створити' : 'Create'}</Button>

                            {/* <Button variant="secondary" className="" disabled={events.ticketsCount === 0 || new Date() > new Date(events.dateEnd)  ? true : false}>
                            {lang === 'ua' ? 'Купити квиток' : 'Buy ticket'}
                          </Button> */}
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEvent;