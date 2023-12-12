import { FormEvent, useRef, useState } from 'react';

import { useAuthContext } from '../../api/AuthContext';

const RegisterForm = () => {
    const { login } = useAuthContext();
    const [errors, setErrors] = useState<string[]>([]);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Registering...");

        const email = emailRef.current?.value;
        const userName = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        setErrors([]);

        if (!email) {
            setErrors((errors) => [...errors, "Email is required."]);
        }

        if (!userName) {
            setErrors((errors) => [...errors, "Username is required."]);
        }

        if (!password) {
            setErrors((errors) => [...errors, "Password is required."]);
        }

        if (!confirmPassword) {
            setErrors((errors) => [...errors, "Confirm password is required."]);
        }

        if (errors.length > 0) {
            return;
        }

        if (password !== confirmPassword) {
            setErrors((errors) => [...errors, "Passwords do not match."]);

            return;
        }

        // call api to get username, token

        // login(username, token);
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Register</h1>
                </div>

                {errors.length > 0 && (
                    <div className='col-12'>
                        <div className='alert alert-danger' role='alert'>
                            <ul className='list-unstyled'>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <form className='col-12' onSubmit={handleSubmit}>
                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            id='floatingEmail'
                            type='text'
                            placeholder='Email'
                            ref={emailRef}
                            required
                        />

                        <label htmlFor='floatingInput'>Email</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            id='floatingInput'
                            type='text'
                            placeholder='Username'
                            ref={usernameRef}
                            required
                        />

                        <label htmlFor='floatingInput'>Username</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            id='floatingPassword'
                            type='password'
                            placeholder='Password'
                            ref={passwordRef}
                            required
                        />

                        <label htmlFor='floatingPassword'>Password</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input
                            className='form-control'
                            id='floatingPassword'
                            type='password'
                            placeholder='Confirm Password'
                            ref={confirmPasswordRef}
                            required
                        />

                        <label htmlFor='floatingPassword'>Confirm Password</label>
                    </div>

                    <button type={"submit"} className='btn btn-sm btn-outline-success mt-3 w-100'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
