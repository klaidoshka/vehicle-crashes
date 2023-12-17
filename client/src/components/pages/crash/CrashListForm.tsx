import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../api/AuthContext.ts';
import CrashView from '../../../dto/CrashView.ts';
import { deleteCrash, getCrash, getCrashes } from '../../../services/CrashService.ts';
import { resolveDateString } from '../../../services/Dates.ts';
import FormList from '../../forms/abstract/FormList.tsx';
import {
    CasualtiesPersonColumns, CasualtiesVehicleColumns, CrashColumns
} from '../../forms/abstract/FormListColumns.ts';
import CrashManageForm from './CrashManageForm.tsx';

const CrashListForm = () => {
    const { isAuthenticated } = useAuthContext();
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
                resolveDeleteModule={
                    isAuthenticated()
                        ? (row) => ({
                              description:
                                  "This action is irreversible. Associated data will be deleted too.",
                              handleDelete: () => {
                                  deleteCrash({ id: row.id! }).then(() => {
                                      setRows(rows.filter((r) => r.id !== row.id));
                                  });
                              },
                              title: "Are you sure you want to delete this entity?"
                          })
                        : undefined
                }
                resolveEditModule={
                    isAuthenticated()
                        ? (row) => {
                              return {
                                  content: (callback: (element: CrashView) => void) => (
                                      <CrashManageForm
                                          callback={callback}
                                          element={row}
                                          isEdit={true}
                                      />
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
                          }
                        : undefined
                }
                onExpand={(row) => (
                    <div className='mw-100 w-100 h-100'>
                        <h2 className='text-center bg-warning-subtle'>
                            Accident @ {resolveDateString(row.dateCrash)}
                        </h2>

                        <FormList
                            title={`People Casualties (${row.casualtiesPeople.length})`}
                            columns={CasualtiesPersonColumns}
                            rows={row.casualtiesPeople}
                        />

                        <FormList
                            title={`Vehicle Casualties (${row.casualtiesVehicle.length})`}
                            columns={CasualtiesVehicleColumns}
                            rows={row.casualtiesVehicle}
                        />
                    </div>
                )}
            />
        )) || <p className='text-center text-black-50'>Loading entries...</p>
    );
};

export default CrashListForm;
