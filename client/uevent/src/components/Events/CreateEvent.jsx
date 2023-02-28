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

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,_!?%$#@^&*\\\.();:`~"/\s/\.]{10,200}$/;

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

    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    useEffect(() => {
        setValidCompanyName(COMPANY_REGEX.test(companyName));
    }, [companyName]);

    useEffect(() => {
        setValidCompanyDescr(DESCR_REGEX.test(companyDescr));
    }, [companyDescr]);


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
            const response = await axios.post(`/api/events/${currentUser.accessToken}`, JSON.stringify({
                title: companyName,
                description: companyDescr,
                company_id: +chosenCompany.value,
                format_id: +chosenFormat.value,
                dateStart: startAt,
                event_pic: eventPosterPath.length < 1 ? 'default_event.png' : eventPosterPath,
                themes_id: themesId
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
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2 className="text-center">{lang === 'ua' ? 'Створити Подію' : 'Create Event'}</h2>
                    <form className="d-flex flex-column  justify-content-center" onSubmit={createEvent}>
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
                            className="bg-dark text-white mb-3"
                            class="bg-dark text-white mb-3" id="compDescr" rows="3"
                            autoComplete="off"
                            onChange={(e) => setCompanyDescr(e.target.value)}
                            value={companyDescr}
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
                            onChange={date => setStartDate(date)}
                            timeIntervals={15}
                            dateFormat="d MMMM yyyy, HH:mm "
                            timeCaption="time"
                            showTimeInput
                            required
                        />

                        <br />
                        <Button variant="secondary" type="submit" disabled={!validCompanyName || !validcompanyDescr || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : lang === 'ua' ? 'Створити' : 'Create'}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateEvent;