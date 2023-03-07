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


const Company = () => {
  const lang = localStorage.getItem('lang');
  const [companies, setCompanies] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [companyName, setCompanyName] = useState('');
  const [validCompanyName, setValidCompanyName] = useState(false);

  const [companyDescr, setCompanyDescr] = useState('');
  const [validcompanyDescr, setValidCompanyDescr] = useState(false);

  const [companyId, setCompanyId] = useState();

  const [isLoading, setLoading] = useState(false);

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

  async function toDeleteCompany() {
    const response = await axios.delete(`/api/companies/${companyIdToDelete}/${currentUser.accessToken}`)
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


  const [companyIdToDelete, setCompanyIdToDelete] = useState();
  const [openModalToDelete, setOpenModalToDelete] = useState(false);

  async function openTheModalToDelete(companyId) {
    setCompanyIdToDelete(companyId);
    setOpenModalToDelete(true);
  }

  async function closeTheModalToDelete() {
    setOpenModalToDelete(false);
  }



  return (
    <>
      {
        (companies.length !== 0) && (Array.isArray(companies))
          ?
          companies.map((company) =>
            <>
              <div className="card d-flex justify-content-center w-25 m-auto bg-dark text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={() => window.location = `/company/${company.id}`}>{lang === 'ua' ? 'Назва: ' : 'Title: '}{company.title}</h5>
                  <p className="card-text">{lang === 'ua' ? 'Опис: ' : 'Description: '}{company.description}</p>
                  <Button onClick={() => openTheModal(company.id)} type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg></Button>
                  <Button onClick={() => openTheModalToDelete(company.id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}><svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
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
                    <Button disabled={!validCompanyName || !validcompanyDescr ? true : false} variant="primary" style={{ textAlign: 'center' }} onClick={() => updateCompany(company.id)}>{lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                  </Modal.Footer>
                </Modal>



                <Modal style={{ backgroundColor: 'black' }} show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                  <Modal.Header style={{ backgroundColor: 'grey' }} closeButton>
                    <Modal.Title className="text-black">{lang === 'ua' ? 'Видалення компанії' : 'Deleting company'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: 'grey' }}>
                    <h1>{lang === 'ua' ? 'Ви впевнені що хочете видалити компанію?' : 'Are you sure to delete company?'}</h1>
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
          <h1>{lang === 'ua' ? 'У вас поки що немає компаній, ви їх можете створити в своєму профілі' : 'You still have no companies, you can create it in your profile'}</h1>
      }



    </>
  )
}

export default Company;