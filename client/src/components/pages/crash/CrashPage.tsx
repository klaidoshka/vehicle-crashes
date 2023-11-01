import FormLayout from "../../forms/FormLayout.tsx";
import CrashManageForm from "./CrashManageForm.tsx";
import CrashListForm from "./CrashListForm.tsx";

export default function CrashPage() {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="Crashes Of Vehicles"
            description="You can list, create, edit, delete vehicle crashes within this page"
            formList={<CrashListForm/>}
            formManage={<CrashManageForm/>}
        />
      </div>
  );
}