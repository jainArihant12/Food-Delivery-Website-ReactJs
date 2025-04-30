import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from './../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Update form data when the user types
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // Handle login or registration based on the current state
    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        console.log('Sending request to:', newUrl);
        console.log('Data being sent:', data);

        try {
            const response = await axios.post(newUrl, data);

            console.log('API Response:', response);  // Log the full response

            if (response.data.success) {
                // Save token and close login popup
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                // Alert if login fails
                alert(response.data.message);
            }
        } catch (error) {
            // Log and alert if there’s an error with the API call
            console.error('Error during login or registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? <></> : 
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                        />
                    }
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                    />
                </div>

                <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : 'Login'}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                {currentState === 'Login' ?
                    <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                    :
                    <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }

            </form>
        </div>
    );
};

export default LoginPopup;
