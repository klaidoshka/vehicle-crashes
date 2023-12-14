import { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { Person } from '@mui/icons-material';

import { useAuthContext } from './api/AuthContext.ts';
import CrashedVehicleLogo from './assets/image/logo.png';
import DialogAkaModule from './components/forms/dialogs/DialogAkaModule.tsx';
import LoginRegisterWrapperForm from './components/forms/LoginRegisterWrapperForm.tsx';
import CrashPage from './components/pages/crash/CrashPage.tsx';
import EmailConfirmed from './components/pages/EmailConfirmed.tsx';
import EmailUnconfirmed from './components/pages/EmailUnconfirmed.tsx';
import HomePage from './components/pages/HomePage.tsx';
import PersonPage from './components/pages/person/PersonPage.tsx';
import VehiclePage from './components/pages/vehicle/VehiclePage.tsx';

const App = () => {
    const { isAuthenticated, logout, tryRenewSession, userName } = useAuthContext();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const refresh = () => {
        setDialogOpen(false);

        navigate("/page/home");
    };

    useEffect(() => {
        tryRenewSession(refresh);
    }, []);

    return (
        <div className='h-100 overflow-hidden'>
            <nav
                className='navbar navbar-expand-sm bg-warning-subtle w-100'
                style={{ height: "4%" }}
            >
                <div className='container-fluid'>
                    <div className='row w-100'>
                        <div className='col-4 d-flex align-items-center'>
                            <button
                                className='btn btn-sm'
                                type='button'
                                onClick={() => navigate("/page/home")}
                            >
                                <img
                                    style={{
                                        height: "2rem",
                                        width: "2rem"
                                    }}
                                    className='rounded-5'
                                    src={CrashedVehicleLogo}
                                />

                                <strong>&nbsp; Crevah</strong>
                            </button>
                        </div>

                        <div className='col-4 d-flex justify-content-center align-items-center'>
                            <ul className='navbar-nav'>
                                {isAuthenticated() && (
                                    <>
                                        <li key={"/page/crashes"} className='nav-item'>
                                            <NavLink className='nav-link' to={"/page/crashes"}>
                                                Crashes
                                            </NavLink>
                                        </li>

                                        <li key={"/page/vehicles"} className='nav-item'>
                                            <NavLink className='nav-link' to={"/page/vehicles"}>
                                                Vehicles
                                            </NavLink>
                                        </li>

                                        <li key={"/page/people"} className='nav-item'>
                                            <NavLink className='nav-link' to={"/page/people"}>
                                                People
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className='col-4 d-flex justify-content-end align-items-center'>
                            {(isAuthenticated() && (
                                <>
                                    <div className='d-flex align-items-center h-100 fw-bold'>
                                        {userName}

                                        <Person />
                                    </div>

                                    <button
                                        className='btn btn-sm btn-outline-danger fw-bold h-75 m-1'
                                        onClick={() => logout(refresh)}
                                    >
                                        Logout 🔒
                                    </button>
                                </>
                            )) || (
                                <>
                                    <button
                                        className='btn btn-sm btn-outline-dark fw-bold h-75'
                                        onClick={() => setDialogOpen(true)}
                                    >
                                        Login / Register 🔓
                                    </button>

                                    <DialogAkaModule
                                        children={<LoginRegisterWrapperForm onSuccess={refresh} />}
                                        closeCallback={() => setDialogOpen(false)}
                                        isOpen={() => isDialogOpen}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main
                style={{
                    height: "96%",
                    maxHeight: "96%"
                }}
            >
                <Routes>
                    <Route path={"/page/home/*"} element={<HomePage />} caseSensitive={false} />

                    {(isAuthenticated() && (
                        <>
                            <Route
                                path={"/page/crashes/*"}
                                element={<CrashPage />}
                                caseSensitive={false}
                            />

                            <Route
                                path={"/page/vehicles/*"}
                                element={<VehiclePage />}
                                caseSensitive={false}
                            />

                            <Route
                                path={"/page/people/*"}
                                element={<PersonPage />}
                                caseSensitive={false}
                            />
                        </>
                    )) || (
                        <Route
                            path='/page/register/*'
                            element={
                                <Routes>
                                    <Route
                                        path='email-confirmed'
                                        element={<EmailConfirmed />}
                                        caseSensitive={false}
                                    />

                                    <Route
                                        path='email-unconfirmed'
                                        element={<EmailUnconfirmed />}
                                        caseSensitive={false}
                                    />
                                </Routes>
                            }
                        />
                    )}

                    <Route
                        path={"/*"}
                        element={<Navigate to={"/page/home"} replace={true} />}
                        caseSensitive={false}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;
