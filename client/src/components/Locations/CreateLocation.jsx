import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,50}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9,_!?%$#@^&\-*\\\.();:`~"/\s/\.]{10,10000}$/;

const CreateLocation = () => {
    const lang = localStorage.getItem('lang');
    const errRef = useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    const [locationName, setlocationName] = useState('');
    const [validlocationName, setValidlocationName] = useState(false);

    const [locationDescr, setlocationDescr] = useState('');
    const [validlocationDescr, setValidlocationDescr] = useState(false);

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [locationPicture, setLocationPicture] = useState('')

    const [isLoading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    useEffect(() => {
        setValidlocationName(COMPANY_REGEX.test(locationName));
    }, [locationName]);

    useEffect(() => {
        setValidlocationDescr(DESCR_REGEX.test(locationDescr));
    }, [locationDescr]);


    // const setHidden = () => {
    //     setTimeout(() => setErrMsg(''), 5000);
    // }
    const addImage = async (e) => {
        const formData = new FormData();
        console.log(e.target.files[0]);
        formData.append('image', e.target.files[0]);
        try {
            const response = await axios.post(`/api/location/add-image/${currentUser.accessToken}`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            )
            console.log(response);
            setLocationPicture(response.data.values.values.pathFile);
        } catch (e) {
            console.log(e);
        }
    }
    const createLocation = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(locationPicture)
            const response = await axios.post(`/api/location/${currentUser.accessToken}`, JSON.stringify(
                {
                    description: locationDescr,
                    title: locationName,
                    country: country,
                    street: street,
                    city: city,
                    house: house,
                    location_pic: locationPicture.length < 1 ? 'default_location.png' : locationPicture

                }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            console.log(response);
            setLoading(false);
            navigate(`/`);
            // document.location.reload();
        }
        catch (err) {
            setLoading(false);
            if (err?.response.data.status === 404) {
                navigate('/404');
            }
            else {
                navigate('/500')
            }
        }
    }
    return (
        <>
            <div className="form-background p-5 d-flex justify-content-center text-white">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <div className='login bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
                    <h2 className="text-center">{lang === 'ua' ? 'Створити Локацію' : 'Create Location'}</h2>
                    <form className="d-flex flex-column  justify-content-center" onSubmit={createLocation}>
                        <Form.Label className="form_label" htmlFor="compName">{lang === 'ua' ? 'Назва Локації' : 'Location Name'}
                            <FontAwesomeIcon icon={faCheck} className={validlocationName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validlocationName || !locationName ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="compName"
                            autoComplete="off"
                            onChange={(e) => setlocationName(e.target.value)}
                            value={locationName}
                        />

                        <Form.Label className="form_label" htmlFor="compDescr">{lang === 'ua' ? 'Опис Локації' : 'Location Description'}
                            <FontAwesomeIcon icon={faCheck} className={validlocationDescr ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validlocationDescr || !locationDescr ? "hide" : "invalid"} />
                        </Form.Label>
                        <textarea
                            className="bg-dark text-white mb-3 p-2"
                            id="compDescr"
                            rows="3"
                            autoComplete="off"
                            onChange={(e) => setlocationDescr(e.target.value)}
                            value={locationDescr}
                        >
                        </textarea>

                        <Form.Label className="form_label" htmlFor="country">{lang === 'ua' ? 'Країна' : 'Country'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="country"
                            autoComplete="off"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        />

                        <Form.Label className="form_label" htmlFor="city">{lang === 'ua' ? 'Місто' : 'City'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="city"
                            autoComplete="off"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />

                        <Form.Label className="form_label" htmlFor="street">{lang === 'ua' ? 'Вулиця' : 'Street'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="street"
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                        />

                        <Form.Label className="form_label" htmlFor="house">{lang === 'ua' ? 'Дім' : 'House'}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="bg-dark text-white mb-3"
                            id="house"
                            autoComplete="off"
                            onChange={(e) => setHouse(e.target.value)}
                            value={house}
                        />
                        <Form.Label htmlFor="posteer">{lang === 'ua' ? 'Фото' : 'Photo'}
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

                        <Button variant="secondary" type="submit" disabled={!validlocationName || !validlocationDescr || isLoading ? true : false}>{isLoading ? <SpinnerLoading /> : lang === 'ua' ? 'Створити' : 'Create'}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateLocation;