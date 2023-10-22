import FormList from "../../form/FormList.tsx";
import IPerson, {dummyPeople} from "../../../entities/IPerson.ts";
import {TableColumn} from "react-data-table-component";
import {Gender} from "../../../constants/Gender.ts";
import IVehicle from "../../../entities/IVehicle.ts";
import {VehicleType} from "../../../constants/VehicleType.ts";

const PersonListForm = () => {
  return (
      <FormList
          title={"View, edit, delete..."}
          columns={columnsPerson}
          rows={rows}
          onDelete={(row) => console.log(row)}
          onEdit={(row) => console.log(row)}
          onExpand={(row) => {
            return <FormList
                title={`#${row.id} ${row.name} - Owned Vehicles.`}
                columns={columnsVehicleOwned}
                rows={row.vehicles ?? []}
                onDelete={(row) => console.log(row)}
                onEdit={(row) => console.log(row)}
            />
          }}
      />
  )
}

export default PersonListForm;

const columnsPerson: TableColumn<IPerson>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id ?? "N/A",
    sortable: true,
    width: '80px'
  },
  {
    id: 'name',
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    width: '160px'
  },
  {
    id: 'dateBirth',
    name: 'Date Birth',
    selector: row => row.dateBirth,
    sortable: true,
    width: '150px'
  },
  {
    id: 'gender',
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
    width: '150px',
    // @ts-ignore
    format: row => Gender[row.gender] || "N/A"
  }
];

const columnsVehicleOwned: TableColumn<IVehicle>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id,
    sortable: true,
    width: '80px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.plate,
    sortable: true,
    width: '150px'
  },
  {
    id: 'type',
    name: 'Type',
    selector: row => row.type,
    sortable: true,
    width: '150px',
    // @ts-ignore
    format: (row) => VehicleType[row.type] || "N/A"
  },
  {
    id: 'dateManufacture',
    name: 'Date Manufacture',
    selector: row => row.dateManufacture,
    sortable: true,
    width: '150px'
  }
];

const rows: IPerson[] = dummyPeople;