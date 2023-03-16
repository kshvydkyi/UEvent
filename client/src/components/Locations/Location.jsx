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
import route from "../../api/route";

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;


const Location = () => {
    const lang = localStorage.getItem('lang');
    const [locations, setLocations] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    const [locationId, setLocationId] = useState();


    const navigate = useNavigate();

    const [locationName, setlocationName] = useState('');

    const [locationDescr, setlocationDescr] = useState('');
    const [locationPicture, setLocationPicture] = useState('')

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');


    const [openModal, setOpenModal] = useState(false);

    async function openTheModal(id) {
        setLocationId(id)
        setOpenModal(true);
        console.log(id)
        const response = await axios.get(`/api/location/${id}`)
        console.log(response.data.values.values)
        setlocationDescr(response.data.values.values.description);
        setlocationName(response.data.values.values.title)
        setCountry(response.data.values.values.country)
        setCity(response.data.values.values.city)
        setHouse(response.data.values.values.house)
        setStreet(response.data.values.values.street)
        setLocationPicture(response.data.values.values.location_pic)
    }

    async function closeTheModal() {
        setOpenModal(false);
    }



    const getLocations = async () => {
        const response = await axios.get(`/api/location`);
        setLocations(response.data.values.values);
    }

    useEffect(() => {
        getLocations();
    }, [])

    async function toDeleteCompany() {
        console.log("aaa")
        const response = await axios.delete(`/api/location/${locationIdToDelete}/${currentUser.accessToken}`)
        document.location.reload();
    }

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

    async function updateLocation(id) {
        try{
            const response = await axios.patch(`/api/location/${locationId}/${currentUser.accessToken}`, JSON.stringify({
                description: locationDescr,
                title: locationName,
                country: country,
                street: street,
                city: city,
                house: house,
                location_pic: locationPicture
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            console.log(response);
            document.location.reload();
        }
        catch(e){
            console.log(e);
        }
        
    }

    function toRedirect() {
        navigate('/createLocation')
    };


    const [locationIdToDelete, setLocationIdToDelete] = useState();
    const [openModalToDelete, setOpenModalToDelete] = useState(false);

    async function openTheModalToDelete(companyId) {
        setLocationIdToDelete(companyId);
        setOpenModalToDelete(true);
    }

    async function closeTheModalToDelete() {
        setOpenModalToDelete(false);
    }



    return (
        <>
            {
                (locations.length !== 0) && (Array.isArray(locations))
                    ?
                    locations.map((location) =>
                        <>
                            <div className="card d-flex justify-content-center w-50 m-auto bg-dark text-white mt-2 mb-1">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-center m-auto">
                                        <img src={`${route.serverURL}/locations/${location.location_pic}`} alt="location_picture" className="text-center" width='200' height='150' />
                                    </div>
                                    <div className="ms-3">
                                        <h5 className="card-title">{location.title}</h5>
                                        <div className="mt-2">
                                            <span className="bi bi-card-text">
                                                <span className="ms-1">{location.description}</span>
                                            </span>
                                        </div>
                                        <div className=" mt-2 mb-2">
                                            <span className="bi bi-geo">
                                                <span className=" ms-1">
                                                    {`${location?.country},
                                            ${location?.city}, ${lang === 'ua' ? 'вул. ' : 'st. '}${location?.street} ${location?.house}`}
                                                </span>
                                            </span>
                                        </div>
                                        {currentUser.role === 'admin' ? <div>
                                            <Button onClick={() => openTheModal(location.id)} type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </Button>
                                            <Button onClick={() => openTheModalToDelete(location.id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                                <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                                </svg>
                                            </Button>
                                        </div> : <></>}

                                    </div>
                                </div>
                                <Modal className="bg-dark" centered show={openModal} onHide={() => closeTheModal()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark " closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Зміна даних' : 'Change Location'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className=" bg-dark d-flex flex-column  justify-content-center">

                                            <Form.Label className="form_label" htmlFor="locName">{lang === 'ua' ? 'Назва Локації' : 'Location Name'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="bg-dark text-white mb-3"
                                                id="locName"
                                                autoComplete="off"
                                                onChange={(e) => setlocationName(e.target.value)}
                                                value={locationName}
                                            />

                                            <Form.Label className="form_label" htmlFor="compDescr">{lang === 'ua' ? 'Опис Локації' : 'Location Description'}
                                            </Form.Label>
                                            <textarea
                                                className="bg-dark text-white mb-3 p-2"
                                                id="compDescr" rows="3"
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
                                            // defaultValue={''}
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
                                            // defaultValue={''}
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
                                            // defaultValue={''}
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
                                            // defaultValue={''}
                                            />
                                            <Form.Label className="" htmlFor="posteer">{lang === 'ua' ? 'Фото' : 'Photo'}</Form.Label>
                                            <Form.Control
                                                type="file"
                                                className="bg-dark text-white mb-3"
                                                id="posteer"
                                                autoComplete="off"
                                                accept="image/jpeg,image/png,image/jpg"
                                                onChange={addImage}
                                            // value={eventPoster}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">
                                            <Button variant="secondary" style={{ textAlign: 'center' }} onClick={() => updateLocation(location.id)}>{lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal>



                                <Modal className="bg-dark" centered show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark" closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Видалення локації' : 'Deleting Location'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="bg-dark">
                                            <h1 className="h5">{lang === 'ua' ? 'Ви впевнені що хочете видалити локацію?' : 'Are you sure to delete location?'}</h1>
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">

                                            <Button variant="danger" onClick={() => toDeleteCompany()}>{lang === 'ua' ? 'Видалити' : 'Delete'}</Button>
                                            <Button variant="secondary" onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal>

                            </div>

                        </>
                    )
                    :
                    <h1>{lang === 'ua' ? 'Локацій немає' : 'No locations'}</h1>
            }



        </>
    )
}

export default Location;