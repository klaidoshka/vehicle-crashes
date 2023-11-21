import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import IManageFormProperties from '../../../api/IManageFormProperties.ts';
import CrashView, { CrashViewSchema } from '../../../dto/CrashView.ts';
import { mapSchemaToEntity } from '../../../services/CrashService.ts';

const CrashManageForm = ({ callback, element, isEdit }: IManageFormProperties<CrashView>) => {
  const [loadingElement, setLoadingElement] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<CrashViewSchema>({
    // defaultValues: {
    //   date: new Date(),
    //   damageCost: 0,
    //   peopleCasualties: [],
    //   vehicleCasualties: []
    // }
  });

  useEffect(() => {
    if (!element) {
      return;
    }

    setLoadingElement(true);

    const onFormLoad = async (): Promise<CrashViewSchema> => {
      return {
        ...element,
        date: new Date(element.date)
      };
    };

    onFormLoad().then((personSchema) => {
      reset(personSchema);

      setLoadingElement(false);
    });
  }, []);

  const onSubmit = (data: CrashViewSchema) => {
    if (!isDirty) {
      return;
    }

    const entity: CrashView = mapSchemaToEntity(data);

    if (isEdit) {
      callback?.(entity);

      reset();
    } else {
      callback?.(entity);

      reset();
    }

    console.log(entity);
  };

  console.log(errors);

  return (
    <div className='container'>
      <h4>Crash Management</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group mb-3'>
          <label>Date</label>

          <input
            className='form-control'
            type='datetime-local'
            placeholder='Date'
            {...register("date")}
          />
        </div>

        <div className='form-group mb-3'>
          <label>Damage Cost / €</label>

          <input
            className='form-control'
            type='number'
            placeholder='Damage Cost'
            {...register("damageCost")}
          />
        </div>

        <div className='form-group mb-3'>
          <label>People Casualties</label>

          <AsyncSelect cacheOptions defaultOptions loadOptions={() => new Promise(() => [])} />
        </div>

        <div className='form-group mb-3'>
          <label>Vehicle Casualties</label>

          <AsyncSelect cacheOptions defaultOptions loadOptions={() => new Promise(() => [])} />
        </div>

        <button className='btn btn-sm btn-success w-100' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CrashManageForm;
