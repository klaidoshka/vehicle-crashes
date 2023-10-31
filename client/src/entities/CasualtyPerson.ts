import Person from "./Person.ts";
import Crash from "./Crash.ts";

interface CasualtyPerson {
  id?: number;
  crash: Crash;
  person: Person;
}

export default CasualtyPerson;