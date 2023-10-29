import {VehicleType} from "../constants/VehicleType.ts";
import Insurance from "./Insurance.ts";
import Crash from "./Crash.ts";
import VehicleOwner from "./VehicleOwner.ts";

interface IVehicle {
  id?: number;
  color: string;
  crashes: Crash[];
  dateManufacture: string;
  insurances: Insurance[];
  owners: VehicleOwner[];
  plate: string;
  type?: VehicleType;
}

class Vehicle implements IVehicle {

  public color: string;
  public crashes: Crash[];
  public dateManufacture: string;
  public id?: number;
  public insurances: Insurance[];
  public owners: VehicleOwner[];
  public plate: string;
  public type?: VehicleType;

  public constructor(properties: IVehicle) {
    this.color = properties.color;
    this.crashes = properties.crashes;
    this.dateManufacture = properties.dateManufacture;
    this.id = properties.id;
    this.insurances = properties.insurances;
    this.owners = properties.owners;
    this.plate = properties.plate;
    this.type = properties.type;
  }
}

export default Vehicle;