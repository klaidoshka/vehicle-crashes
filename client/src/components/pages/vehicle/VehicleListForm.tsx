import FormList from "../../form/FormList.tsx";
import IVehicle, {dummyVehicles} from "../../../entities/IVehicle.ts";
import {TableColumn} from "react-data-table-component";
import {VehicleType} from "../../../constants/VehicleType.ts";

const VehicleListForm = () => {
  return (
      <FormList
          title={"View, edit, delete..."}
          columns={columns}
          rows={rows}
          onDelete={(row) => console.log(row)}
          onEdit={(row) => console.log(row)}
      />
  )
}

export default VehicleListForm;

const columns: TableColumn<IVehicle>[] = [
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

const rows: IVehicle[] = dummyVehicles;