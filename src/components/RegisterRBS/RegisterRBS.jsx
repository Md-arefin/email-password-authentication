import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const RegisterRBS = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const auth = getAuth(app);
    const handleRegister = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, ',', password)

        // validation:
        setError("");
        setSuccess("");

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Please add at least two uppercase")
            return;
        }
        else if (!/(?=.*[!@#$*&])/.test(password)) {
            setError("Please add a special character")
            return;
        }
        else if (password.length < 6) {
            setError("Password must be 6 character")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const registeredUser = result.user;
                console.log(registeredUser);
                setError(' ');
                event.target.reset();
            })
            .catch(error => {
                console.error(error);
                setError(error.message)
            })
    }

    return (
        <div className='w-50 mx-auto my-5'>
            <h4 className='text-primary'>Please Register!!!</h4>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                        name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept our terms and conditions" />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='text-primary'><small>Already have a account? Please <Link to='/login'>Log in</Link></small></p>
        </div>
    );
};

export default RegisterRBS;