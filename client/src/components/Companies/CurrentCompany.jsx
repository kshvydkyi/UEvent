import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import '../../App.css'
import route from "../../api/route";
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'

const CurrentCompany = () => {
  const location = useLocation().pathname.split('/');
  const currentId = location[2];

  const lang = localStorage.getItem('lang');
  const [companies, setCompanies] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('autorized'));
const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [employeeId, setEmployeeId] = useState('');

  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);


  const getCompanies = async () => {
    try {
      const response = await axios.get(`/api/companies/${currentId}`);
    setCompanies(response.data.values.values);
    setIsLoadingPage(false)
    } catch (error) {
    setIsLoadingPage(false)
      navigate('/500')
    }
  }

  useEffect(() => {
    getCompanies();
  }, [])


 


  const [openModal, setOpenModal] = useState(false);

  async function openTheModal() {
    setOpenModal(true);
  }

  async function closeTheModal() {
    setOpenModal(false);
  }


  const getUsers = async () => {
    const response = await axios.get(`/api/users/`);
    setAllUsers(response.data.values.values.map((value) => {
      const data = { value: value.id, label: value.login }
      return data;
    }));
  }

  useEffect(() => {
    getUsers();
  }, [])


  const addEmployee = async (e) => {
    // e.preventDefault();
    try {
        const response = await axios.post(`/api/companies/addUser/${currentId}/${currentUser.accessToken}`, 
        JSON.stringify({       
            user_id: +employeeId.value
          }), 
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        console.log('res',response);

        document.location.reload();
    }
    catch (err) {

        if (err?.response.data.status === 404) {
            navigate('/404');
        }
        else {
            navigate('/500')
        }
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



  return isLoadingPage ? <SpinnerLoading style={{style: 'page-loading'}} /> :  (
    <>
      

      <div className="card d-flex justify-content-center w-25 mt-3 m-auto bg-dark text-white">
        <div className='d-flex card-body'>
            <div className='d-flex flex-column align-items-center me-2'>
            {
              companies.company_pic === undefined || companies.company_pic.length === 0  ?       
              <img src={`${route.serverURL}/company-pic/default_company.png`} alt="company pic" width={100} height={100} />
              :
              <img src={`${route.serverURL}/company-pic/${companies.company_pic}`} alt="company pic" width={100} height={100} />
            }
            </div>
            <div className='d-flex flex-column'>
              <h5 className="card-title">{companies.title}</h5>
              <div className="d-flex">
                        <span className="bi bi-card-text ">
                        <span className="card-text ms-2 text-align-justify">{companies.description}</span>
                        </span>
                      </div>
            </div>
        </div>
        {
        companies.user_id === currentUser.userId ?
          <div className="ms-3 mb-3">
            <Button onClick={() => openTheModal()} id="btn_create_event" className="btn btn-secondary">{lang === 'ua' ? `Додати співробітника` : `Add employee`}</Button>
         
          </div>
          : <></>
      }
      </div>


      <Modal className="bg-dark" centered show={openModal} onHide={() => closeTheModal()}>
      <div className="border border-secondary rounded">
        <Modal.Header className="bg-dark" closeButton closeVariant="white">
          <Modal.Title className="">{lang === 'ua' ? 'Додавання співробітника' : 'Adding Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">

            <Select
            placeholder={lang === 'ua' ? 'Оберіть користувача' : 'Choose user'}
            value={employeeId}
            className='bg-dark'
            styles={customStyles}
            id='user'
            options={allUsers}
            onChange={(option) => {
              setEmployeeId(option);
            }}
          />

        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary"  onClick={() => addEmployee()}>{lang === 'ua' ? 'Додати співробітника' : 'Add Employee'}</Button>
        </Modal.Footer>
        </div>
      </Modal>

    </>
  )
}

export default CurrentCompany;