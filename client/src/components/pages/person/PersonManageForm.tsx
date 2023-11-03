import Person from "../../../entities/Person.ts";
import IManageFormProperties from "../../../api/IManageFormProperties.ts";

const PersonManageForm = ({}: IManageFormProperties<Person>) => {
  return (
      <div className="container">
        <h4 className="text-center">Person Management</h4>

        <form
            className="overflow-scroll p-3"
            // onSubmit={handleSubmit(resolveSubmit)}
            style={{minWidth: 400, maxHeight: 600}}
        >
          <button
              // disabled={isSubmitting}
              className="mt-3 btn btn-sm btn-success w-100"
              type="submit"
          >
            Submit
          </button>
        </form>
      </div>
  );
}

export default PersonManageForm;