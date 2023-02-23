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

const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;


const Company = () => {
    const lang  = localStorage.getItem('lang');
    const [companies, setCompanies] = useState([]);
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



    const getCompanies = async () => {
		const response = await axios.get(`/api/companies/user-companies/${currentUser.userId}`);
		setCompanies(response.data.values.values);
	}

	useEffect(() => {
		getCompanies();
	}, [])

    async function toDeleteCompany(id) {
        const answer = window.confirm("Ви впевнені, що хочете видалити дану компанію?")
        if(answer) {
            const response = await axios.delete(`/api/companies/${id}/${currentUser.accessToken}`)
            document.location.reload();
        }
    }

    async function updateCompany(id) {
        console.log(companyDescr, companyName, id)
        const response = await axios.patch(`/api/companies/${companyId}/${currentUser.accessToken}`, JSON.stringify({ description: companyDescr, title: companyName}), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
                   document.location.reload();
    }



    return (
        <>
        <br/>
            {
                (companies.length !== 0) && (Array.isArray(companies))
                ?
                companies.map(({ title,description,id }) =>
                <>
                <div className="card d-flex justify-content-center text-black " style={{width: "20rem",margin: '0 auto', backgroundColor: '#dddbcb'}}>
                    <div className="card-body">
                        <h5 className="card-title">{ lang === 'ua' ? 'Назва: ' : 'Title: ' }{title}</h5>
                        <p className="card-text">{ lang === 'ua' ? 'Опис: ' : 'Description: ' }{description}</p>
                        <Button  onClick = {() => toDeleteCompany(id)}  type="button" className="btn btn-danger" style = {{marginRight: '10px'}}>{ lang === 'ua' ? 'Видалити' : 'Delete' }</Button>
                        <Button onClick = {() => openTheModal(id)} type="button" className="btn btn-warning">{ lang === 'ua' ? 'Змінити' : 'Edit' }</Button>
                    </div>

                    <Modal show={openModal} onHide={() => closeTheModal()}>
                <Modal.Header closeButton>
                <Modal.Title className = "text-black">{ lang === 'ua' ? 'Зміна даних' : 'Change company' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label className="form_label text-black" htmlFor="compName">{ lang === 'ua' ? 'Назва Компанії' : 'Company Name' }
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
                        
                        <Form.Label className="form_label text-black" htmlFor="compDescr">{ lang === 'ua' ? 'Опис Компанії' : 'Company Description' }
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
                <Button disabled={ !validCompanyName || !validcompanyDescr ? true : false} variant="primary" style = {{textAlign: 'center'}} onClick={() => updateCompany(id)}>{ lang === 'ua' ? 'Змінитити' : 'Save changes' }</Button>
                </Modal.Footer>
            </Modal>
            
                </div>
                <br/>


                </>
                )
                :
                <h1>{ lang === 'ua' ? 'У вас поки що немає компаній, ви їх можете створити в своєму профілі' : 'You still have no companies, you can create it in your profile' }</h1>
            }


 
        </>
    )
}

export default Company;