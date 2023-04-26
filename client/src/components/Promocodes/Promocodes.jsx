import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import SpinnerLoading from '../Other/Spinner';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Select from 'react-select'

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DISC_REGEX = /^[1-9][0-9]?$|^100$/;

const Promocodes = () => {

	const location = useLocation().pathname.split('/');
	const currentId = location[2];
	const lang = localStorage.getItem('lang');
	const [pageCount, setPageCount] = useState(0);
	const navigate = useNavigate();
	const { search } = useLocation();
  const page = search.split('=');
	const [isLoadingPage, setIsLoadingPage] = useState(true);
	const [promocodes, setPromocodes] = useState();
    const currentUser = JSON.parse(localStorage.getItem('autorized'));

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);


    const [usersEvents, setUsersEvents] = useState([]);
    const [codeProm, setCodeProm] = useState('');
    const [discountProm, setDiscountProm] = useState('');
    const [expiresAtProm, setExpiresAt] = useState('');
    const [countProm, setCountProm] = useState('');
  
    const [chosenEvent, setChosenEvent] = useState('')

    const [validDiscount, setValidDiscount] = useState(false);
    useEffect(() => {
      setValidDiscount(DISC_REGEX.test(discountProm));
    }, [discountProm]);

	const getPromocodes = async () => {
		try {
			const response = await axios.get(`/api/promocodes/company/promocodes/${currentId}/?page=${page[1]}`)
			console.log(response);
			setPromocodes(response.data.values.data);
			setPageCount(response.data.values.meta.totalPages)
			setIsLoadingPage(false);
		} catch (error) {

		}
	}
	useEffect(() => {
		getPromocodes();
	}, [])
	const handlePageClick = async (data) => {
		navigate(`/company-promocodes/${currentId}/?page=${data.selected + 1}`);
		window.scrollTo(0, 0)
		
			setIsLoadingPage(true);

			const response = await axios.get(`/api/promocodes/company/promocodes/${currentId}/?page=${data.selected + 1}`);
			// console.log(response);
			setPromocodes(response.data.values.data);
			setIsLoadingPage(false);
		
	}

    const [promocodeId, setPromocodeId] = useState();
    const [openModal, setOpenModal] = useState(false);

    async function openTheModal(id) {
        setPromocodeId(id)
        setOpenModal(true);
        setIsLoadingModal(true)
        try {
            const res1 = await axios.get(`/api/events/selectByCompanyId/${currentId}`)

            setUsersEvents(res1.data.values.values.map((value) => {
              const data = { value: value.id, label: value.title }
              return data
            }))

            const response = await axios.get(`/api/promocodes/${id}`)
            
            const res2 = await axios.get(`/api/events/${response.data.values.values.event_id}`)

            setChosenEvent({value: res2.data.values.values.id, label: res2.data.values.values.title})


            setCodeProm(response.data.values.values.code);
            setCountProm(response.data.values.values.count)
            setDiscountProm(response.data.values.values.discount)
            const normalFormatExpiresAt = moment(response.data.values.values.expiresAt, moment.defaultFormat).toDate();
            setExpiresAt(normalFormatExpiresAt);
            setIsLoadingModal(false);
        } catch (error) {
            setIsLoadingModal(false);
            console.log(error)
            navigate('/500')
        }
    }

    async function closeTheModal() {
        setOpenModal(false);
    }


    const [promocodeIdToDelete, setPromocodeIdToDelete] = useState();
    const [openModalToDelete, setOpenModalToDelete] = useState(false);

    async function openTheModalToDelete(promId) {
        setPromocodeIdToDelete(promId);
        setOpenModalToDelete(true);
    }

    async function closeTheModalToDelete() {
        setOpenModalToDelete(false);
    }

    async function toDeletePromocode() {
        try {
            setIsLoading(true)
            const response = await axios.delete(`/api/promocodes/${promocodeIdToDelete}/${currentUser.accessToken}`)
            setIsLoading(false)
            document.location.reload();
        } catch (error) {
            setIsLoading(false)

            console.log(error)
            navigate('/500')
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

      async function updatePromocode() {
        try {
            setIsLoading(true)
          const response = await axios.patch(`/api/promocodes/${promocodeId}/${currentUser.accessToken}`, JSON.stringify(
            {           
                company_id: currentId,
                event_id: +chosenEvent.value,
                code: codeProm,
                discount: discountProm,
                expiresAt: expiresAtProm,
                used: 1,
                count: countProm
            }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            })
            setIsLoading(false)
    
          document.location.reload();
        } catch (error) {
            setIsLoading(false)
          console.log(error)
        }
      }

	return isLoadingPage ? <SpinnerLoading style={{ style: 'page-loading' }} /> : (
		<>
			<div className="container-xxl me-3 d-flex flex-column mt-5">
				<div className='d-flex flex-wrap '>
					{
						(promocodes.length !== 0) && (Array.isArray(promocodes))
							?
							promocodes.map((promocode) => {
								const normalFormatEXP = moment(promocode.item.expiresAt, moment.defaultFormat).toDate();
								const formatedExpiresAt = moment(normalFormatEXP).format('HH:mm, D MMMM');
								return (
									<>
										<div className="card d-flex w-25  mb-5 bg-dark text-white p-2 me-5">
											<div className="card-body d-flex ">
												<div className="ms-3">
													<a href={`/event/${promocode.event.id}`} className='bth button-link text-white fs-5 mb-2'>{promocode.event.title}</a>

													<h5 className="card-title">{lang === 'ua' ? 'Код: ' : 'Code: '}{promocode.item.code}</h5>
													<div className="mt-2">
														<span className="">{lang === 'ua' ? 'Знижка: ' : 'Discount: '}{promocode.item.discount}</span>
														<span className="bi bi-percent"></span>
													</div>
													<div>
														<span>{lang === 'ua' ? 'Залишилось використань: ' : 'Left: '}{promocode.item.count}</span>
														<div>
															<span className='bi bi-clock '></span>
															<span className='ms-1'>{lang === 'ua' ? 'Дійсний до: ' : 'Expires At: '}{formatedExpiresAt}</span>
														</div>

													</div>

													 <div>
                                            <Button onClick={() => openTheModal(promocode.item.id)} type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </Button>
                                            <Button onClick={() => openTheModalToDelete(promocode.item.id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                                <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                                </svg>
                                            </Button>
                                        </div>

												</div>
											</div>
											<Modal className="bg-dark" centered show={openModal} onHide={() => closeTheModal()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark " closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Зміна даних' : 'Change Promocode'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className=" bg-dark d-flex flex-column  justify-content-center">
                                        {isLoadingModal ? <div className='d-flex justify-content-center'> <SpinnerLoading style={{ style: 'modal-loading' }} /> </div> :
                                        <>
                                            <Form.Label className="" htmlFor="codeProm">{lang === 'ua' ? 'Назва промокоду' : 'Promocode'}
                                            </Form.Label>
                                            <Form.Control
                                            type="text"
                                            className="bg-dark text-white mb-3"
                                            id="codeProm"
                                            autoComplete="off"
                                            onChange={(e) => setCodeProm(e.target.value)}
                                            value={codeProm}
                                            />

                                            <Form.Label className="mt-2" htmlFor="events">{lang === 'ua' ? 'Оберіть подію' : 'Choose event'}</Form.Label>
                                            <Select
                                            placeholder={lang === 'ua' ? 'Оберіть подію' : 'Choose event'}
                                            value={chosenEvent}
                                            styles={customStyles}
                                            id='events'
                                            options={usersEvents}
                                            onChange={(option) => {
                                                setChosenEvent(option);
                                            }}
                                            />

                                            <Form.Label className="mt-2" htmlFor="disc">
                                            {lang === 'ua' ? 'Знижка (%) (мін - 1, макс - 100)' : 'Discount (%) ( min - 1, max - 100)'}
                                            <FontAwesomeIcon icon={faCheck} className={validDiscount ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validDiscount || !discountProm ? "hide" : "invalid"} />
                                            </Form.Label>
                                            <Form.Control
                                            type="number"
                                            className="bg-dark text-white"
                                            id="disc"
                                            autoComplete="off"
                                            onChange={(e) => setDiscountProm(e.target.value)}
                                            value={discountProm}
                                            min={1}
                                            max={100}
                                            />

                                            <Form.Label className="mt-2" htmlFor="disc">
                                            {lang === 'ua' ? 'К-сть промокодів' : 'Quantity of promocodes'}
                                            </Form.Label>
                                            <Form.Control
                                            type="number"
                                            className="bg-dark text-white"
                                            id="disc"
                                            autoComplete="off"
                                            onChange={(e) => setCountProm(e.target.value)}
                                            value={countProm}
                                            min={1}
                                            max={2000}
                                            />

                                            <Form.Label className="mt-2"> {lang === 'ua' ? 'Дійсний до' : 'Expires at'}</Form.Label>
                                            <DatePicker
                                            className="rounded w-100 p-1 bg-dark text-white border"
                                            selected={expiresAtProm}
                                            timeFormat="HH:mm"
                                            minDate={moment().toDate()}
                                            onChange={date => setExpiresAt(date)}
                                            timeIntervals={15}
                                            dateFormat="d MMMM yyyy, HH:mm "
                                            timeCaption="time"
                                            showTimeInput
                                            required
                                            />
                                            </>
                                        }
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">
                                            <Button variant="secondary" disabled={isLoading ? true : false}  onClick={() => updatePromocode()}>{isLoading || isLoadingModal ? <SpinnerLoading style={{style: 'd-flex justify-content-center'}}/> : lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal>



											<Modal className="bg-dark" centered show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark" closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Видалення промокода' : 'Deleting Promocode'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="bg-dark">
                                            <h1 className="h5">{lang === 'ua' ? 'Ви впевнені що хочете видалити промокод?' : 'Are you sure to delete promocode?'}</h1>
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">
                                            <Button variant="secondary" onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                                            <Button variant="danger"  onClick={() => toDeletePromocode()}>{lang === 'ua' ? 'Видалити' : 'Delete'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal>

										</div>
									
									</>
								)
							}
							)
							:
							<h1 className='mt-1'>{lang === 'ua' ? 'Промокодів немає' : 'No promocodes'}</h1>
					}
				</div>
				
			</div>
			<ReactPaginate
											previousLabel={'previous'}
											nextLabel={'next'}
											breakLabel={'...'}
											pageCount={pageCount}
											marginPagesDisplayed={2}
											forcePage={+page[1] - 1}
											pageRangeDisplayed={3}
											onPageChange={handlePageClick}
											containerClassName={'pagination justify-content-center'}
											pageClassName={''}
											pageLinkClassName={''}
											previousClassName={''}
											previousLinkClassName={' '}
											nextClassItem={''}
											nextLinkClassName={' '}
											breakClassName={''}
											breakLinkClassName={''}
											activeClassName={'active'}
										/>
		</>

	)
}

export default Promocodes;