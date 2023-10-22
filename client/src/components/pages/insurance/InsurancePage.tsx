import FormLayout from "../../form/FormLayout.tsx";
import InsuranceManageForm from "./InsuranceManageForm.tsx";
import InsuranceListForm from "./InsuranceListForm.tsx";

const InsurancePage = () => {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="Insurances Of Vehicles"
            description="You can list, create, edit, delete vehicle insurances within this page"
            formList={<InsuranceListForm/>}
            formManage={<InsuranceManageForm/>}
        />
      </div>
  );
}

export default InsurancePage;