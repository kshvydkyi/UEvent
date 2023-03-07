import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
// import './Event.css'
import moment from 'moment';
import route from "../../api/route";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select'


const COMPANY_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{3,23}$/;
const DESCR_REGEX = /^[a-zA-Zа-яА-Яє-їЄ-Ї0-9_/\s/\.]{10,150}$/;




const CurrentCompany = () => {
  const location = useLocation().pathname.split('/');
  const currentId = location[2];

  const lang = localStorage.getItem('lang');
  const [companies, setCompanies] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));

  const [employeeLogin, setEmployeeLogin] = useState('');

  const navigate = useNavigate();




  const getCompanies = async () => {
    const response = await axios.get(`/api/companies/${currentId}`);
    setCompanies(response.data.values.values);
  }

  useEffect(() => {
    getCompanies();
  }, [])


  function toRedirect(id) {
    navigate(`/createEventItem/${id}`)
  };


  const [openModal, setOpenModal] = useState(false);

  async function openTheModal() {
    setOpenModal(true);
  }

  async function closeTheModal() {
    setOpenModal(false);
  }


  const addEmployee = async (e) => {
    try {
      console.log('add emplyee')
      const response = await axios.post(`/api/companies/addUser/${currentUser.accessToken}`, JSON.stringify({
        user_id: +employeeLogin,
        company_id: +currentId,
      }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      console.log(response);
      document.location.reload();
    }
    catch (err) {
      console.log(err?.response)
      if (err?.response.data.status === 404) {
        navigate('/404');
      }
      else {
        console.log(err)
        // navigate('/500')
      }
    }
  }



  return (
    <>
      {
        companies.user_id === currentUser.userId ?
          <div class="upload-btn-wrapper">
            <Button onClick={() => openTheModal()} id="btn_create_event" className="btn btn-secondary">{lang === 'ua' ? `Додати співробітника` : `Add employee`}</Button>
            <input type="button" name="myfile" />
          </div>
          : <> </>
      }

      <div className="card d-flex justify-content-center w-25 m-auto bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title">{lang === 'ua' ? 'Назва: ' : 'Title: '}{companies.title}</h5>
          <p className="card-text">{lang === 'ua' ? 'Опис: ' : 'Description: '}{companies.description}</p>
        </div>
      </div>


      <Modal style={{ backgroundColor: 'black' }} show={openModal} onHide={() => closeTheModal()}>
        <Modal.Header style={{ backgroundColor: 'grey' }} closeButton>
          <Modal.Title className="text-black">{lang === 'ua' ? 'Додавання співробітника' : 'Adding Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'grey' }}>

          <Form.Label className="form_label text-black" htmlFor="compName">{lang === 'ua' ? 'Логін користувача' : 'User Login'}
          </Form.Label>
          <Form.Control
            type="text"
            className="bg-dark text-white mb-3"
            id="compName"
            autoComplete="off"
            onChange={(e) => setEmployeeLogin(e.target.value)}
            value={employeeLogin}
          />

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'grey' }}>
          <Button variant="primary" style={{ textAlign: 'center' }} onClick={() => addEmployee()}>{lang === 'ua' ? 'Додати співробітника' : 'Add Employee'}</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default CurrentCompany;