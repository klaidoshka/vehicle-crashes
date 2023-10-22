import FormList from "../../../components/form/FormList.tsx";
import ICrash, {dummyCrashes} from "../../../entities/ICrash.ts";
import {TableColumn} from "react-data-table-component";
import ICasualty from "../../../entities/ICasualty.ts";
import {VehicleType} from "../../../constants/VehicleType.ts";

export default function CrashListForm() {
  return (
      <FormList
          title={"View, edit, delete..."}
          columns={columnsCrash}
          rows={dummyCrashes}
          onDelete={(row) => console.log(row)}
          onEdit={(row) => console.log(row)}
          onExpand={(row) => {
            return <FormList
                title={"#" + row.id + " Crash Casualties"}
                columns={columnsCasualties}
                rows={row.casualties}
                onDelete={(row) => console.log(row)}
                onEdit={(row) => console.log(row)}
            />
          }}
      />
  );
}

const columnsCasualties: TableColumn<ICasualty>[] = [
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
    selector: row => row.vehicleOwner?.name ?? "N/A",
    sortable: true,
    width: '160px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.vehicle.plate,
    sortable: true,
    width: '150px'
  },
  {
    id: 'type',
    name: 'Type',
    selector: row => row.vehicle.type,
    sortable: true,
    width: '150px',
    // @ts-ignore
    format: row => VehicleType[row.vehicle.type] || "N/A"
  },
  {
    id: 'dateManufacture',
    name: 'Date Manufacture',
    selector: row => row.vehicle.dateManufacture,
    sortable: true,
    width: '150px'
  },
  {
    id: 'color',
    name: 'Color',
    selector: row => row.vehicle.color,
    sortable: true,
    width: '150px'
  }
];

const columnsCrash: TableColumn<ICrash>[] = [
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