import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string(),
  username: yup.string().min(3).max(30).required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8).max(32).required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  profileImage: yup.string().url(),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});
