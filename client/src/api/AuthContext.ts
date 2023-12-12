import { createContext, useContext } from 'react';

interface IAuthInfo {
    token?: string;
    userName?: string;
    isAuthenticated(): boolean;
    login(userName: string, token: string): Promise<void>;
    logout(): Promise<void>;
}

class AuthInfo implements IAuthInfo {
    public token?: string;
    public userName?: string;

    constructor(token?: string, userName?: string) {
        this.token = token;
        this.userName = userName;
    }

    isAuthenticated = (): boolean => {
        return this.token ? false : true;
    };

    login = async (userName: string, token: string): Promise<void> => {
        this.token = token;
        this.userName = userName;
    };

    logout = async (): Promise<void> => {
        this.token = undefined;
        this.userName = undefined;
    };
}

const AuthContext = createContext<IAuthInfo>(new AuthInfo(undefined, undefined));
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthInfo, useAuthContext };
export type { IAuthInfo };
