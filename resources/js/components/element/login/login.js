import { React, useRef } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import './login.scss';

function Login(props) {
    const inputEmail = useRef();
    const inputPassword = useRef();

    //Function used to login
    const handleLogin = async () => {
        let user = { "email": inputEmail.current.value, "password": inputPassword.current.value };
        await axios.post('api/login', user)
            .then((response) => {
                if (response.data.status_code == 200) {
                    let user = JSON.stringify(response.data);
                    localStorage.setItem('user', user);
                    toast.success(response.data.message);
                    props.setUser(response.data);
                    props.onHide();
                }
                else {
                    toast.error(response.data.message);
                }
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                backdrop="static"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="user-email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="user-email" required="required" placeholder="Enter your email" ref={inputEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user-password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="user-password" required="required" placeholder="Enter your password" ref={inputPassword} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="button" onClick={() => handleLogin()}>Login</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;