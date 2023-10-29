import Vehicle from "./Vehicle.ts";

interface IInsurance {
  id: number;
  dateInitialization: string;
  dateExpiration: string;
  vehicle: Vehicle;
}

class Insurance implements IInsurance {

  public id: number;
  public dateInitialization: string;
  public dateExpiration: string;
  public vehicle: Vehicle;

  public constructor(properties: IInsurance) {
    this.id = properties.id;
    this.dateInitialization = properties.dateInitialization;
    this.dateExpiration = properties.dateExpiration;
    this.vehicle = properties.vehicle;
  }
}

export default Insurance;