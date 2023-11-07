import FormList from "../../forms/FormList.tsx";
import Person from "../../../entities/Person.ts";
import {TableColumn} from "react-data-table-component";
import {Gender} from "../../../constants/Gender.ts";
import {VehicleType} from "../../../constants/VehicleType.ts";
import {useEffect, useState} from "react";
import {IFormListRow} from "../../../api/IFormListRow.ts";
import {deletePerson, getPeople} from "../../../services/PersonService.ts";
import ModuleDialog from "../../forms/dialogs/ModuleDialog.tsx";
import DialogDelete from "../../forms/dialogs/DialogDelete.tsx";
import PersonManageForm from "./PersonManageForm.tsx";
import VehicleOwner from "../../../entities/VehicleOwner.ts";

const PersonListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<IFormListRow<Person>[]>([]);

  const handleRow = (entity: IFormListRow<Person>, handler: (entity: IFormListRow<Person>) => void) => {
    setRows(rows.map(r => {
      if (r.value.id !== entity.value.id) {
        return r;
      }

      handler(r);

      return r;
    }));
  };

  const handleInDelete = (entity: IFormListRow<Person>, value: boolean) => {
    handleRow(entity, r => r.inDelete = value);
  };

  const handleInEdit = (entity: IFormListRow<Person>, value: boolean) => {
    handleRow(entity, r => r.inEdit = value);
  };

  useEffect(() => {
    setLoading(true);

    getPeople({}).then(people => {
      setRows(people.map(entity => ({
        value: entity,
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
                              header={"Are you sure you want to delete this entity?"}
                              description={"This action is irreversible. Associated insurances and entity owners will be deleted too."}
                              handleClose={() => handleInDelete(row, false)}
                              handleDelete={() => deletePerson({
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
                          <PersonManageForm
                              callback={(entity) => handleRow(
                                  {value: entity, inDelete: false, inEdit: false},
                                  r => {
                                    r.value = entity;
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
              openDeleteDialog={entity => handleInDelete(entity, true)}
              openEditDialog={entity => handleInEdit(entity, true)}
              onExpand={row => (
                  <FormList
                      title={"Vehicles owned"}
                      columns={columnsExpanded}
                      rows={row.value.vehiclesOwned?.map(entity => ({
                        value: entity,
                        inDelete: false,
                        inEdit: false
                      })) ?? []}
                      // onDeleteModule={row => (
                      //     <ModuleDialog
                      //         content={(
                      //             <DialogDelete
                      //                 header={"Are you sure you want to delete this entity?"}
                      //                 description={"This action is irreversible. Associated insurances and entity owners will be deleted too."}
                      //                 handleClose={() => handleInDelete(row, false)}
                      //                 handleDelete={() => deletePerson({
                      //                   id: row.value.id!,
                      //                   onSuccess: () => {
                      //                     setRows(rows.filter(r => r.value.id !== row.value.id));
                      //                   }
                      //                 })}
                      //             />
                      //         )}
                      //         handleClose={() => handleInDelete(row, false)}
                      //         shouldOpen={() => row.inDelete}
                      //     />
                      // )}
                      // onEditModule={row => (
                      //     <ModuleDialog
                      //         content={(
                      //             <PersonManageForm
                      //                 callback={(entity) => handleRow(
                      //                     {value: entity, inDelete: false, inEdit: false},
                      //                     r => {
                      //                       r.value = entity;
                      //                       r.inEdit = false;
                      //                     })}
                      //                 element={row.value}
                      //                 isEdit={true}
                      //             />
                      //         )}
                      //         handleClose={() => handleInEdit(row, false)}
                      //         shouldOpen={() => row.inEdit}
                      //     />
                      // )}
                      // openDeleteDialog={entity => handleInDelete(entity, true)}
                      // openEditDialog={entity => handleInEdit(entity, true)}
                  />

              )}
          />
      ) ||
      <p className="text-center text-black-50">
        Loading entries...
      </p>
  )
}

export default PersonListForm;

const columns: TableColumn<IFormListRow<Person>>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.value.id ?? "N/A",
    sortable: true,
    width: '80px'
  },
  {
    id: 'name',
    name: 'Name',
    selector: row => row.value.name!,
    sortable: true,
    width: '160px'
  },
  {
    id: 'dateBirth',
    name: 'Date Birth',
    selector: row => row.value.dateBirth!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'gender',
    name: 'Gender',
    selector: row => row.value.gender!,
    sortable: true,
    width: '150px',
    format: row => isNaN(row.value.gender!) ? row.value.gender : Gender[row.value.gender!]
  }
];

const columnsExpanded: TableColumn<IFormListRow<VehicleOwner>>[] = [
  {
    id: 'id',
    name: '#',
    selector: row => row.value.id!,
    sortable: true,
    width: '80px'
  },
  {
    id: 'plate',
    name: 'Plate',
    selector: row => row.value.vehicle.plate!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'type',
    format: (row) => isNaN(row.value.vehicle.type!)
        ? row.value.vehicle.type : VehicleType[row.value.vehicle.type!],
    name: 'Type',
    selector: row => row.value.vehicle.type!,
    sortable: true,
    width: '150px',
  },
  {
    id: 'vehicle.dateManufacture',
    name: 'Manufacture Date',
    selector: row => row.value.vehicle.dateManufacture!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'dateAcquisition',
    name: 'Acquisition Date',
    selector: row => row.value.dateAcquisition!,
    sortable: true,
    width: '150px'
  },
  {
    id: 'dateDisposal',
    name: 'Disposal Date',
    selector: row => row.value.dateDisposal!,
    sortable: true,
    width: '150px'
  }
];