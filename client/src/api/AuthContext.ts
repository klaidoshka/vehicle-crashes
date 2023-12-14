import { createContext, useContext } from 'react';

import { AuthEndpoints } from '../constants/Endpoints';
import AuthenticationResponse from '../dto/AuthenticationResponse';
import { backend } from '../services/BackendService';
import Result from './rest/Result';

const JWT_ID = "crashes/JWT/-token";

interface IAuthInfo {
    token?: string;
    userName?: string;
    isAuthenticated(): boolean;
    login(onSuccess: () => void, token: string, userName: string): void;
    logout(onSuccess: () => void): void;
    tryRenewSession(onSuccess: () => void): void;
}

class AuthInfo implements IAuthInfo {
    public token?: string;
    public userName?: string;

    constructor(token?: string, userName?: string) {
        this.token = token;
        this.userName = userName;
    }

    isAuthenticated = (): boolean => {
        return this.token ? true : false;
    };

    login = (onSuccess: () => void, token: string, userName: string): void => {
        localStorage.setItem(JWT_ID, token);

        this.token = token;
        this.userName = userName;

        backend.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        onSuccess();
    };

    logout = (onSuccess: () => void): void => {
        localStorage.removeItem(JWT_ID);

        this.token = undefined;
        this.userName = undefined;

        backend.defaults.headers.common["Authorization"] = undefined;

        onSuccess();
    };

    tryRenewSession = (onSuccess: () => void): void => {
        if (this.isAuthenticated()) {
            return;
        }

        const token = localStorage.getItem(JWT_ID);

        if (!token || token === "undefined") {
            return;
        }

        backend
            .post<Result<AuthenticationResponse>>(AuthEndpoints.profile, {
                token: token
            })
            .then((response) => {
                this.login(onSuccess, response.data.value!.token, response.data.value!.userName);
            })
            .catch(() => {});
    };
}

const AuthContext = createContext<IAuthInfo>(new AuthInfo(undefined, undefined));
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthInfo, useAuthContext };
export type { IAuthInfo };
