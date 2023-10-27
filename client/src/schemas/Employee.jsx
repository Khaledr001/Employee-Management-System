import * as Yup from "yup";

const addEmployee = Yup.object({
  // image: Yup.mixed()
  //   .test(
  //     "FILE_SIZE",
  //     "Image size must be within 2 MB",
  //     (value) => value && value[0].size <= 2*1024*1024
  //   )
  //   .test(
  //     "FILE_FORMAT",
  //     "Product image must be in png, jpg or jpeg type",
  //     (value) =>
  //       value &&
  //       ["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(
  //         value[0].type
  //       )
  //   ),
  firstName: Yup.string()
    .min(3)
    .max(70)
    .required("Please enter employee first name"),
  lastName: Yup.string()
    .min(3)
    .max(70)
    .required("Please enter employee last name"),

  email: Yup.string()
    .email("Email formate is not valid")
    .required("Please enter employee email address"),

  salary: Yup.number("Please enter numeric value").positive("Salary must be a positive number"),
  phoneNumber: Yup.string()
    .min(10)
    .required("Please enter employee phone number"),
  position: Yup.string().min(3).required("Please enter employee position"),
  department: Yup.string().min(3).required("Please enter employee department"),
  dateOfBirth: Yup.date().required("Please enter employee Date of Birth"),
  joiningDate: Yup.date().required("Please enter employee Joining Date"),
  skills: Yup.array().required("Please provide employees skills"),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree is required"),
      university: Yup.string().required("University is required"),
      graduationYear: Yup.number()
        .required("Graduation Year is required")
        .positive("Graduation Year must be a positive number"),
    })
  )
  .required('Education field required'),
  address: Yup.string()
    .min(5)
    .max(500)
    .required("Please provide employee address"),
});

const employeeSchema = { addEmployee };
export default employeeSchema;
