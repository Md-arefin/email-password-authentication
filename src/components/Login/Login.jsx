import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const LogIn = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        // validation:
        setError("");
        setSuccess("");

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError("Please add at least two uppercase")
            return;
        }
        else if(!/(?=.*[!@#$*&])/.test(password)){
            setError("Please add a special character")
            return;
        }
        else if(password.length < 6){
            setError("Password must be 6 character")
            return;
        }
        
        signInWithEmailAndPassword(auth,email,password)
        .then( result => {
            const loggedUser = result.user;
            setSuccess("User log in")
            setError('')
        })
        .catch(error =>{
            setError(error.message)
            setSuccess('')
        })

    }

    return (
        <div className='w-50 mx-auto my-5'>
            <h1 className='text-primary my-2'>Please Login !!!</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='text-primary'><small>New to this website? Please <Link to='/register-rbs'>Register</Link></small></p>
        </div>
    );
};

export default LogIn;