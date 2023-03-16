import axios from "../../api/axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SpinnerLoading from "../Other/Spinner";


const ChangeUserAvatar = () => {
    const lang  = localStorage.getItem('lang');
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const errRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const user = JSON.parse(localStorage.getItem('autorized'));
    const navigate = useNavigate();
    const addImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // console.log(selectedFile);
        formData.append("image", selectedFile);
        // console.log(formData);
        try {
            setLoading(true);
            const response = await axios.patch(`/api/users/avatar/${user.userId}/${user.accessToken}`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }

            )
            console.log(response);
            setImage(response.data.values.path);
            setLoading(false);
            navigate(`/user/${user.userId}`);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
            setErrMsg( lang === 'ua' ? 'Помилка' : 'Error' )
        }

    }
    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return(

      <> 
   
    <div className="form-background p-5 d-flex justify-content-center text-white">
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>   
        <form className='d-flex flex-column bg-dark p-3' onSubmit={addImage}>
            <Form.Control
                className="p-3 bg-dark text-white border border-none mb-3"
                type="file"
                onChange={handleFileSelect}
                accept="image/jpeg,image/png,image/jpg"
            />
            <Button variant="secondary" type="submit" disabled={selectedFile ? false : true}>{isLoading ? <SpinnerLoading /> :  lang === 'ua' ? 'Змінити фото' : 'Change photo' }</Button>
        </form>
    </div>
    </> 
    )
}

export default ChangeUserAvatar;