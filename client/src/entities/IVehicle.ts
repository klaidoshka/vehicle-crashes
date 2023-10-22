import {VehicleType} from "../constants/VehicleType.ts";

export default interface IVehicle {
  id: number;
  dateManufacture: string;
  color: string;
  plate: string;
  type: VehicleType;
}

export const dummyVehicles: IVehicle[] = [
  {
    id: 1,
    dateManufacture: "2000-01-11",
    color: "Blue",
    plate: "ABC-123",
    type: VehicleType.CAR
  },
  {
    id: 2,
    dateManufacture: "1990-07-14",
    color: "White",
    plate: "DEF-456",
    type: VehicleType.CAR
  },
  {
    id: 3,
    dateManufacture: "2020-05-09",
    color: "Red",
    plate: "GHJ-789",
    type: VehicleType.CAR
  },
  {
    id: 4,
    dateManufacture: "2009-09-01",
    color: "Red",
    plate: "KLM-101",
    type: VehicleType.CAR
  },
  {
    id: 5,
    dateManufacture: "2021-11-01",
    color: "Black",
    plate: "NOP-112",
    type: VehicleType.VAN
  }
];