import FormList from "../../form/FormList.tsx";
import Vehicle from "../../../entities/Vehicle.ts";
import {TableColumn} from "react-data-table-component";
import {VehicleType} from "../../../constants/VehicleType.ts";
import {useEffect, useState} from "react";
import {callApi} from "../../../api/RestApi.ts";

const VehicleListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<Vehicle[]>([]);

  useEffect(() => {
    setLoading(true);

    callApi<Vehicle[]>("http://localhost:8080/api/vehicles")
      .then(data => {
        setRows(data.data ?? []);
      })
      .catch(error => {
        alert("Error: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
      (!isLoading &&
          <FormList
              title={"View, edit, delete..."}
              columns={columns}
              rows={rows}
              onDelete={(row) => console.log(row)}
              onEdit={(row) => console.log(row)}
          />) ||
      <p className="text-center text-black-50">
        Loading entries...
      </p>
  )
}

export default VehicleListForm;

const columns: TableColumn<Vehicle>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id!,
    sortable: true,
    width: '80px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.plate!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'type',
    name: 'Type',
    selector: row => row.type!,
    sortable: true,
    width: '150px',
    // @ts-ignore
    format: (row) => VehicleType[row.type] || "N/A"
  },
  {
    id: 'dateManufacture',
    name: 'Date Manufacture',
    selector: row => row.dateManufacture!,
    sortable: true,
    width: '150px'
  }
];