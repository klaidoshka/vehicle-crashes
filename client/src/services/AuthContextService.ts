import { ReactNode } from 'react';

type AuthContextProperties = {
    children?: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProperties) => {
    return { children };
};

export { AuthContextProvider };
