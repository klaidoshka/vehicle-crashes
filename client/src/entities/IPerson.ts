import {Gender} from "../constants/Gender.ts";
import IVehicle, {dummyVehicles} from "./IVehicle.ts";

export default interface IPerson {
  id?: number;
  name: string;
  dateBirth: string;
  gender: Gender;
  vehicles?: IVehicle[];
}

export const dummyPeople: IPerson[] = [
  {
    id: 1,
    name: 'John Doe',
    dateBirth: '2003-01-11',
    gender: Gender.MALE,
    vehicles: [
      dummyVehicles[0]
    ]
  },
  {
    id: 2,
    name: 'Ray Mondella',
    dateBirth: '1956-06-12',
    gender: Gender.MALE,
    vehicles: [
      dummyVehicles[1]
    ]
  },
  {
    id: 3,
    name: 'Caroline Meow',
    dateBirth: '2013-09-11',
    gender: Gender.FEMALE,
    vehicles: [
      dummyVehicles[2]
    ]
  },
  {
    id: 4,
    name: 'Lucy Caterson',
    dateBirth: '2000-02-02',
    gender: Gender.FEMALE,
    vehicles: [
      dummyVehicles[3]
    ]
  },
  {
    id: 5,
    name: 'Jickey Picky',
    dateBirth: '2003-01-11',
    gender: Gender.OTHER,
    vehicles: [
      dummyVehicles[0],
      dummyVehicles[4]
    ]
  }
];