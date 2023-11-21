const apiUrl: string = "http://127.0.0.1:8080/api";

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
  create: `${apiUrl}/vehicles`,
  delete: `${apiUrl}/vehicles/:id`,
  get: `${apiUrl}/vehicles`,
  getById: `${apiUrl}/vehicles/:id`,
  getModifiable: `${apiUrl}/vehicles/modifiable`,
  getModifiableById: `${apiUrl}/vehicles/:id/modifiable`,
  update: `${apiUrl}/vehicles/:id`
};

const endpointsPeople: EndpointsModifiable = {
  create: `${apiUrl}/people`,
  delete: `${apiUrl}/people/:id`,
  get: `${apiUrl}/people`,
  getById: `${apiUrl}/people/:id`,
  getModifiable: `${apiUrl}/people/modifiable`,
  getModifiableById: `${apiUrl}/people/:id/modifiable`,
  update: `${apiUrl}/people/:id`
};

const endpointsCrashes: Endpoints = {
  create: `${apiUrl}/crashes`,
  delete: `${apiUrl}/crashes/:id`,
  get: `${apiUrl}/crashes`,
  getById: `${apiUrl}/crashes/:id`,
  update: `${apiUrl}/crashes/:id`
};

// ------------------------------------------------------------

export const VehicleEndpoints = endpointsVehicle;
export const PersonEndpoints = endpointsPeople;
export const CrashEndpoints = endpointsCrashes;
