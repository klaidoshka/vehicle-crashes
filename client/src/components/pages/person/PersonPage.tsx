import FormLayout from "../../forms/FormLayout.tsx";
import PersonListForm from "./PersonListForm.tsx";
import PersonManageForm from "./PersonManageForm.tsx";

const PersonPage = () => {
  return (
      <div className="d-flex container-fluid h-100 justify-content-center align-items-center">
        <FormLayout
            title="🙋 People 🚶"
            description="Here you can create, list, edit and delete people data"
            formList={<PersonListForm/>}
            formManage={<PersonManageForm isEdit={false}/>}
        />
      </div>
  );
}

export default PersonPage;