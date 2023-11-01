import FormList from "../../forms/FormList.tsx";
import Crash from "../../../entities/Crash.ts";
import {TableColumn} from "react-data-table-component";
import CasualtyPerson from "../../../entities/CasualtyPerson.ts";

export default function CrashListForm() {
  return (
      <FormList
          title={"View, edit, delete..."}
          columns={columnsCrash}
          rows={[]}
          onDelete={(row) => console.log(row)}
          onEdit={(row) => console.log(row)}
          onExpand={(row) => {
            return <FormList
                title={"#" + row.id + " Crash Casualties (People)"}
                columns={columnsCasualties}
                rows={row.casualtiesPeople}
                onDelete={(row) => console.log(row)}
                onEdit={(row) => console.log(row)}
            />
          }}
      />
  );
}

const columnsCasualties: TableColumn<CasualtyPerson>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id,
    sortable: true,
    width: '80px'
  },
  {
    id: 'name',
    name: 'Name',
    selector: row => row.person?.name ?? "N/A",
    sortable: true,
    width: '160px'
  }
];

const columnsCrash: TableColumn<Crash>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id,
    sortable: true,
    width: '80px'
  },
  {
    id: 'date',
    name: 'Date',
    selector: row => row.date,
    sortable: true,
    width: '160px'
  },
  {
    id: 'damage',
    name: 'Damage',
    selector: row => row.damageCost,
    sortable: true,
    width: '150px',
    format: (row) => {
      return row.damageCost + ' €';
    }
  }
];