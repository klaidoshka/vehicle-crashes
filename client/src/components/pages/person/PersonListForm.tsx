import { useEffect, useState } from 'react';

import PersonViewModifiable from '../../../dto/PersonViewModifiable.ts';
import { deletePerson, getPeople, getPersonModifiable } from '../../../services/PersonService.ts';
import FormList from '../../forms/FormList.tsx';
import { PersonColumns, VehicleOwnerColumnsVehicleSided } from '../../forms/FormListColumns.ts';
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
        title={"View / Edit / Delete"}
        columns={PersonColumns}
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
        onExpand={(row) => {
          return (
            <div className='mw-100 w-100 h-100'>
              <FormList
                title={`${row.name} Owned Vehicles`}
                columns={VehicleOwnerColumnsVehicleSided}
                rows={row.vehiclesOwned}
              />
            </div>
          );
        }}
      />
    )) || <p className='text-center text-black-50'>Loading entries...</p>
  );
};

export default PersonListForm;
