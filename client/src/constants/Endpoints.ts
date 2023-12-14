const backendApiEndpoint: string = "http://127.0.0.1:8080/api";

// ------------------------------------------------------------

type Endpoints = {
    create: string;
    delete: string;
    get: string;
    getById: string;
    update: string;
};

type EndpointsModifiable = Endpoints & {
    getModifiableById: string;
    getModifiable: string;
};

type EndpointsWithExcel = Endpoints & {
    downloadTemplate: string;
    import: string;
};

type EndpointsAuth = {
    confirmEmail: string;
    login: string;
    profile: string;
    register: string;
};

// ------------------------------------------------------------

const endpointsAuth: EndpointsAuth = {
    confirmEmail: `${backendApiEndpoint}/auth/confirm-email`,
    login: `${backendApiEndpoint}/auth/login`,
    profile: `${backendApiEndpoint}/auth/profile`,
    register: `${backendApiEndpoint}/auth/register`
};

const endpointsVehicle: EndpointsModifiable = {
    create: `${backendApiEndpoint}/vehicles`,
    delete: `${backendApiEndpoint}/vehicles/:id`,
    get: `${backendApiEndpoint}/vehicles`,
    getById: `${backendApiEndpoint}/vehicles/:id`,
    getModifiable: `${backendApiEndpoint}/vehicles/modifiable`,
    getModifiableById: `${backendApiEndpoint}/vehicles/:id/modifiable`,
    update: `${backendApiEndpoint}/vehicles/:id`
};

const endpointsPeople: EndpointsModifiable = {
    create: `${backendApiEndpoint}/people`,
    delete: `${backendApiEndpoint}/people/:id`,
    get: `${backendApiEndpoint}/people`,
    getById: `${backendApiEndpoint}/people/:id`,
    getModifiable: `${backendApiEndpoint}/people/modifiable`,
    getModifiableById: `${backendApiEndpoint}/people/:id/modifiable`,
    update: `${backendApiEndpoint}/people/:id`
};

const endpointsCrashes: EndpointsWithExcel = {
    create: `${backendApiEndpoint}/crashes`,
    delete: `${backendApiEndpoint}/crashes/:id`,
    downloadTemplate: `${backendApiEndpoint}/crashes/download-template`,
    get: `${backendApiEndpoint}/crashes`,
    getById: `${backendApiEndpoint}/crashes/:id`,
    import: `${backendApiEndpoint}/crashes/import`,
    update: `${backendApiEndpoint}/crashes/:id`
};

// ------------------------------------------------------------

export { backendApiEndpoint };
export const AuthEndpoints = endpointsAuth;
export const VehicleEndpoints = endpointsVehicle;
export const PersonEndpoints = endpointsPeople;
export const CrashEndpoints = endpointsCrashes;
