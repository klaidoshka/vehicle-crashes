import FormList from "../../form/FormList.tsx";
import IInsurance, {dummyInsurances} from "../../../entities/IInsurance.ts";
import {TableColumn} from "react-data-table-component";
import {VehicleType} from "../../../constants/VehicleType.ts";

const InsuranceListForm = () => {
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

export default InsuranceListForm;

const columns: TableColumn<IInsurance>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id,
    sortable: true,
    width: '80px'
  },
  {
    id: 'dateInitialization',
    name: 'Initialization Date',
    selector: row => row.dateInitialization,
    sortable: true,
    width: '160px'
  },
  {
    id: 'dateExpiration',
    name: 'Expiration Date',
    selector: row => row.dateExpiration,
    sortable: true,
    width: '150px'
  },
  {
    id: 'isExpired',
    name: 'Expired',
    selector: row => row.dateExpiration,
    sortable: true,
    width: '150px',
    format: row => new Date(row.dateExpiration) < new Date() ? "Yes" : "No"
  },
  {
    id: 'vehicleType',
    name: 'Vehicle Type',
    selector: row => row.vehicle.type,
    sortable: true,
    width: '150px',
    format: row => VehicleType[row.vehicle.type] || "N/A"
  },
  {
    id: 'vehiclePlate',
    name: 'Vehicle Plate',
    selector: row => row.vehicle.plate,
    sortable: true,
    width: '150px'
  },
  {
    id: 'vehicleColor',
    name: 'Vehicle Color',
    selector: row => row.vehicle.color,
    sortable: true,
    width: '150px'
  }
];

const rows: IInsurance[] = dummyInsurances;