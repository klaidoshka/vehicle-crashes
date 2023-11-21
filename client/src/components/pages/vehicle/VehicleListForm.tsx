import { useEffect, useState } from 'react';

import { VehicleType } from '../../../constants/VehicleType.ts';
import VehicleViewModifiable from '../../../dto/VehicleViewModifiable.ts';
import {
    deleteVehicle, getVehicleModifiable, getVehiclesModifiable
} from '../../../services/VehicleService.ts';
import FormList from '../../forms/FormList.tsx';
import { VehicleColumns, VehicleOwnerColumnsPersonSided } from '../../forms/FormListColumns.ts';
import VehicleManageForm from './VehicleManageForm.tsx';

const VehicleListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<VehicleViewModifiable[]>([]);

  useEffect(() => {
    setLoading(true);

    getVehiclesModifiable({}).then((vehicles) => {
      setRows(vehicles);

      setLoading(false);
    });
  }, []);

  return (
    (!isLoading && (
      <FormList
        title={"View / Edit / Delete"}
        columns={VehicleColumns}
        rows={rows}
        resolveDeleteModule={(row) => ({
          description: "This action is irreversible. Associated data will be deleted too.",
          handleDelete: () => {
            deleteVehicle({ id: row.id! }).then(() => {
              setRows(rows.filter((r) => r.id !== row.id));
            });
          },
          title: "Are you sure you want to delete this entity?"
        })}
        resolveEditModule={(row) => {
          return {
            content: (callback: (element: VehicleViewModifiable) => void) => (
              <VehicleManageForm callback={callback} element={row} isEdit={true} />
            ),
            handleEdit: () => {
              getVehicleModifiable({ id: row.id! }).then((v) => {
                if (v !== undefined) {
                  setRows(
                    rows.map((r) => {
                      if (r.id === v.id) {
                        return v;
                      }

                      return r;
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
                title={`${VehicleType[row.type]} / ${row.plate} Owners`}
                columns={VehicleOwnerColumnsPersonSided}
                rows={row.owners}
              />
            </div>
          );
        }}
      />
    )) || <p className='text-center text-black-50'>Loading entries...</p>
  );
};

export default VehicleListForm;
