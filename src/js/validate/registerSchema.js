import * as yup from "yup";

export const registerSchema = yup
    .object({
        name: yup
            .string()
            .matches(/^[\w\s]+$/, "Name cannot contain special symbols.")
            .required("Name required."),
        email: yup
            .string()
            .email("Valid email address required")
            .matches(/@stud\.noroff\.no$/, "Only emails ending with stud.noroff.no approved.")
            .required("Email required"),
        password: yup
            .string()
            .min(8, "Password needs to be at least 8 characters.")
            .required("Password required"),
    })
    .required();