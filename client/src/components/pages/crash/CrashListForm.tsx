import { useEffect, useState } from 'react';

import CrashView from '../../../dto/CrashView.ts';
import { deleteCrash, getCrash, getCrashes } from '../../../services/CrashService.ts';
import FormList from '../../forms/FormList.tsx';
import { CrashColumns } from '../../forms/FormListColumns.ts';
import CrashManageForm from './CrashManageForm.tsx';

const CrashListForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<CrashView[]>([]);

  useEffect(() => {
    setLoading(true);

    getCrashes({}).then(async (crashes) => {
      setRows(crashes);

      setLoading(false);
    });
  }, []);

  return (
    (!isLoading && (
      <FormList
        title={"View / Edit / Delete"}
        columns={CrashColumns}
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


export default CrashListForm;
