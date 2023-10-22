import IVehicle from "./IVehicle.ts";
import IPerson, {dummyPeople} from "./IPerson.ts";

export default interface ICasualty {
  id: number;
  people: IPerson[];
  vehicle: IVehicle;
  vehicleOwner?: IPerson;
}

export const dummyCasualties: ICasualty[] = [
  {
    id: 1,
    people: [
        dummyPeople[1],
        dummyPeople[2]
    ],
    vehicle: dummyPeople[0].vehicles![0],
    vehicleOwner: dummyPeople[0]
  },
  {
    id: 2,
    people: [
        dummyPeople[0],
        dummyPeople[2]
    ],
    vehicle: dummyPeople[1].vehicles![0],
    vehicleOwner: dummyPeople[1]
  },
  {
    id: 3,
    people: [
        dummyPeople[0],
        dummyPeople[1],
        dummyPeople[3],
        dummyPeople[4]
    ],
    vehicle: dummyPeople[2].vehicles![0],
    vehicleOwner: dummyPeople[2]
  },
  {
    id: 4,
    people: [
        dummyPeople[1],
        dummyPeople[2],
        dummyPeople[4]
    ],
    vehicle: dummyPeople[3].vehicles![0],
    vehicleOwner: dummyPeople[3]
  },
  {
    id: 5,
    people: [
        dummyPeople[2],
        dummyPeople[3]
    ],
    vehicle: dummyPeople[4].vehicles![0],
    vehicleOwner: dummyPeople[4]
  }
];