import {Gender} from "../constants/Gender.ts";
import Vehicle from "./Vehicle.ts";
import Crash from "./Crash.ts";

interface IPerson {
  id: number;
  crashes: Crash[];
  dateBirth: string;
  gender: Gender;
  name: string;
  vehiclesOwned: Vehicle[];
}

class Person implements IPerson {

  public crashes: Crash[];
  public dateBirth: string;
  public gender: Gender;
  public id: number;
  public name: string;
  public vehiclesOwned: Vehicle[];

  public constructor(properties: IPerson) {
    this.vehiclesOwned = properties.vehiclesOwned;
    this.crashes = properties.crashes;
    this.dateBirth = properties.dateBirth;
    this.gender = properties.gender;
    this.id = properties.id;
    this.name = properties.name;
  }
}

export default Person;