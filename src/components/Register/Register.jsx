import React from 'react';

const Register = () => {

    const handleSubmit = ( event ) => {
        event.preventDefault();
       const email = event.target.email.value;
       const password = event.target.password.value;
       console.log(email,"===", password)
    }

    const handleEmailChange = (event) => {
        console.log(event.target.value)
    }

    const  handlePasswordBlur = ( event) => {
        console.log(event.target.value)
    }

    return (
        <div>
           <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your email'/>

                <input onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password'/>

                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;