import FormList from "../../forms/FormList.tsx";
import Vehicle from "../../../entities/Vehicle.ts";
import {TableColumn} from "react-data-table-component";
import {useEffect, useState} from "react";
import {deleteVehicle, getVehicles} from "../../../services/VehicleService.ts";
import {VehicleType} from "../../../constants/VehicleType.ts";
import DialogDelete from "../../forms/dialogs/DialogDelete.tsx";
import VehicleManageForm from "./VehicleManageForm.tsx";
import ModuleDialog from "../../forms/dialogs/ModuleDialog.tsx";
import {IFormListRow} from "../../../api/IFormListRow.ts";

const VehicleListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<IFormListRow<Vehicle>[]>([]);

  const handleRow = (vehicle: IFormListRow<Vehicle>, handler: (vehicle: IFormListRow<Vehicle>) => void) => {
    setRows(rows.map(r => {
      if (r.value.id !== vehicle.value.id) {
        return r;
      }

      handler(r);

      return r;
    }));
  };

  const handleInDelete = (vehicle: IFormListRow<Vehicle>, value: boolean) => {
    handleRow(vehicle, r => r.inDelete = value);
  };

  const handleInEdit = (vehicle: IFormListRow<Vehicle>, value: boolean) => {
    handleRow(vehicle, r => r.inEdit = value);
  };

  useEffect(() => {
    setLoading(true);

    getVehicles({}).then(vehicles => {
      setRows(vehicles.map(vehicle => ({
        value: vehicle,
        inDelete: false,
        inEdit: false
      })));

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
              onDeleteModule={row => (
                  <ModuleDialog
                      content={(
                          <DialogDelete
                              header={"Are you sure you want to delete this vehicle?"}
                              description={"This action is irreversible. Associated insurances and vehicle owners will be deleted too."}
                              handleClose={() => handleInDelete(row, false)}
                              handleDelete={() => deleteVehicle({
                                id: row.value.id!,
                                onSuccess: () => {
                                  setRows(rows.filter(r => r.value.id !== row.value.id));
                                }
                              })}
                          />
                      )}
                      handleClose={() => handleInDelete(row, false)}
                      shouldOpen={() => row.inDelete}
                  />
              )}
              onEditModule={row => (
                  <ModuleDialog
                      content={(
                          <VehicleManageForm
                              callback={(vehicle) => handleRow(
                                  {value: vehicle, inDelete: false, inEdit: false},
                                  r => {
                                    r.value = vehicle;
                                    r.inEdit = false;
                                  })}
                              element={row.value}
                              isEdit={true}
                          />
                      )}
                      handleClose={() => handleInEdit(row, false)}
                      shouldOpen={() => row.inEdit}
                  />
              )}
              openDeleteDialog={vehicle => handleInDelete(vehicle, true)}
              openEditDialog={vehicle => handleInEdit(vehicle, true)}
          />
      ) ||
      <p className="text-center text-black-50">
        Loading entries...
      </p>
  )
}

const columns: TableColumn<IFormListRow<Vehicle>>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.value.id!,
    sortable: true,
    width: '80px'
  },
  {
    id: 'type',
    format: (row) => isNaN(row.value.type!)
        ? row.value.type : VehicleType[row.value.type!],
    name: 'Type',
    selector: row => row.value.type!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'color',
    name: 'Color',
    selector: row => row.value.color!,
    sortable: true,
    width: '100px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.value.plate!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'dateManufacture',
    format: (row) => {
      return new Date(row.value.dateManufacture).toISOString().split('T')[0];
    },
    name: 'Date Manufacture',
    selector: row => row.value.dateManufacture!,
    sortable: true,
    width: '150px'
  }
];

export default VehicleListForm;