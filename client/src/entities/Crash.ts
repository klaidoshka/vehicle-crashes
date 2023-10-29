import CasualtyPerson from "./CasualtyPerson.ts";
import CasualtyVehicle from "./CasualtyVehicle.ts";

interface ICrash {
  id: number;
  casualtiesPeople: CasualtyPerson[];
  casualtiesVehicle: CasualtyVehicle[];
  damageCost: number;
  date: string;
}

class Crash implements ICrash {

  public casualtiesPeople: CasualtyPerson[];
  public casualtiesVehicle: CasualtyVehicle[];
  public damageCost: number;
  public date: string;
  public id: number;

  public constructor(properties: ICrash) {
    this.casualtiesPeople = properties.casualtiesPeople;
    this.casualtiesVehicle = properties.casualtiesVehicle;
    this.damageCost = properties.damageCost;
    this.date = properties.date;
    this.id = properties.id;
  }
}

export default Crash;