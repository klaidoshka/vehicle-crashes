const backendApiEndpoint: string = "http://127.0.0.1:8080/api";

// ------------------------------------------------------------

interface Endpoints {
    create: string;
    delete: string;
    get: string;
    getById: string;
    update: string;
}

interface EndpointsModifiable extends Endpoints {
    getModifiableById: string;
    getModifiable: string;
}

// ------------------------------------------------------------

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

const endpointsCrashes: Endpoints = {
    create: `${backendApiEndpoint}/crashes`,
    delete: `${backendApiEndpoint}/crashes/:id`,
    get: `${backendApiEndpoint}/crashes`,
    getById: `${backendApiEndpoint}/crashes/:id`,
    update: `${backendApiEndpoint}/crashes/:id`
};

// ------------------------------------------------------------

export { backendApiEndpoint };
export const VehicleEndpoints = endpointsVehicle;
export const PersonEndpoints = endpointsPeople;
export const CrashEndpoints = endpointsCrashes;
