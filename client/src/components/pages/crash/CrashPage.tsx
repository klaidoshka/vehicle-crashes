import FormLayout from '../../forms/abstract/FormLayout.tsx';
import CrashListForm from './CrashListForm.tsx';
import CrashManageForm from './CrashManageForm.tsx';

export default function CrashPage() {
  return (
    <div className='d-flex container-fluid h-100 justify-content-center align-items-center'>
      <FormLayout
        title='💥 Vehicle Crashes 🩸'
        description='Here you can create, list, edit and delete crashes data'
        formList={<CrashListForm />}
        formManage={<CrashManageForm />}
      />
    </div>
  );
}
