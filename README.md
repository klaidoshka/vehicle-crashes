## Vehicle Crashes Registry @ CraVeh

### PROJECT IDEA

The project is a simple **CRUD** application for managing vehicles, their owners, insurances, crashes
and accident's casualties _(people or vehicles)_ by creating and editing entities with primitive
forms.

The main idea behind this project was to improve my skills in...

- **React**
- **TypeScript**
- **Java Frameworks** (Spring Boot, Hibernate / JPA)

Additionally, I have tried out some libraries for data validation and form management...

- **zod** (TypeScript)
- **React Hook Form** (React)

The project is not intended to be used in production, but rather as a playground for learning. It
is not a complete solution, but rather a prototype. Since it is a prototype, it is not perfect and
has some bugs and issues because of the lack of experience in the mentioned technologies and badly
designed architecture.

---

### KNOWN FORMS BUGS

```yml
- Children object arrays (vehicle-owners, insurances, crashes) are tied to parent objects
- - This means that if children objects are created before parent ones, then their references will be out-dated
- - Possible fix: Remove references to parents from children objects

- Some fields in the forms are real-time updated and depend on input
- - This makes it hardly possible to smoothly input the data, since on each change the input refreshes
- - Possible fix: Make the fields update on blur or on submit

- Vehicle insurances are not ordered by expiration date up to the active (or latest expired) one
- - Fix: Order insurances by expiration date

- Two active insurances should not be assignable to the vehicle. Maximum one active insurance per vehicle
- - Fix: Add additional validation in the zod scheme
```

---

### TODOS

```yml
- Back-End validation should return aggregated messages, if errors were found
- - Currently: it returns only one message, displays in a alert
- - Possible change: return array of messages, display in a table within abstract modal

# ----------------------------------------------------- #

- Authentication and Authorization
- - Using: Spring Security

- Email Confirmation
- - Using: Spring Mail Service

- CSV Reader (for crashes page w/ children data)
- - Using: 3rd-Party Library
- - Changes Required: Add a template for the CSV file
```
