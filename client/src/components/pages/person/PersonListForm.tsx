import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import { Gender } from '../../../constants/Gender.ts';
import PersonViewModifiable from '../../../dto/PersonViewModifiable.ts';
import { deletePerson, getPeople, getPersonModifiable } from '../../../services/PersonService.ts';
import FormList from '../../forms/FormList.tsx';
import PersonManageForm from './PersonManageForm.tsx';

const PersonListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<PersonViewModifiable[]>([]);

  useEffect(() => {
    setLoading(true);

    getPeople({}).then(async (people) => {
      setRows(people);

      setLoading(false);
    });
  }, []);

  return (
    (!isLoading && (
      <FormList
        title={"View, edit, delete..."}
        columns={columns}
        rows={rows}
        resolveDeleteModule={(row) => ({
          description: "This action is irreversible. Associated data will be deleted too.",
          handleDelete: () => {
            deletePerson({ id: row.id! }).then(() => {
              setRows(rows.filter((r) => r.id !== row.id));
            });
          },
          title: "Are you sure you want to delete this entity?"
        })}
        resolveEditModule={(row) => {
          return {
            content: (callback: (element: PersonViewModifiable) => void) => (
              <PersonManageForm callback={callback} element={row} isEdit={true} />
            ),
            handleEdit: () => {
              getPersonModifiable({ id: row.id! }).then((p) => {
                if (p !== undefined) {
                  setRows(
                    rows.map((row) => {
                      if (row.id === p.id) {
                        return p;
                      }

                      return row;
                    })
                  );
                }
              });
            }
          };
        }}
      />
    )) || <p className='text-center text-black-50'>Loading entries...</p>
  );
};

export default PersonListForm;

const columns: TableColumn<PersonViewModifiable>[] = [
  {
    id: "id",
    name: "#",
    selector: (row) => row.id ?? "N/A",
    sortable: true,
    width: "80px"
  },
  {
    id: "name",
    name: "Name",
    selector: (row) => row.name!,
    sortable: true,
    width: "160px"
  },
  {
    id: "dateBirth",
    name: "Date Birth",
    selector: (row) => row.dateBirth!,
    sortable: true,
    width: "150px"
  },
  {
    id: "gender",
    name: "Gender",
    selector: (row) => row.gender!,
    sortable: true,
    width: "150px",
    format: (row) => (isNaN(row.gender!) ? row.gender : Gender[row.gender!])
  }
];

// const columnsExpanded: TableColumn<VehicleOwnerViewModifiable>[] = [
//   {
//     id: 'id',
//     name: '#',
//     selector: row => row.id!,
//     sortable: true,
//     width: '80px'
//   },
//   {
//     id: 'plate',
//     name: 'Plate',
//     selector: row => row.vehicle.plate!,
//     sortable: true,
//     width: '150px'
//   },
//   {
//     id: 'type',
//     format: (row) => isNaN(row.vehicle.type!)
//         ? row.vehicle.type : VehicleType[row.vehicle.type!],
//     name: 'Type',
//     selector: row => row.vehicle.type!,
//     sortable: true,
//     width: '150px',
//   },
//   {
//     id: 'vehicle.dateManufacture',
//     name: 'Manufacture Date',
//     selector: row => row.vehicle.dateManufacture!,
//     sortable: true,
//     width: '150px'
//   },
//   {
//     id: 'dateAcquisition',
//     name: 'Acquisition Date',
//     selector: row => row.dateAcquisition!,
//     sortable: true,
//     width: '150px'
//   },
//   {
//     id: 'dateDisposal',
//     name: 'Disposal Date',
//     selector: row => row.dateDisposal!,
//     sortable: true,
//     width: '150px'
//   }
// ];
