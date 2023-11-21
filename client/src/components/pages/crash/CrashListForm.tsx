import { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import CrashView from '../../../dto/CrashView.ts';
import { deleteCrash, getCrash, getCrashes } from '../../../services/CrashService.ts';
import FormList from '../../forms/FormList.tsx';
import CrashManageForm from './CrashManageForm.tsx';

const CrashListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<CrashView[]>([]);

  useEffect(() => {
    setLoading(true);

    getCrashes({}).then(async (people) => {
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
            deleteCrash({ id: row.id! }).then(() => {
              setRows(rows.filter((r) => r.id !== row.id));
            });
          },
          title: "Are you sure you want to delete this entity?"
        })}
        resolveEditModule={(row) => {
          return {
            content: (callback: (element: CrashView) => void) => (
              <CrashManageForm callback={callback} element={row} isEdit={true} />
            ),
            handleEdit: () => {
              getCrash({ id: row.id! }).then((p) => {
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

const columns: TableColumn<CrashView>[] = [
  {
    id: "id",
    name: "#",
    selector: (row) => row.id ?? "N/A",
    sortable: true,
    width: "80px"
  },
  {
    id: "damageCost",
    name: "Damage Cost",
    selector: (row) => row.damageCost!,
    sortable: true,
    width: "100px"
  },
  {
    id: "date",
    name: "Date",
    selector: (row) => row.date!,
    sortable: true,
    width: "150px"
  }
];

export default CrashListForm;
