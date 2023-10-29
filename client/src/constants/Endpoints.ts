const urlServer: string = "http://127.0.0.1:8080/api/"

interface Endpoints {
  create: string;
  delete: string;
  get: string;
  getAll: string;
  update: string;
}

const endpointsVehicle: Endpoints = {
  create: `${urlServer}/vehicles`,
  delete: `${urlServer}/vehicles/:id`,
  get: `${urlServer}/vehicles/:id`,
  getAll: `${urlServer}/vehicles`,
  update: `${urlServer}/vehicles/:id`
}

const endpointsPeople: Endpoints = {
  create: `${urlServer}/people`,
  delete: `${urlServer}/people/:id`,
  get: `${urlServer}/people/:id`,
  getAll: `${urlServer}/people`,
  update: `${urlServer}/people/:id`
}

const endpointsCrashes: Endpoints = {
  create: `${urlServer}/crashes`,
  delete: `${urlServer}/crashes/:id`,
  get: `${urlServer}/crashes/:id`,
  getAll: `${urlServer}/crashes`,
  update: `${urlServer}/crashes/:id`
}

export const vehicles = endpointsVehicle;
export const people = endpointsPeople;
export const crashes = endpointsCrashes;