import React, { useState } from 'react'
import './Register.css'
import validateEmail from '../../utils/EmailValidation'
import PasswordStrengthChecker, {findPasswordStrengthIssues} from '../../utils/PasswordStrengthChecker'

export default function Register(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [passwordStrength, setPasswordStrength] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const minUsernameLength = 3
    const maxUsernameLength = 16

    function register(e)
    {
        e.preventDefault()
        setErrorMessages([])

        if (!validateEmail(email)) {
            setErrorMessages((errorMessages) => [...errorMessages, `Please enter a valid email address`])
            return;
        }

        if (username.length < minUsernameLength || username.length > maxUsernameLength) {
            setErrorMessages((errorMessages) => [...errorMessages, `Username must contain between ${minUsernameLength} and ${maxUsernameLength} characters`])
            return;
        }

        if (PasswordStrengthChecker(password) < 3) {
            setErrorMessages((errorMessages) => [...errorMessages, "Password must be of the strength 'Strong'", ...findPasswordStrengthIssues(password)])
            return;
        }

        if (password !== rePassword) {
            setErrorMessages((errorMessages) => [...errorMessages, 'Passwords do not match'])
            return;
        }

        if (password !== rePassword) {
            setErrorMessages((errorMessages) => [...errorMessages, 'Passwords do not match'])
            return;
        }
            

        props.onRegister(username)
    }

    function handleEmailChange(e)
    {
        setEmail(e.target.value)
    }

    function handleUsernameChange(e)
    {
        setUsername(e.target.value)
    }

    function handlePasswordChange(e)
    {
        setPassword(e.target.value)

        switch (PasswordStrengthChecker(e.target.value)) {
            case 0:
                return setPasswordStrength(<p style={{ color: 'red' }}>Invalid Password Strength</p>)
            case 1:
                return setPasswordStrength(<p style={{ color: 'orange' }}>Poor Password Strength</p>)
            case 2:
                return setPasswordStrength(<p style={{ color: 'yellow' }}>OK Password Strength</p>)
            case 3:
                return setPasswordStrength(<p style={{ color: 'lime' }}>Strong Password Strength</p>)
            default:
                return setPasswordStrength(<p style={{ color: 'lime' }}>Very Strong Password Strength</p>)
        }
    }

    function handleRePasswordChange(e)
    {
        setRePassword(e.target.value)
    }

    return (
        <form className='register' onSubmit={ register }>
            <h1>Create an account</h1>
            <input placeholder='Email' onChange={handleEmailChange} />
            <input placeholder='Username' onChange={handleUsernameChange} />
            <div className='password-strength'>
                <p className='strength'>{passwordStrength}</p>
            </div>
            <input type='password' placeholder='Password' onChange={handlePasswordChange} />
            <input type='password' placeholder='Re-enter password' onChange={handleRePasswordChange} />
            <button>Create Account</button>
            <p className='already-registered'><a href='#'>Already have an account?</a></p>
            <ul className={'error-box ' + (errorMessages.length > 0 ? '' : 'no-display')}>
                {errorMessages.map(error =>
                {
                    return (<li className='error-message'>{error}</li>)
                })}
            </ul>
        </form>
    )
}
