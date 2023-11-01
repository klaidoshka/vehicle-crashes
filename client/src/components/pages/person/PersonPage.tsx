import FormLayout from "../../forms/FormLayout.tsx";
import PersonListForm from "./PersonListForm.tsx";
import PersonManageForm from "./PersonManageForm.tsx";

const PersonPage = () => {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="People"
            description="You can list, create, edit, delete people within this page"
            formList={<PersonListForm/>}
            formManage={<PersonManageForm/>}
        />
      </div>
  );
}

export default PersonPage;