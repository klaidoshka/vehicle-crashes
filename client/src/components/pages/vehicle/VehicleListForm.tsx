import FormList from "../../forms/FormList.tsx";
import VehicleViewModifiable from "../../../dto/VehicleViewModifiable.ts";
import {useEffect, useState} from "react";
import {
  deleteVehicle,
  getVehicleModifiable,
  getVehicles
} from "../../../services/VehicleService.ts";
import VehicleManageForm from "./VehicleManageForm.tsx";
import {TableColumn} from "react-data-table-component";
import {VehicleType} from "../../../constants/VehicleType.ts";

const VehicleListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<VehicleViewModifiable[]>([]);


  useEffect(() => {
    setLoading(true);

    getVehicles({}).then(vehicles => {
      setRows(vehicles);

      setLoading(false);
    });
  }, []);

  return (
      (
          !isLoading &&
          <FormList
              title={"View, edit, delete..."}
              columns={columns}
              rows={rows}
              resolveDeleteModule={row => ({
                description: 'This action is irreversible. Associated data will be deleted too.',
                handleDelete: () => {
                  deleteVehicle({id: row.id!}).then(() => {
                    setRows(rows.filter(r => r.id !== row.id));
                  })
                },
                title: 'Are you sure you want to delete this entity?'
              })}
              resolveEditModule={row => {
                return ({
                  content: (callback: (element: VehicleViewModifiable) => void) =>
                      <VehicleManageForm
                          callback={callback}
                          element={row}
                          isEdit={true}
                      />,
                  handleEdit: () => {
                    getVehicleModifiable({id: row.id!}).then(v => {
                      if (v !== undefined) {
                        setRows(rows.map(r => {
                          if (r.id === v.id) {
                            return v;
                          }

                          return r;
                        }));
                      }
                    });
                  }
                })
              }}
          />
      ) ||
      <p className="text-center text-black-50">
        Loading entries...
      </p>
  )
}

const columns: TableColumn<VehicleViewModifiable>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.id!,
    sortable: true,
    width: '80px'
  },
  {
    id: 'type',
    format: (row) => isNaN(row.type!)
        ? row.type : VehicleType[row.type!],
    name: 'Type',
    selector: row => row.type!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'color',
    name: 'Color',
    selector: row => row.color!,
    sortable: true,
    width: '100px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.plate!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'dateManufacture',
    format: (row) => {
      return new Date(row.dateManufacture).toISOString().split('T')[0];
    },
    name: 'Date Manufacture',
    selector: row => row.dateManufacture!,
    sortable: true,
    width: '150px'
  }
];

export default VehicleListForm;