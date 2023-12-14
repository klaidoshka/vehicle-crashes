import { FormEvent, useRef, useState } from 'react';

import Result, { resultOfError } from '../../api/rest/Result';
import { AuthEndpoints } from '../../constants/Endpoints';
import { backend } from '../../services/BackendService';

const RegisterForm = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        let errorsApplied = false;

        setErrors(() => {
            let messages: string[] = [];

            if (!email) {
                messages = [...messages, "Email is required."];
            }

            if (!username) {
                messages = [...messages, "Username is required."];
            }

            if (!password) {
                messages = [...messages, "Password is required."];
            }

            if (!confirmPassword) {
                messages = [...messages, "Confirm password is required."];
            }

            if (password !== confirmPassword) {
                messages = [...messages, "Passwords do not match."];
            }

            if (messages.length > 0) {
                errorsApplied = true;
            }

            return messages;
        });

        if (errorsApplied) {
            return;
        }

        await backend
            .post<Result>(AuthEndpoints.register, {
                email: email,
                username: username,
                password: password
            })
            .then(() => {
                setErrors([
                    "You have successfully registered. However, you still need to verify your email. Click the link in the email we sent you."
                ]);
            })
            .catch((e) => {
                const result = resultOfError(e);

                if (result.message) {
                    setErrors([result.message!]);
                }

                if (result.messages) {
                    setErrors((errors) => [...errors, ...result.messages!]);
                }
            })
            .finally(() => {
                passwordRef.current!.value = "";
                confirmPasswordRef.current!.value = "";
            });
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
