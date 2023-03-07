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

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;


const Location = () => {
    const lang = localStorage.getItem('lang');
    const [locations, setLocations] = useState([]);
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

    async function updateCompany(id) {
        console.log(companyDescr, companyName, id)
        const response = await axios.patch(`/api/companies/${companyId}/${currentUser.accessToken}`, JSON.stringify({ description: companyDescr, title: companyName }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        document.location.reload();
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
                    locations.map(({ title, description, country, city, street, house, id }) =>
                        <>
                            <div className="card d-flex justify-content-center w-25 m-auto bg-dark text-white mt-4 mb-1">
                                <div className="card-body">
                                    <h5 className="card-title">{lang === 'ua' ? 'Назва: ' : 'Title: '}{title}</h5>
                                    <p className="card-text">{lang === 'ua' ? 'Опис: ' : 'Description: '}{description}</p>
                                    <p className="card-text">{lang === 'ua' ? 'Країна: ' : 'Country: '}{country}</p>
                                    <p className="card-text">{lang === 'ua' ? 'Місто: ' : 'City: '}{city}</p>
                                    <p className="card-text">{lang === 'ua' ? 'Вулиця: ' : 'Street: '}{street}</p>
                                    <p className="card-text">{lang === 'ua' ? 'Дім: ' : 'House: '}{house}</p>
                                    <Button onClick={() => openTheModalToDelete(id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}><svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                    </svg></Button>
                                </div>
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
                                            class="bg-dark text-white mb-3" id="compDescr" rows="3"
                                            autoComplete="off"
                                            onChange={(e) => setCompanyDescr(e.target.value)}
                                            value={companyDescr}
                                        >
                                        </textarea>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button disabled={!validCompanyName || !validcompanyDescr ? true : false} variant="primary" style={{ textAlign: 'center' }} onClick={() => updateCompany(id)}>{lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                                    </Modal.Footer>
                                </Modal>



                                <Modal style={{ backgroundColor: 'black' }} show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                                    <Modal.Header style={{ backgroundColor: 'grey' }} closeButton>
                                        <Modal.Title className="text-black">{lang === 'ua' ? 'Видалення локації' : 'Deleting Location'}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: 'grey' }}>
                                        <h1>{lang === 'ua' ? 'Ви впевнені що хочете видалити локацію?' : 'Are you sure to delete location?'}</h1>
                                    </Modal.Body>
                                    <Modal.Footer style={{ backgroundColor: 'grey' }}>

                                        <Button variant="primary" style={{ float: 'right', backgroundColor: 'red' }} onClick={() => toDeleteCompany()}>{lang === 'ua' ? 'Видалити' : 'Delete'}</Button>
                                        <Button variant="primary" style={{ float: 'left' }} onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                                    </Modal.Footer>
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