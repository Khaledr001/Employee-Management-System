import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
// import {Loading} from '../../components/loading'
import { useAddEmployee } from "../../hooks/useEmployee";
import { CircularProgress } from "@mui/material";
import employeeSchema from "../../schemas/Employee";
import { yupResolver } from "@hookform/resolvers/yup";

const AddProduct = () => {
  const employeeResponse = useAddEmployee();
  const [imgPreview, setImgPreview] = useState(null);

  const initialValues = {
    image: null,
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    phoneNumber: "",
    address: "",
    department: "",
    dateOfBirth: "",
    joiningDate: "",
    salary: null,
    skills: [""],
    education: [
      {
        degree: "",
        university: "",
        graduationYear: null,
      },
    ],
  };

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(employeeSchema.addEmployee),
  });
  const {
    register,
    handleSubmit,
    // watch,
    control,
    formState: { errors },
  } = form;

  // console.log(watch("image"));

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    name: "skills",
    control,
  });
  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    name: "education",
    control,
  });


  const convertToISO = (value) => {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      const isoFormat = date.toISOString();
      return isoFormat;
    }
    else return null;
    
  } 

  const onSubmit = async (data) => {
    console.log(data);
    let jDate = convertToISO(data.joiningDate);
    let dob = convertToISO(data.dateOfBirth);
    
    const formData = new FormData();
    if (data.image) formData.append("image", data.image[0]);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    formData.append("dateOfBirth", dob);
    formData.append("position", data.position);
    formData.append("department", data.department);
    formData.append("joiningDate", jDate);
    formData.append("salary", data.salary);

    data.skills.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });
    data.education.forEach((edu, index) => {
      formData.append(`education[${index}][degree]`, edu.degree);
      formData.append(`education[${index}][university]`, edu.university);
      formData.append(
        `education[${index}][graduationYear]`,
        edu.graduationYear
      );
    });

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    await employeeResponse.mutate(formData);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  const handleClick = () => {
    document.getElementById("imagefield").click();
  };

  if (employeeResponse.isLoading) {
    // <Loading />
    <CircularProgress />;
  }

  if (employeeResponse.isSuccess) {
    window.location.reload();
    // window.alert("You product was successfully added");
  }

  return (
    <>
      <div className="">
        <div className="px-5 w-full h-20 bg-base-200 flex justify-between items-center rounded-md">
          <h1 className="text-4xl font-bold ">Employee Editor</h1>
          <Link to="/all-employees" className="btn btn-info">
            all employees
          </Link>
        </div>

        <div className="w-full bg-base-200 flex mt-5 py-8 px-5 rounded-md">
          <div className="w-full">
            {/* <ImageUpload /> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-10">
              <div>
                <div className=" rounded-md flex flex-col justify-center items-center avatar">
                  <div
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                    className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 h-full flex justify-center items-center">
                    {imgPreview && (
                      <img
                        src={imgPreview}
                        alt="upload image"
                        className="w-full"
                      />
                    )}
                    <input
                      id="imagefield"
                      type="file"
                      accept="image/*"
                      hidden
                      {...register("image", { onChange: handleImgChange })}
                    />
                  </div>
                  <label htmlFor="image" className="cursor-pointer mt-1">
                    {imgPreview ? null : "Choose an image"}
                  </label>
                  <p className="text-error text-sm ms-2 mt-1">
                    {errors.image?.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-10 md:flex-row  lg:flex-row justify-center items-start">
                <div className="w-full">
                  <h1 className="text-xl text-info mb-5">
                    Employee Information
                  </h1>
                  <div className="flex flex-col  md:flex-row justify-start gap-3 md:gap-8">
                    <div className="flex flex-col gap-1 md:w-[50%]">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="firstName"
                        {...register("firstName", {
                          required: {
                            value: true,
                            message: "First Name required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.firstName?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 md:w-[50%]">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="lastName"
                        {...register("lastName", {
                          required: {
                            value: true,
                            message: "Last Name required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.lastName?.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-start gap-3 md:gap-8 mt-3 md:mt-5">
                    <div className="flex flex-col gap-1 md:w-[50%]">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "First Name required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.email?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 md:w-[50%]">
                      <label htmlFor="phoneNumber">Phone Number *</label>
                      <input
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="phoneNumber"
                        {...register("phoneNumber", {
                          required: {
                            value: true,
                            message: "Phone Number required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.phoneNumber?.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-start gap-3 md:gap-8 md:mt-2">
                    <div className="flex flex-col gap-1 md:w-[50%] mt-5">
                      <label htmlFor="position">Position *</label>
                      <input
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="position"
                        {...register("position", {
                          required: {
                            value: true,
                            message: "Phone Number required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.position?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 md:w-[50%] md:mt-5">
                      <label htmlFor="department">Department *</label>
                      <input
                        type="text"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="department"
                        {...register("department", {
                          required: {
                            value: true,
                            message: "Phone Number required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.department?.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-start gap-3 md:gap-8 md:mt-2">
                    <div className="flex flex-col gap-1 md:w-[50%] mt-5">
                      <label htmlFor="dateOfBirth">Date Of Birth *</label>
                      <input
                        type="Date"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="dateOfBirth"
                        {...register("dateOfBirth", {
                          required: {
                            value: true,
                            message: "Phone Number required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.dateOfBirth?.message}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 md:w-[50%] md:mt-5">
                      <label htmlFor="joiningDate">Joining Date *</label>
                      <input
                        type="date"
                        className="input input-info focus:outline-none text-lg focus:border-2"
                        name="joiningDate"
                        {...register("joiningDate",
                          
                          {
                          required: {
                            value: true,
                            message: "Joining Date required",
                          },
                        })}
                      />
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.joiningDate?.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 md:w-[49%] md:mt-5">
                    <label htmlFor="salary">Salary *</label>
                    <input
                      type="number"
                      className="input input-info focus:outline-none text-lg focus:border-2"
                      name="salary"
                      {...register("salary", {
                        valueAsNumber: true,
                        required: {
                          value: true,
                          message: "Salary required",
                        },
                      })}
                    />
                    <p className="text-error text-sm ms-2 mt-1">
                      {errors.salary?.message}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="address">Address *</label>
                      <textarea
                        rows={2}
                        name="address"
                        className="textarea input-info focus:outline-none text-lg focus:border-2"
                        placeholder=""
                        {...register("address", {
                          required: {
                            value: true,
                            message: "Phone Number required",
                          },
                        })}></textarea>
                      <p className="text-error text-sm ms-2 mt-1">
                        {errors.address?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-10">
                <div className="flex flex-col gap-1 md:w-[49%] md:mt-5">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="skills">Skills *</label>
                    {skillFields.map((field, index) => {
                      return (
                        <div
                          className="mt-1 flex gap-3 items-center"
                          key={field.id}>
                          <input
                            name="skills"
                            className="input input-info focus:outline-none text-lg focus:border-2"
                            {...register(`skills.${index}`)}></input>

                          {index >= 0 && (
                            <button
                              className="btn btn-sm max-w-[150px] btn-warning"
                              onClick={() => skillRemove(index)}>
                              remove
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <p className="text-error text-sm ms-2 mt-1">
                      {errors.skills?.message}
                    </p>
                    <span
                      onClick={() => skillAppend("")}
                      className="btn btn-sm btn-info mt-2">
                      Add Skills
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:w-[49%] mt-5 md:mt-0 ">
                  <p className="text-xl">Degree</p>
                  <div className="flex flex-col gap-1">
                    {educationFields.map((field, index) => {
                      return (
                        <div
                          className="mt-1 flex flex-col gap-4"
                          key={field.id}>
                          <div className="flex flex-col gap-1 w-full mt-2">
                            <label htmlFor="skills">Degree Name *</label>
                            {}
                            <input
                              name="education"
                              {...register(`education.${index}.degree`)}
                              className="input input-info focus:outline-none text-lg focus:border-2"
                              placeholder=""></input>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="skills">University Name *</label>
                            <input
                              name="education"
                              {...register(`education.${index}.university`)}
                              className="input input-info focus:outline-none text-lg focus:border-2"
                              placeholder=""></input>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="skills">Graduation Year *</label>
                            <input
                              name="education"
                              {...register(`education.${index}.graduationYear`)}
                              className="input input-info focus:outline-none text-lg focus:border-2"
                              placeholder=""></input>
                          </div>
                          {index >= 0 && (
                            <button
                              className="btn btn-sm btn-warning max-w-[100px] self-center"
                              onClick={() => educationRemove(index)}>
                              remove
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Display validation errors */}
                  {errors.education && (
                    <div>
                      {errors.education?.map((error, index) => (
                        <p key={index} className="text-error text-sm ms-2 mt-1">
                          {error?.message}
                        </p>
                      ))}
                    </div>
                  )}

                  <span
                    onClick={() => educationAppend()}
                    className="btn btn-sm btn-info mt-2">
                    Add Degree
                  </span>
                </div>
              </div>

              <div className="self-center me-3 mt-5">
                <button
                  className="btn btn-lg rounded-lg btn-info"
                  type="submit">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// import { DevTool } from "@hookform/devtools";
// import * as yup from "yup";

// const schema = yup
//   .object({
//     firstName: yup.string().required(),
//     age: yup.number().positive().integer().required(),
//   })
//   .required();

// const AddProduct = () => {
//   const form = useForm({
//     defaultValues: {
//       example: "example",
//       social: {
//         twitter: "",
//         facebook: "",
//       },
//       dob: new Date(),
//       phoneNumbers: ["", ""],
//       phNumbers: [{ number: "" }],
//     },
//     resolver: yupResolver(schema),
//   });
//   const {
//     register,
//     handleSubmit,
//     // watch,
//     control,
//     formState: { errors },
//   } = form;

//   // const { errors } = formState();

//   const onSubmit = (data) => console.log(data);
//   const { fields, append, remove } = useFieldArray({
//     name: "phNumbers",
//     control,
//   });

//   // console.log(watch("example")) // watch input value by passing the name of it

//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* register your input into the hook by invoking the "register" function */}
//         <div>
//           <input {...register("example")} />
//         </div>

//         {/* include validation with required or other standard HTML validation rules */}
//         <div>
//           <input {...register("exampleRequired", { required: true })} />
//           {errors.exampleRequired && <span>This field is required</span>}
//         </div>

//         <div className="mt-4">
//           <label htmlFor="dob"> Date Of Birth </label>
//           <input type="date" {...register("dob", {
//             valueAsDate: true,
//             required: {
//               value: true,
//               message: 'Date of Birth required',
//             }
//           })} />
//           {errors.dob && <span>{ errors.dob?.message }</span>}
//         </div>

//         <div className="mt-4">
//           <label htmlFor="twitter"> Twitter </label>
//           <input {...register("social.twitter")} />
//           {/* {errors.social.twitter && <span>This field is required</span>} */}
//         </div>
//         <div className="mt-4">
//           <label htmlFor="facebook">Facebook</label>
//           <input {...register("social.facebook")} />
//         </div>
//         {/* errors will return when field validation fails  */}

//         <div className="mt-4">
//           <label htmlFor="phone">Phone Numbers</label>
//           <input type="text" id="phone" {...register("phoneNumbers.0")} />
//         </div>
//         <div className="mt-4">
//           <label htmlFor="phone1">Phone Numbers</label>
//           <input type="text" id="phone1" {...register("phoneNumbers.1")} />
//         </div>

//         <div className="mt-4">
//           <label>List of Phone Number</label>
//           <div className="flex flex-col gap-5">
//             {fields.map((field, index) => {
//               return (
//                 <div className="mt-4 flex gap-4 m-4" key={field.id}>
//                   <input
//                     type="text"
//                     {...register(`phNumbers.${index}.number`)}
//                   />

//                   {index >= 0 && (
//                     <button
//                       className="btn btn-sm"
//                       onClick={() => remove(index)}>
//                       remove Phone Number
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//             <div>
//               <input type="text" {...register('firstName')} />
//               {errors.firstName && <div>{errors.firstName?.message}</div>}
//             </div>
//             <div>
//               <input type="number" {...register('age')} />
//               {errors.firstName && <div>{errors.firstName?.message}</div>}

//             </div>
//             <button
//               className="btn btn-sm"
//               onClick={() => append({ number: "" })}>
//               Add Phone Number
//             </button>
//           </div>
//         </div>

//         <input type="submit" />
//       </form>
//       <DevTool control={control} />
//     </div>
//   );
// };

export default AddProduct;
