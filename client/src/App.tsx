import { useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { useAuthContext } from './api/AuthContext.ts';
import CrashedVehicleLogo from './assets/image/logo.png';
import DialogAkaModule from './components/forms/dialogs/DialogAkaModule.tsx';
import LoginRegisterWrapperForm from './components/forms/LoginRegisterWrapperForm.tsx';
import CrashPage from './components/pages/crash/CrashPage.tsx';
import HomePage from './components/pages/HomePage.tsx';
import PersonPage from './components/pages/person/PersonPage.tsx';
import VehiclePage from './components/pages/vehicle/VehiclePage.tsx';

const App = () => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

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
                                <button className='btn btn-sm fw-bold h-100' onClick={() => {}}>
                                    Logout 🔒
                                </button>
                            )) || (
                                <>
                                    <button
                                        className='btn btn-sm fw-bold h-100'
                                        onClick={() => setDialogOpen(true)}
                                    >
                                        Login / Register 🔓
                                    </button>

                                    <DialogAkaModule
                                        children={<LoginRegisterWrapperForm />}
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

                    {isAuthenticated() && (
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
