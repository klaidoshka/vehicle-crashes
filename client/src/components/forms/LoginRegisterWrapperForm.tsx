import { useState } from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type AuthFormType = "LOGIN" | "REGISTER";

const LoginRegisterWrapperForm = () => {
    const [type, setType] = useState<AuthFormType>("LOGIN");

    const toggle = () => {
        setType(type === "LOGIN" ? "REGISTER" : "LOGIN");
    };

    return type === "LOGIN" ? (
        <>
            <LoginForm />

            <div className='col-12 d-flex justify-content-center align-items-center w-100'>
                <a
                    href=''
                    className='w-100 text-center'
                    onClick={(e) => {
                        e.preventDefault();
                        toggle();
                    }}
                >
                    Have no account? Register instead!
                </a>
            </div>
        </>
    ) : type === "REGISTER" ? (
        <>
            <RegisterForm />

            <div className='col-12 d-flex justify-content-center align-items-center w-100'>
                <a
                    href=''
                    className='w-100 text-center'
                    onClick={(e) => {
                        e.preventDefault();
                        toggle();
                    }}
                >
                    Already have an account? Login instead!
                </a>
            </div>
        </>
    ) : (
        <></>
    );
};

export default LoginRegisterWrapperForm;
