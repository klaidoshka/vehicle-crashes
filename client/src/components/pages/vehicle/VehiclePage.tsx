import FormLayout from "../../form/FormLayout.tsx";
import VehicleManageForm from "./VehicleManageForm.tsx";
import VehicleListForm from "./VehicleListForm.tsx";

const VehiclePage = () => {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="Vehicles"
            description="You can list, create, edit, delete vehicles within this page"
            formList={<VehicleListForm/>}
            formManage={<VehicleManageForm/>}
        />
      </div>
  );
}

export default VehiclePage;