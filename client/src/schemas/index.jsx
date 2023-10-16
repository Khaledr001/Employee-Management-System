import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email address"),
  password: Yup.string().min(6).required("Please enter your password"),
});

const registerSchema = Yup.object({
  name: Yup.string().min(3).max(50).required("Please enter your name"),
  phoneNumber: Yup.string().min(11).max(15).required("Please enter your phone number"),
  email: Yup.string().email().required("Please enter your email address"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password does not match"),
});



const authSchema = { loginSchema, registerSchema };

export default authSchema;
