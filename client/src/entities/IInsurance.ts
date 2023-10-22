import IVehicle, {dummyVehicles} from "./IVehicle.ts";

export default interface IInsurance {
  id: number;
  dateInitialization: string;
  dateExpiration: string;
  vehicle: IVehicle;
}

export const dummyInsurances: IInsurance[] = [
  {
    id: 1,
    dateInitialization: "2021-01-11",
    dateExpiration: "2022-01-11",
    vehicle: dummyVehicles[0]
  },
  {
    id: 2,
    dateInitialization: "2023-05-23",
    dateExpiration: "2024-05-21",
    vehicle: dummyVehicles[1]
  },
  {
    id: 3,
    dateInitialization: "2021-01-11",
    dateExpiration: "2022-01-11",
    vehicle: dummyVehicles[2]
  },
  {
    id: 4,
    dateInitialization: "2019-03-11",
    dateExpiration: "2019-03-11",
    vehicle: dummyVehicles[3]
  },
  {
    id: 5,
    dateInitialization: "2001-01-11",
    dateExpiration: "2002-01-11",
    vehicle: dummyVehicles[4]
  }
];