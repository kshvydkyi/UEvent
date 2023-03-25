import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import SpinnerLoading from '../Other/Spinner';

const Promocodes = () => {

    const location = useLocation().pathname.split('/');
    const currentId = location[2];
    const lang = localStorage.getItem('lang');


    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [promocodes, setPromocodes] = useState();


    const getPromocodes = async( ) => {
        try {
            const response = await axios.get(`/api/promocodes/company/promocodes/${currentId}`)
            console.log(response);
            setPromocodes(response.data.values.values);
            setIsLoadingPage(false);
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getPromocodes();
    }, [])

  return isLoadingPage ? <SpinnerLoading style={{style: 'page-loading'}} /> : (
    <>
    {
                (promocodes.length !== 0) && (Array.isArray(promocodes))
                    ?
                    promocodes.map((promocode) =>
                        <>
                            <div className="card d-flex justify-content-center w-75 m-auto bg-dark text-white mt-3 mb-1">
                                <div className="card-body d-flex ">
                                    <div className="ms-3">
                                        <h5 className="card-title">{promocode.item.code}</h5>
                                        <a href={`/event/${promocode.event.id}`} className='bth button-link'>{promocode.event.title}</a>
                                        <div className="mt-2">
                                            <span className="bi bi-card-text">
                                                <span className="ms-1">{promocode.item.discount} %</span>
                                            </span>
                                        </div>
                                     
                                        {/* {currentUser.role === 'admin' ? <div>
                                            <Button onClick={() => openTheModal(location.id)} type="button" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </Button>
                                            <Button onClick={() => openTheModalToDelete(location.id)} type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                                                <svg width="16" height="16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" />
                                                </svg>
                                            </Button>
                                        </div> : <></>} */}

                                    </div>
                                </div>
                                {/* <Modal className="bg-dark" centered show={openModal} onHide={() => closeTheModal()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark " closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Зміна даних' : 'Change Location'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className=" bg-dark d-flex flex-column  justify-content-center">
                                            {isLoadingModal ? <div className='d-flex justify-content-center'> <SpinnerLoading style={{ style: 'modal-loading' }} /> </div> :
                                                <>
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
                                                </>
                                            }
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">
                                            <Button variant="secondary" disabled={isLoading ? true : false}  onClick={() => updateLocation(location.id)}>{isLoading || isLoadingModal ? <SpinnerLoading style={{style: 'd-flex justify-content-center'}}/> : lang === 'ua' ? 'Змінитити' : 'Save changes'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal> */}



                                {/* <Modal className="bg-dark" centered show={openModalToDelete} onHide={() => closeTheModalToDelete()}>
                                    <div className="border border-secondary rounded">
                                        <Modal.Header className="bg-dark" closeButton closeVariant="white">
                                            <Modal.Title className="">{lang === 'ua' ? 'Видалення локації' : 'Deleting Location'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="bg-dark">
                                            <h1 className="h5">{lang === 'ua' ? 'Ви впевнені що хочете видалити локацію?' : 'Are you sure to delete location?'}</h1>
                                        </Modal.Body>
                                        <Modal.Footer className="bg-dark">
                                            <Button variant="secondary" onClick={() => closeTheModalToDelete()}>{lang === 'ua' ? 'Відміна' : 'Cancel'}</Button>
                                            <Button variant="danger" disabled={isLoading ? true : false} onClick={() => toDeleteCompany()}>{isLoading ? <SpinnerLoading style={{style: 'd-flex justify-content-center'}}/> : lang === 'ua' ? 'Видалити' : 'Delete'}</Button>
                                        </Modal.Footer>
                                    </div>
                                </Modal> */}

                            </div>

                        </>
                    )
                    :
                    <h1 className='mt-1'>{lang === 'ua' ? 'Промокодів немає' : 'No promocodes'}</h1>
            }
</>
  )
}

export default Promocodes;