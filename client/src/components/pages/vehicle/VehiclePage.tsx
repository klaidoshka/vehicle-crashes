import FormLayout from "../../form/FormLayout.tsx";
import VehicleListForm from "./VehicleListForm.tsx";
import VehicleManageForm from "./VehicleManageForm.tsx";

const VehiclePage = () => {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="🚲 Vehicles 🚘"
            description="Here you can create, list, edit and delete vehicles"
            formList={<VehicleListForm/>}
            formManage={<VehicleManageForm/>}
        />
      </div>
  );
}

export default VehiclePage;