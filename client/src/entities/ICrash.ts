import ICasualty, {dummyCasualties} from "./ICasualty.ts";

export default interface ICrash {
  id: number;
  date: string;
  damageCost: number;
  casualties: ICasualty[]
}

export const dummyCrashes: ICrash[] = [
  {
    id: 1,
    date: '2003-12-01 13:15:17',
    damageCost: 0,
    casualties: [dummyCasualties[0], dummyCasualties[1]]
  },
  {
    id: 2,
    date: '2013-01-17 23:15:17',
    damageCost: 1,
    casualties: [dummyCasualties[0]]
  },
  {
    id: 3,
    date: '2013-02-25 23:15:17',
    damageCost: 0,
    casualties: [dummyCasualties[1], dummyCasualties[3]]
  },
  {
    id: 4,
    date: '1999-04-19 15:15:10',
    damageCost: 0,
    casualties: [dummyCasualties[0], dummyCasualties[1], dummyCasualties[4]]
  },
  {
    id: 5,
    date: '2011-01-18 23:15:17',
    damageCost: 10,
    casualties: [dummyCasualties[2]]
  }
];