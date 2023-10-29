import Person from "./Person.ts";
import Crash from "./Crash.ts";

interface ICasualtyPerson {
  id: number;
  crash: Crash;
  person: Person;
}

class CasualtyPerson implements ICasualtyPerson {

  public crash: Crash;
  public id: number;
  public person: Person;

  public constructor(properties: ICasualtyPerson) {
    this.id = properties.id;
    this.crash = properties.crash;
    this.person = properties.person;
  }
}

export default CasualtyPerson;