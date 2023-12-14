import { FormEvent, useRef, useState } from 'react';

import { useAuthContext } from '../../api/AuthContext';
import Result, { resultOfError } from '../../api/rest/Result';
import { AuthEndpoints } from '../../constants/Endpoints';
import AuthenticationResponse from '../../dto/AuthenticationResponse';
import { backend } from '../../services/BackendService';

type LoginFormProperties = {
    onSuccess: () => void;
};

const LoginForm = ({ onSuccess }: LoginFormProperties) => {
    const { login } = useAuthContext();
    const [errors, setErrors] = useState<string[]>([]);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        let errorsApplied = false;

        setErrors(() => {
            let messages: string[] = [];

            if (!username) {
                messages = [...messages, "Username is required."];
            }

            if (!password) {
                messages = [...messages, "Password is required."];
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
            .post<Result<AuthenticationResponse>>(AuthEndpoints.login, {
                username: username,
                password: password
            })
            .then((response) => {
                login(onSuccess, response.data.value!.token, response.data.value!.userName);
            })
            .catch((e) => {
                const result = resultOfError(e);

                if (result.message) {
                    setErrors([result.message!]);
                }

                if (result.messages) {
                    setErrors((errors) => [...errors, ...result.messages!]);
                }

                passwordRef.current!.value = "";
            });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Login</h1>
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

                <form className='col-12' onSubmit={(e) => handleSubmit(e)}>
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

                    <button type={"submit"} className='btn btn-sm btn-outline-success mt-3 w-100'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
